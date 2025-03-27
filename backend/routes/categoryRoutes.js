//routes/categoryRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // The multer middleware
const { getCategories, createCategory, updateCategory, deleteCategory,restoreCategory } = require('../controllers/categoryController');

router.get('/all', getCategories);
router.post('/', upload.single('image'), createCategory);
router.put('/:id', upload.single('image'), updateCategory);
router.patch('/:id/delete', deleteCategory);
router.patch('/:id/restore', restoreCategory);

module.exports = router;
