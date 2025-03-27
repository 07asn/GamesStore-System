// controllers/productController.js
const Product = require('../models/Product');
const Product_Image = require('../models/Product_Image');
const Review = require('../models/Review');
const Category = require('../models/Category');
const { fn, col, Op } = require('sequelize');
const sequelize = require('../config/database'); 

async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      where: {
        is_deleted: false,
      },
      attributes: ['product_id', 'name', 'discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
      include: [
        {
          model: Product_Image,
          as: 'images',  // Alias for the relation
          attributes: ['image_url'],  // Fetch the image URL for each product
        },
      ],
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    // Format the product data to include images
    const productData = products.map(product => {
      const images = product.images.map(image => image.image_url);
      return {
        ...product.toJSON(),  // Converts Sequelize model to plain object
        images,  // Attach images array to the product data
      };
    });

    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}


async function getProductById(req, res) {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { product_id: id, is_deleted: false },
      attributes: ['product_id', 'name', 'discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const images = await Product_Image.findAll({
      where: { product_id: id },
      attributes: ['image_url'],
    });

    const avgRatingResult = await Review.findOne({
      where: { product_id: id },
      attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'avgRating']], // Use sequelize functions correctly
    });

    const reviewsCount = await Review.count({
      where: { product_id: id },
    });

    const productData = product.get(); 
    productData.images = images.map(image => image.image_url);
    productData.avgRating = avgRatingResult ? avgRatingResult.get('avgRating') : null;  // Get average rating
    productData.reviews_count = reviewsCount;

    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getRelatedProducts(req, res) {
  try {
    const { id } = req.params;
    console.log('Fetching related products for product ID:', id);  


    const product = await Product.findOne({
      where: { product_id: id, is_deleted: false },
      include: [{
        model: Category,
        as: 'category',
        attributes: ['category_id', 'name'],
      }],
    });

    console.log('Fetched product:', product);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!product.category) {
      return res.status(404).json({ message: 'Category not found for this product' });
    }

    const category_id = product.category.category_id;

    const relatedProducts = await Product.findAll({
      where: {
        category_id: category_id,
        product_id: { [Op.ne]: id },
        is_deleted: false,
      },
      attributes: ['product_id', 'name', 'discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
      limit: 8,
    });

    if (relatedProducts.length === 0) {
      return res.status(404).json({ message: 'No related products found' });
    }

    console.log('Related products fetched:', relatedProducts); 

    res.status(200).json(relatedProducts);
  } catch (error) {
    console.error('Error fetching related products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getFeaturedProducts(req, res) {
  try {
    const products = await Product.findAll({
      where: {
        featured: true,
        is_deleted: false,
      },
      attributes: ['product_id', 'name', 'discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
      include: [
        {
          model: Product_Image,
          as: 'images', 
          attributes: ['image_url'], // Only fetch image_url
        }
      ]
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No featured products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching featured products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getProducts,
  getProductById,
  getRelatedProducts,
  getFeaturedProducts,
};
