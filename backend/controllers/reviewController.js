const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');

async function addReview(req, res) {
  try {
    const { user_id, product_id, rating, review } = req.body;

    // Check if the product exists
    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Create a new review
    const newReview = await Review.create({
      user_id,
      product_id,
      rating,
      review,
    });

    return res.status(201).json({
      message: 'Review added successfully',
      review: newReview,
    });
  } catch (error) {
    console.error('Error adding review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// Optionally, you can create a function to fetch reviews for a product
async function getReviewsByProduct(req, res) {
  try {
    const { product_id } = req.params;

    // Fetch all reviews for a specific product
    const reviews = await Review.findAll({
      where: { product_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],  // Fetch user info for reviews
        },
      ],
    });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  addReview,
  getReviewsByProduct,
};
