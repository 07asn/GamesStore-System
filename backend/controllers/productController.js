// controllers/productController.js
const Product = require("../models/Product");
const Product_Image = require("../models/Product_Image");
const Review = require("../models/Review");
const Category = require("../models/Category");
const { fn, col, Op } = require("sequelize");
const fs = require("fs");
const sequelize = require("../config/database");
const cloudinary = require("cloudinary").v2;
const { uploadImage } = require("../services/imgService"); // Import the upload image function


async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      where: {
        is_deleted: false,
      },
      attributes: [
        "product_id",
        "name",
        "discounted_price",
        "description",
        "price",
        "category_id",
        "stock",
        "delivery_type",
        "platform",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    if (!products.length) {
      return res.status(404).json({ message: "No products found" });
    }

    // Format the product data to include images
    const productData = products.map((product) => {
      const images = product.images.map((image) => image.image_url);
      return {
        ...product.toJSON(),
        images,
      };
    });

    res.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { product_id: id, is_deleted: false },
      attributes: [
        "product_id",
        "name",
        "discounted_price",
        "description",
        "price",
        "stock",
        "delivery_type",
        "platform",
        "created_at",
        "updated_at",
      ],
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const images = await Product_Image.findAll({
      where: { product_id: id },
      attributes: ["image_url"],
    });

    const avgRatingResult = await Review.findOne({
      where: { product_id: id },
      attributes: [[sequelize.fn("avg", sequelize.col("rating")), "avgRating"]],
    });

    const reviewsCount = await Review.count({
      where: { product_id: id },
    });

    const productData = product.get();
    productData.images = images.map((image) => image.image_url);
    productData.avgRating = avgRatingResult
      ? avgRatingResult.get("avgRating")
      : null;
    productData.reviews_count = reviewsCount;

    res.status(200).json(productData);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getRelatedProducts(req, res) {
  try {
    const { id } = req.params;
    console.log("Fetching related products for product ID:", id);

    const product = await Product.findOne({
      where: { product_id: id, is_deleted: false },
      include: [
        {
          model: Category,
          as: "category",
          attributes: ["category_id", "name"],
        },
      ],
    });

    console.log("Fetched product:", product);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.category) {
      return res
        .status(404)
        .json({ message: "Category not found for this product" });
    }

    const category_id = product.category.category_id;

    const relatedProducts = await Product.findAll({
      where: {
        category_id: category_id,
        product_id: { [Op.ne]: id },
        is_deleted: false,
      },
      attributes: [
        "product_id",
        "name",
        "discounted_price",
        "description",
        "price",
        "stock",
        "delivery_type",
        "platform",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
        },
      ],
      limit: 8,
    });

    if (relatedProducts.length === 0) {
      return res.status(404).json({ message: "No related products found" });
    }

    // Format the response to include images array
    const formattedProducts = relatedProducts.map((product) => ({
      ...product.toJSON(),
      images: product.images.map((img) => img.image_url),
    }));

    console.log("Related products fetched:", formattedProducts);

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getFeaturedProducts(req, res) {
  try {
    const products = await Product.findAll({
      where: {
        featured: true,
        is_deleted: false,
      },
      attributes: [
        "product_id",
        "name",
        "discounted_price",
        "description",
        "price",
        "stock",
        "delivery_type",
        "platform",
        "created_at",
        "updated_at",
      ],
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    if (!products.length) {
      return res.status(404).json({ message: "No featured products found" });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function addProduct(req, res) {
  try {
    const {
      name,
      description,
      price,
      discounted_price,
      stock,
      delivery_type,
      platform,
      category_id,
      featured,
    } = req.body;

    // First create the product
    const newProduct = await Product.create({
      name,
      description,
      price,
      discounted_price: discounted_price || null,
      stock: stock || 0,
      delivery_type,
      platform,
      category_id,
      featured: featured || false,
      is_deleted: false,
    });

    // Handle image upload if present
    if (req.file) {
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "products",
        });

        // Create image record in Product_Image table
        await Product_Image.create({
          product_id: newProduct.product_id,
          image_url: result.secure_url,
          image_type: req.file.mimetype,
        });

        // Delete the temporary file
        fs.unlinkSync(req.file.path);
      } catch (uploadError) {
        console.error("Error uploading image:", uploadError);
        // If image upload fails, delete the product we just created
        await newProduct.destroy();
        throw new Error("Failed to upload product image");
      }
    }

    // Fetch the product with its images to return complete data
    const productWithImages = await Product.findOne({
      where: { product_id: newProduct.product_id },
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    // Format the response
    const responseData = {
      ...productWithImages.toJSON(),
      images: productWithImages.images.map((img) => img.image_url),
    };

    res.status(201).json({
      message: "Product created successfully",
      product: responseData,
    });
  } catch (error) {
    console.error("Error adding product:", error);

    // Clean up any temporary files if they exist
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
}

async function updateProduct(req, res) {
  try {
    const { id } = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Find the product by ID
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.is_deleted) {
      return res.status(410).json({ message: "Product is archived" });
    }

    // Handle image upload if a new image is provided
    let newImageUrl = null;
    if (req.file) {
      try {
        // Call the uploadImage function to handle the image upload to Cloudinary
        const result = await uploadImage(req);

        // Store the Cloudinary image URL
        newImageUrl = result.secure_url;

        // Check if image already exists for this product
        const existingImage = await Product_Image.findOne({
          where: { product_id: id },
        });

        if (existingImage) {
          // Update existing image record
          existingImage.image_url = newImageUrl;
          await existingImage.save();
        } else {
          // Create a new image record if no image exists
          await Product_Image.create({
            product_id: id,
            image_url: newImageUrl,
            image_type: req.file.mimetype,
          });
        }

        // Clean up temporary file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
      } catch (uploadError) {
        console.error("Image upload failed:", uploadError);
        if (req.file && fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path);
        }
        return res
          .status(500)
          .json({ message: "Failed to update product image" });
      }
    }

    // Update product fields (other fields)
    const updatableFields = [
      "name",
      "description",
      "price",
      "discounted_price",
      "stock",
      "delivery_type",
      "platform",
      "category_id",
      "featured",
    ];

    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        // Special handling for boolean fields (e.g., 'featured')
        if (field === "featured") {
          product[field] =
            req.body[field] === "true" || req.body[field] === true;
        } else {
          product[field] = req.body[field];
        }
      }
    });

    // If an image was updated, save the new URL to the product
    if (newImageUrl) {
      product.image_url = newImageUrl;
    }

    await product.save();

    // Fetch the complete updated product with images
    const updatedProduct = await Product.findOne({
      where: { product_id: id },
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
        },
      ],
    });

    // Format the response with updated image URLs
    const responseData = {
      ...updatedProduct.toJSON(),
      images: updatedProduct.images.map((img) => img.image_url),
    };

    // Return the success response
    res.status(200).json({
      message: "Product updated successfully",
      product: responseData,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product || product.is_deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.is_deleted = true;
    await product.save();

    res.status(200).json({ message: "Product archived" });
  } catch (error) {
    console.error("Error archiving product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getDeletedProducts(req, res) {
  try {
    // Fetch all deleted products with their images
    const deletedProducts = await Product.findAll({
      where: {
        is_deleted: true,
      },
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
          required: false, // Use left join to include products even without images
        },
      ],
      order: [["updated_at", "DESC"]], // Show most recently deleted first
    });

    if (!deletedProducts || deletedProducts.length === 0) {
      return res.status(404).json({
        message: "No archived products found",
        products: [],
      });
    }

    // Format the products data
    const formattedProducts = deletedProducts.map((product) => ({
      product_id: product.product_id,
      name: product.name,
      description: product.description,
      price: product.price,
      discounted_price: product.discounted_price,
      stock: product.stock,
      delivery_type: product.delivery_type,
      platform: product.platform,
      category_id: product.category_id,
      featured: product.featured,
      created_at: product.created_at,
      updated_at: product.updated_at,
      images: product.images ? product.images.map((img) => img.image_url) : [],
    }));

    res.status(200).json({
      message: "Archived products retrieved successfully",
      products: formattedProducts,
      count: formattedProducts.length,
    });
  } catch (error) {
    console.error("Error fetching deleted products:", error);
    res.status(500).json({
      message: "Failed to retrieve archived products",
      error: error.message,
    });
  }
}

async function restoreProduct(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product || !product.is_deleted) {
      return res
        .status(404)
        .json({ message: "Product not found or not archived" });
    }

    product.is_deleted = false;
    await product.save();

    res.status(200).json({ message: "Product restored" });
  } catch (error) {
    console.error("Error restoring product:", error);
    res.status(500).json({ message: "Server error" });
  }
}

const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    console.log("Search query:", q);
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: 'Query parameter "q" is required.' });
    }

    const products = await Product.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
        is_deleted: false,
      },
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
          // If you want just the first image, you might later pick product.images[0].image_url in your client.
          required: false,
        },
      ],
      limit: 10,
    });

    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const searchProductsAdmin = async (req, res) => {
  try {
    const { q, tab } = req.query;
    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: 'Query parameter "q" is required.' });
    }

    // Base filter: name ilike %q% and not deleted
    const where = {
      name: { [Op.iLike]: `%${q}%` },
      is_deleted: false,
    };

    // Tab‐specific
    if (tab === "active") {
      where.stock = { [Op.gt]: 0 };
    } else if (tab === "outOfStock") {
      where.stock = 0;
    }

    const products = await Product.findAll({
      where,
      include: [
        {
          model: Product_Image,
          as: "images",
          attributes: ["image_url"],
          required: false,
        },
        {
          model: Category,
          as: "category",
          attributes: ["category_id", "name"],
          required: false,
        },
      ],
      limit: 50,
    });

    // Flatten out the JSON for frontend
    const formatted = products.map((p) => {
      const plain = p.get({ plain: true });
      return {
        ...plain,
        category_name: plain.category?.name || "Uncategorized",
        images: plain.images.map((img) => img.image_url),
      };
    });

    res.json(formatted);
  } catch (error) {
    console.error("searchProductsAdmin error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  getRelatedProducts,
  getFeaturedProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  getDeletedProducts,
  searchProducts,
  searchProductsAdmin,
};
