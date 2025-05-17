// routes/admin/adminRoutes.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Global admin search
router.get(
  "/search",
  authenticate,
  authorizeAdmin,
  adminController.globalSearch
);

// GET all blocked users
router.get(
  "/users/deleted",
  authenticate,
  authorizeAdmin,
  adminController.getDeletedUsers
);

// POST new user
router.post("/users", authenticate, authorizeAdmin, adminController.createUser);

// GET user order history
router.get(
  "/users/:userId/orders",
  authenticate,
  authorizeAdmin,
  adminController.getUserOrderHistory
);

// GET all users
router.get("/users", authenticate, authorizeAdmin, adminController.getAllUsers);

// PUT update a user (by user_id)
router.put(
  "/users/:id",
  authenticate,
  authorizeAdmin,
  adminController.updateUser
);

// PATCH block/unblock a user
router.patch(
  "/users/:id/block",
  authenticate,
  authorizeAdmin,
  adminController.blockUnblockUser
);

// DELETE a user (by user_id)
router.delete(
  "/users/:id",
  authenticate,
  authorizeAdmin,
  adminController.deleteUser
);

module.exports = router;
