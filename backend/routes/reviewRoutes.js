const express = require('express');
const router = express.Router();
const { addReview, getReviewsByProduct, getFiveStarReviews, deleteReview,restoreReview, getAllReviews, getDeletedReviews } = require('../controllers/reviewController');

// POST /reviews - Create a new review
router.post('/add', addReview);

// GET /reviews - Get all active reviews (paginated)
router.get('/all', getAllReviews);

// GET /reviews/fivestar - Get all five-star reviews
router.get('/fivestar', getFiveStarReviews);



// GET /reviews/deleted - Get all deleted reviews (paginated)
router.get('/deleted', getDeletedReviews);

// PATCH /reviews/:review_id/delete - Soft delete a review
router.patch('/:review_id/delete', deleteReview);

// PATCH /reviews/:review_id/restore - Restore a deleted review
router.patch('/:review_id/restore', restoreReview);

// GET /reviews/:product_id - Get reviews for a specific product
router.get('/:product_id', getReviewsByProduct);

module.exports = router;
