const express = require('express');
const router = express.Router();
const { addReview, getReviewsByProduct, getFiveStarReviews } = require('../controllers/reviewController');

router.post('/add', addReview);
router.get('/fivestar', getFiveStarReviews);
router.get('/:product_id', getReviewsByProduct);

module.exports = router;
