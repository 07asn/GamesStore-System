const express = require('express');
const router = express.Router();
const { addReview, getReviewsByProduct } = require('../controllers/reviewController');

// Route to add a review
router.post('/add', addReview);

// Route to get reviews for a product
router.get('/:product_id', getReviewsByProduct);

module.exports = router;
