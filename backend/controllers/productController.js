// controllers/productController.js
const Product = require('../models/Product');
const Product_Image = require('../models/Product_Image');
async function getProducts(req, res) {
  try {
    const products = await Product.findAll({
      where: {
        is_deleted: false,
      },
      attributes: ['product_id', 'name','discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
    });

    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }

    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getProductById(req, res) {
  try {
    const { id } = req.params;
    console.log('Fetching product with ID:', id);

    // Fetch the product details
    const product = await Product.findOne({
      where: { product_id: id, is_deleted: false },
      attributes: ['product_id', 'name', 'discounted_price', 'description', 'price', 'stock', 'delivery_type', 'platform', 'created_at', 'updated_at'],
    });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch images associated with the product
    const images = await Product_Image.findAll({
      where: { product_id: id },
      attributes: ['image_url'],
    });

    // Add images to the product data
    const productData = product.get(); // Extract the plain data values
    productData.images = images.map(image => image.image_url);

    // Log the product with images to verify
    console.log('Product with images:', productData);

    // Return product data along with images
    res.status(200).json(productData);
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  getProducts,
  getProductById,
};
