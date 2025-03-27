// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getRelatedProducts,getFeaturedProducts  } = require('../controllers/productController');

router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.get('/related/:id', getRelatedProducts);

module.exports = router;
