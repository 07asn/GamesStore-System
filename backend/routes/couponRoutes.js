const express = require('express');
const router = express.Router();
const { getCoupons, createCoupon, updateCoupon, deleteCoupon, restoreCoupon, validateCoupon } = require('../controllers/couponController');

router.post('/validate', validateCoupon);
router.get('/', getCoupons);
router.post('/', createCoupon);
router.put('/:id', updateCoupon);
router.patch('/:id/delete', deleteCoupon);
router.patch('/:id/restore', restoreCoupon);

module.exports = router;
