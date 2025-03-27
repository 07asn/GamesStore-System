const Review = require('../models/Review');
const Product = require('../models/Product');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');

async function addReview(req, res) {
  try {
    const { product_id, rating, review } = req.body;
    let user_id = null;

    if (req.cookies.token) {
      try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
        user_id = decoded.userId;
      } catch (error) {
        if (error.name === 'TokenExpiredError') {
          console.warn('Token expired, proceeding without user_id');
        } else {
          console.error('Invalid token:', error);
        }
        user_id = null;
      }
    }

    const product = await Product.findByPk(product_id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const newReview = await Review.create({
      user_id, 
      product_id,
      rating: rating || null,
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

async function getReviewsByProduct(req, res) {
  try {
    const { product_id } = req.params;


    const reviews = await Review.findAll({
      where: { product_id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'], 
        },
        {
          model: Product,
          as: 'product', 
          attributes: ['name', 'price'],
        }
      ],
    });

    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    return res.status(200).json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getFiveStarReviews(req, res) {
  try {
    const reviews = await Review.findAll({
      where: {
        rating: 5,
        user_id: { [Sequelize.Op.ne]: null },  // Filter where user_id is not null
      },
      include: [
        {
          model: User,
          as: 'user', // Alias for the User model
          attributes: ['name', 'email', 'gender'],
        },
        {
          model: Product,
          as: 'product', // Alias for the Product model
          attributes: ['name', 'price'],
        }
      ],
    });
    return res.status(200).json(reviews);

  } catch (error) {
    console.error('Error fetching reviews:', error);
    return res.status(500).json({ message: 'Server error' });

  }
}




module.exports = {
  addReview,
  getReviewsByProduct,
  getFiveStarReviews
};
