const Coupon = require('../models/Coupon');
const Product = require('../models/Product');

exports.validateCoupon = async (req, res) => {
  try {
    const { code, cartItems } = req.body;

    // 1) Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ message: 'cartItems must be an array of products.' });
    }

    // 2) Find the coupon by code
    const coupon = await Coupon.findOne({ where: { code } });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid coupon code.' });
    }

    // 3) Check date validity
    const now = new Date();
    // If coupon.valid_from exists and "now" is before it => not active yet
    if (coupon.valid_from && now < coupon.valid_from) {
      return res.status(400).json({ message: 'This coupon is not active yet.' });
    }
    // If coupon.valid_to exists and "now" is after it => expired
    if (coupon.valid_to && now > coupon.valid_to) {
      return res.status(400).json({ message: 'This coupon has expired.' });
    }

    // 4) Check usage limit (if your coupons table has e.g. usage_limit + used_count)
    if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
      return res.status(400).json({ message: 'Usage limit reached for this coupon.' });
    }

    // 5) If coupon.category_id is set, ensure the user's cart includes at least one product from that category
    if (coupon.category_id) {
      let matched = false;

      // For each cart item, we fetch the actual product from the DB to ensure category is correct
      for (const item of cartItems) {
        // e.g. item = { product_id, quantity, price, ... }
        const product = await Product.findOne({ where: { product_id: item.product_id } });
        if (product && product.category_id === coupon.category_id) {
          matched = true;
          break;
        }
      }

      if (!matched) {
        return res.status(400).json({
          message: `This coupon only applies to category ${coupon.category_id}, but no items in your cart match that category.`,
        });
      }
    }

    // 6) Return discount info if everything passes
    return res.status(200).json({
      message: 'Coupon is valid',
      coupon: {
        code: coupon.code,
        discount_value: coupon.discount_value || 0,
        discount_percentage: coupon.discount_percentage || 0,
        category_id: coupon.category_id || null
      },
    });
  } catch (error) {
    console.error('Error validating coupon:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
