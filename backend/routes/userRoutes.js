const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticate = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/profile', authenticate, userController.getUserProfile);
router.put('/profile', authenticate, userController.updateProfile);
router.put('/change-password', authenticate, userController.updatePassword);
router.post('/resend-verification', userController.sendVerificationEmail);
router.get('/verify-email', userController.verifyEmail);
router.get('/status', authenticate, userController.getAuthStatus);
router.post('/forgot-password', userController.forgotPassword);
router.post('/reset-password', userController.resetPassword);
module.exports = router;
