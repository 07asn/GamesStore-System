// routes/categoryRoutes.js
const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  getCategories,
  getActiveCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  restoreCategory,
} = require("../controllers/categoryController");
const authenticate = require("../middleware/authMiddleware");
const authorizeAdmin = require("../middleware/adminMiddleware");

// Public access
router.get("/all", getCategories);
router.get("/active", getActiveCategories);

// Admin-only routes
router.post(
  "/",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  createCategory
);
router.put(
  "/:id",
  authenticate,
  authorizeAdmin,
  upload.single("image"),
  updateCategory
);
router.patch("/:id/delete", authenticate, authorizeAdmin, deleteCategory);
router.patch("/:id/restore", authenticate, authorizeAdmin, restoreCategory);

module.exports = router;
