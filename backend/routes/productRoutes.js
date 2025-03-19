// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { getProducts, getProductById } = require('../controllers/productController');

// Define route to fetch products
router.get('/', getProducts);
router.get('/:id', getProductById);
module.exports = router;
