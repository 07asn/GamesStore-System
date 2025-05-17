// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const {
  createOrder,
  getSingleOrder,
  getUserOrders,
  getOrders,
  updateOrderStatus,
  assignInventoryToOrderItem,
} = require("../controllers/orderController");
const authenticate = require("../middleware/authMiddleware");
const orderUpload = require("../middleware/orderUploadMiddleware");

router.get("/all", getOrders);
router.get("/", authenticate, getUserOrders);
router.post("/create", authenticate, createOrder);
router.put("/assign-inventory", assignInventoryToOrderItem);

router.get("/:id", authenticate, getSingleOrder);
router.put("/:id", updateOrderStatus);
module.exports = router;
