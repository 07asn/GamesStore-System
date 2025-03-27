// routes/admin/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authenticate = require('../middleware/authMiddleware');
// If you have an admin authorization middleware, you could include it here:
// const authorizeAdmin = require('../../middleware/adminMiddleware');
// GET all Blocked users 
router.get('/users/deleted', adminController.getDeletedUsers);

// POST new user 
router.post('/users', adminController.createUser);

router.get('/users/:userId/orders', adminController.getUserOrderHistory);

// GET all users
router.get('/users' /*,authenticate*/ /*, authorizeAdmin */, adminController.getAllUsers);

// PUT update a user (by user_id)
router.put('/users/:id' /*,authenticate*/ /*, authorizeAdmin */, adminController.updateUser);

router.patch('/users/:id/block', adminController.blockUnblockUser);

// DELETE a user (by user_id)
router.delete('/users/:id'/*, authenticate , authorizeAdmin */, adminController.deleteUser);

module.exports = router;
