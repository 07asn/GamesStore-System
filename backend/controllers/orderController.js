// controllers/orderController.js
const Order = require('../models/Order');
const Order_Item = require('../models/Order_Item');
const Inventory = require('../models/Inventory');
const Product = require('../models/Product');
const Product_Image = require('../models/Product_Image');
const Coupon = require('../models/Coupon');

/**
 * Auto-deliver order items:
 * For each order item, find an available inventory record (matching product_id)
 * and update its status to "assigned". Then, update the corresponding Order_Item
 * with the assigned inventory_id.
 *
 * Returns true if every order item was delivered, or false if one or more items
 * did not have available inventory.
 */
const autoDelivery = async (order, createdOrderItems) => {
  let allDelivered = true;

  for (const item of createdOrderItems) {
    const availableInventory = await Inventory.findOne({
      where: {
        product_id: item.product_id,
        status: 'available'
      }
    });

    if (availableInventory) {
      // Mark the inventory record as assigned
      await availableInventory.update({
        status: 'assigned',
        assigned_at: new Date()
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

exports.createOrder = async (req, res) => {
  try {
    // Get user ID from the token (set by your auth middleware)
    const user_id = req.user.userId;
    const { payment_method, total_amount, cartItems = [] } = req.body;

    // Basic validation
    if (!payment_method || !total_amount) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: 'cartItems must be a non-empty array' });
    }

    // 1) Create the order with initial statuses set to "pending"
    const newOrder = await Order.create({
      user_id,
      total_amount,
      payment_method,
      order_status: 'pending',
      payment_status: 'paid', // Payment has succeeded
      delivery_status: 'pending'
    });

    // 2) Create order items
    const orderItemsData = cartItems.map(item => ({
      order_id: newOrder.order_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.price_at_purchase // Assume this is provided by the client
    }));

    // Use { returning: true } to get the created records (works in PostgreSQL)
    const createdOrderItems = await Order_Item.bulkCreate(orderItemsData, { returning: true });

    // 3) Auto-deliver order items by updating inventory records
    const allDelivered = await autoDelivery(newOrder, createdOrderItems);

    // 4) Update order status based on whether all items were delivered
    if (allDelivered) {
      await newOrder.update({
        order_status: 'completed',
        delivery_status: 'completed'
      });
    } else {
      await newOrder.update({
        order_status: 'processing',
        delivery_status: 'processing'
      });
    }

    // 5) Return success response with appropriate message
    return res.status(201).json({
      message: allDelivered
        ? 'Order created and delivered successfully'
        : 'Order created, but some items are pending delivery',
      order_id: newOrder.order_id,
      order: newOrder
    });
  } catch (error) {
    console.error('Error creating order:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findOne({
      where: { order_id: orderId },
      include: [
        {
          model: Order_Item,
          as: 'order_items',
          include: [
            {
              model: Product,
              as: 'product',
              include: [{ model: Product_Image, as: 'images' }]
            },
            {
              model: Inventory,
              as: 'inventory'
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({ order });
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ message: 'Server error' });
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
          as: 'order_items',
          include: [
            {
              model: Product,
              as: 'product',
              include: [
                {
                  model: Product_Image,
                  as: 'images'
                }
              ]
            }
          ]
        }
      ],
      order: [['order_date', 'DESC']]
    });

    return res.status(200).json({ orders });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
