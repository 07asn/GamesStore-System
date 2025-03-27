// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder, getSingleOrder, getUserOrders } = require('../controllers/orderController');
const authenticate = require('../middleware/authMiddleware');

router.get('/', authenticate, getUserOrders);
router.post('/create',authenticate, createOrder);
router.get('/:id', authenticate, getSingleOrder);
module.exports = router;
