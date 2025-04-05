const express = require('express');
const router = express.Router();
const { 
  addReview, 
  getReviewsByProduct, 
  getFiveStarReviews, 
  deleteReview,
  restoreReview, 
  getAllReviews, 
  getDeletedReviews 
} = require('../controllers/reviewController');

const authenticate = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/adminMiddleware');

// Admin-only routes
router.get('/all', authenticate, authorizeAdmin, getAllReviews);
router.get('/deleted', authenticate, authorizeAdmin, getDeletedReviews);
router.patch('/:review_id/delete', authenticate, authorizeAdmin, deleteReview);
router.patch('/:review_id/restore', authenticate, authorizeAdmin, restoreReview);

// Public routes
router.post('/add', addReview);
router.get('/fivestar', getFiveStarReviews);
router.get('/:product_id', getReviewsByProduct);

module.exports = router;
