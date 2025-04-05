const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  getRelatedProducts,
  getDeletedProducts,
  searchProducts, 
  getFeaturedProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct, 
  restoreProduct 
} = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware'); 
const authenticate = require('../middleware/authMiddleware');
const authorizeAdmin = require('../middleware/adminMiddleware');
const validateProductId = require('../middleware/validateProductIdMiddleware');

// Admin-only routes
router.put('/:id', upload.single('image'), updateProduct);
router.post('/', upload.single('image'), addProduct);
router.patch('/:id/delete', deleteProduct);
router.patch('/:id/restore', restoreProduct);

// Public routes
router.get('/search', searchProducts);
router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/deleted', getDeletedProducts); 
router.get('/:id', validateProductId, getProductById);
router.get('/related/:id', validateProductId, getRelatedProducts);

module.exports = router;
