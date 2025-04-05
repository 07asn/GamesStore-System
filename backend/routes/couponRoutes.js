const express = require('express');
const router = express.Router();
const {
    getCoupons,
    createCoupon,
    updateCoupon,
    deleteCoupon,
    restoreCoupon,
    validateCoupon
} = require('../controllers/couponController');

const authenticate = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/adminMiddleware');

// Public routes
router.post('/validate', validateCoupon);
router.get('/', getCoupons);

// Admin-only routes
router.post('/', authenticate, authorizeAdmin, createCoupon);
router.put('/:id', authenticate, authorizeAdmin, updateCoupon);
router.patch('/:id/delete', authenticate, authorizeAdmin, deleteCoupon);
router.patch('/:id/restore', authenticate, authorizeAdmin, restoreCoupon);

module.exports = router;
