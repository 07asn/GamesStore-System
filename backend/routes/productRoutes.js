const express = require('express');
const router = express.Router();
const { getProducts, getProductById, getRelatedProducts,getDeletedProducts, getFeaturedProducts, addProduct, updateProduct, deleteProduct, restoreProduct, getCategories } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware'); 
router.put('/:id', upload.single('image'), updateProduct);


router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/deleted', getDeletedProducts); 
router.get('/:id',validateProductId, getProductById);

router.get('/related/:id', getRelatedProducts);


router.post('/', upload.single('image'), addProduct); 
router.patch('/:id/delete', deleteProduct); 
router.patch('/:id/restore', restoreProduct); 


function validateProductId(req, res, next) {
    const { id } = req.params;
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid product ID' });
    }
    next();
  }
module.exports = router;
