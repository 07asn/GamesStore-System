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

async function getAllReviews(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const totalCount = await Review.count();

    const reviews = await Review.findAll({
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
      limit: limit,
      offset: offset,
      order: [['created_at', 'DESC']] 
    });

    if (!reviews.length) {
      return res.status(404).json({ 
        message: 'No reviews found',
        data: [],
        meta: {
          total: 0,
          pages: 0,
          currentPage: page,
          perPage: limit
        }
      });
    }

    const formattedReviews = reviews.map(review => {
      const userName = review.user ? review.user.name : 'Anonymous';
      const userEmail = review.user ? review.user.email : 'N/A';
      const productName = review.product ? review.product.name : 'No Product';
      const productPrice = review.product ? review.product.price : 'N/A';

      return {
        review_id: review.review_id,
        user_name: userName,
        user_email: userEmail,
        product_name: productName,
        product_price: productPrice,
        rating: review.rating,
        review_text: review.review,
        created_at: review.created_at,
        stars: review.rating ? '★'.repeat(review.rating) : 'No rating',
        is_deleted: review.is_deleted,
      };
    });

    return res.status(200).json({
      data: formattedReviews,
      meta: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching all reviews:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

const getDeletedReviews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Review.findAndCountAll({
      where: { is_deleted: true },
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
      limit,
      offset,
      order: [['created_at', 'DESC']]
    });

    res.json({
      data: rows.map(review => ({
        review_id: review.review_id,
        user_name: review.user ? review.user.name : 'Anonymous',
        user_email: review.user ? review.user.email : 'N/A',
        product_name: review.product ? review.product.name : 'No Product',
        product_price: review.product ? review.product.price : 'N/A',
        rating: review.rating,
        review_text: review.review,
        created_at: review.created_at,
        is_deleted: review.is_deleted,
      })),
      meta: {
        total: count,
        pages: Math.ceil(count / limit),
        currentPage: page,
        perPage: limit
      }
    });
  } catch (error) {
    console.error('Error fetching deleted reviews:', error);
    res.status(500).json({ 
      message: 'Error fetching deleted reviews',
      error: error.message 
    });
  }
};


async function deleteReview(req, res) {
  try {
    const { review_id } = req.params;

    const review = await Review.findByPk(review_id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.is_deleted = true;
    await review.save();

    return res.status(200).json({
      message: 'Review deleted successfully',
      review,
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function restoreReview(req, res) {
  try {
    const { review_id } = req.params;
    const review = await Review.findByPk(review_id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.is_deleted = false;
    await review.save();
    return res.status(200).json({
      message: 'Review restored successfully',
      review,
    });
  } catch (error) {
    console.error('Error restoring review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}


module.exports = {
  addReview,
  getReviewsByProduct,
  getFiveStarReviews,
  deleteReview,
  restoreReview,
  getAllReviews,
  getDeletedReviews,
};
