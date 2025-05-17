// controllers/orderController.js
const Order = require("../models/Order");
const User = require("../models/User");
const { Op } = require("sequelize");
const Order_Item = require("../models/Order_Item");
const Inventory = require("../models/Inventory");
const Product = require("../models/Product");
const Product_Image = require("../models/Product_Image");
const Coupon = require("../models/Coupon");
const { uploadImage } = require("../services/imgService");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
// Configure multer similar to your category implementation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});
const { uploadPaymentProof } = require("../services/orderImgService");
const orderUpload = require("../middleware/orderUploadMiddleware");

const autoAssignInventory = async (orderId, items) => {
  const results = [];

  for (const item of items) {
    try {
      const inventory = await Inventory.findOne({
        where: {
          product_id: item.product_id,
          status: "available",
        },
        order: [["createdAt", "ASC"]], // First-in-first-out
      });

      if (inventory) {
        await inventory.update({
          status: "assigned",
          assigned_at: new Date(),
        });

        await Order_Item.update(
          { inventory_id: inventory.inventory_id },
          { where: { order_id: orderId, product_id: item.product_id } }
        );

        results.push({ product_id: item.product_id, success: true });
      } else {
        results.push({ product_id: item.product_id, success: false });
      }
    } catch (error) {
      console.error(
        `Inventory assignment failed for product ${item.product_id}:`,
        error
      );
      results.push({
        product_id: item.product_id,
        success: false,
        error: error.message,
      });
    }
  }

  return results;
};

const autoDelivery = async (order, createdOrderItems) => {
  let allDelivered = true;

  for (const item of createdOrderItems) {
    const availableInventory = await Inventory.findOne({
      where: {
        product_id: item.product_id,
        status: "available",
      },
    });

    if (availableInventory) {
      // Mark the inventory record as assigned
      await availableInventory.update({
        status: "assigned",
        assigned_at: new Date(),
      });

      // Update the order item record with the assigned inventory_id
      await item.update({ inventory_id: availableInventory.inventory_id });
    } else {
      console.warn(`No available inventory for product_id: ${item.product_id}`);
      allDelivered = false;
    }
  }
  return allDelivered;
};

const handleOrderUpload = (req, res, next) => {
  orderUpload(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({
          message: "Payment proof must be less than 2MB",
        });
      }
      return res.status(400).json({
        message: err.message || "Invalid payment proof",
        error: err.message,
      });
    }
    next();
  });
};

exports.createOrder = [
  handleOrderUpload,
  async (req, res) => {
    try {
      const { userId } = req.user;
      let { payment_method, total_amount, cartItems } = req.body;

      // Validate required fields
      if (!payment_method || !total_amount || !cartItems) {
        return res.status(400).json({
          message:
            "Missing required fields (payment_method, total_amount, cartItems)",
        });
      }

      // Parse cart items
      try {
        cartItems =
          typeof cartItems === "string" ? JSON.parse(cartItems) : cartItems;
        if (!Array.isArray(cartItems) || cartItems.length === 0) {
          throw new Error("Cart items must be a non-empty array");
        }
      } catch (e) {
        return res.status(400).json({
          message: "Invalid cart items format",
          error: e.message,
        });
      }

      // Process payment proof if required
      let proof_img = null;
      const requiresProof = ["bank-transfer", "cliq", "uwallet"].includes(
        payment_method
      );

      if (requiresProof && !req.file) {
        return res.status(400).json({
          message: "Payment proof is required for this payment method",
        });
      }

      if (req.file) {
        try {
          const { url } = await uploadPaymentProof(req.file);
          proof_img = url;
        } catch (uploadError) {
          return res.status(500).json({
            message: "Payment proof processing failed",
            error: uploadError.message,
          });
        }
      }

      // Create the order
      const newOrder = await Order.create({
        user_id: userId,
        total_amount,
        payment_method,
        proof_img,
        order_status: "pending",
        payment_status: requiresProof ? "pending_verification" : "paid",
        delivery_status: "processing",
      });

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: newOrder.order_id,
        product_id: item.product_id,
        quantity: item.quantity,
        price_at_purchase: item.price_at_purchase,
      }));

      await Order_Item.bulkCreate(orderItems);

      // Auto-assign inventory
      const assignmentResults = await autoAssignInventory(
        newOrder.order_id,
        cartItems.map((item) => ({ product_id: item.product_id }))
      );

      const allAssigned = assignmentResults.every((r) => r.success);

      if (allAssigned) {
        await newOrder.update({
          delivery_status: "completed",
          order_status: "processing",
        });
      }

      return res.status(201).json({
        success: true,
        order_id: newOrder.order_id,
        payment_status: newOrder.payment_status,
        delivery_status: newOrder.delivery_status,
        requires_verification: requiresProof,
        inventory_assignment: assignmentResults,
      });
    } catch (error) {
      console.error("Order creation failed:", error);
      return res.status(500).json({
        message: "Order processing failed",
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  },
];

exports.getSingleOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { order_id: id },
      include: [
        {
          model: User,
          as: "user", // Association defined on Order
          attributes: ["user_id", "name", "email", "phone", "country"],
        },
        {
          model: Order_Item,
          as: "order_items",
          include: [
            {
              model: Product,
              as: "product",
              include: [
                {
                  model: Product_Image,
                  as: "images",
                },
              ],
            },
            {
              model: Inventory,
              as: "inventory", // Include the Inventory association to get asset_code
            },
          ],
        },
      ],
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    return res.json({ order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.userId;

    const orders = await Order.findAll({
      where: { user_id },
      include: [
        {
          model: Order_Item,
          as: "order_items",
          include: [
            {
              model: Product,
              as: "product",
              include: [
                {
                  model: Product_Image,
                  as: "images",
                },
              ],
            },
          ],
        },
      ],
      order: [["order_date", "DESC"]],
    });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const { status, orderId, page = 1, pageSize = 10 } = req.query;

    // Build WHERE
    const whereClause = {};
    if (status) whereClause.order_status = status;
    if (orderId) whereClause.order_id = orderId;

    // Parse pagination
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    // Fetch with count
    const { count, rows } = await Order.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: Order_Item,
          as: "order_items",
          include: [
            { model: Product, as: "product" },
            { model: Inventory, as: "inventory" },
          ],
        },
      ],
      order: [["order_date", "DESC"]],
      limit,
      offset,
    });

    const totalPages = Math.ceil(count / limit);

    return res.status(200).json({
      orders: rows,
      pagination: {
        totalItems: count,
        totalPages,
        currentPage: parseInt(page, 10),
      },
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Update the status of an order (for example, mark it as "completed")
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { order_status, payment_status, delivery_status } = req.body;

    const order = await Order.findOne({
      where: { order_id: id },
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Update the status
    order.order_status = order_status || order.order_status;
    order.payment_status = payment_status || order.payment_status;
    order.delivery_status = delivery_status || order.delivery_status;

    await order.save();

    return res
      .status(200)
      .json({ message: "Order updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.assignInventoryToOrderItem = async (req, res) => {
  const { order_item_id, inventory_id } = req.body;

  try {
    // Find the Order_Item by ID
    const orderItem = await Order_Item.findByPk(order_item_id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order Item not found" });
    }

    // Find the Inventory item by ID
    const inventoryItem = await Inventory.findByPk(inventory_id);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    // Check if the inventory is available
    if (inventoryItem.status !== "available") {
      return res
        .status(400)
        .json({ message: "Inventory item is not available" });
    }

    // Assign inventory to the order item
    await orderItem.update({ inventory_id: inventoryItem.inventory_id });

    // Update the inventory status to 'assigned'
    await inventoryItem.update({
      status: "assigned",
      assigned_at: new Date(),
    });

    return res
      .status(200)
      .json({
        message: "Inventory assigned to order item successfully",
        orderItem,
      });
  } catch (error) {
    console.error("Error assigning inventory to order item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
