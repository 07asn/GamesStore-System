// controllers/adminController.js

const Order = require('../models/Order');
const User = require('../models/User');
const OrderItem = require('../models/Order_Item');
const Product = require('../models/Product');
const Inventory = require('../models/Inventory');
const { hashPassword } = require('../services/userService');
const { fn, col } = require('sequelize');

// GET only active (non-deleted) users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll({
      where: { is_deleted: false }, // <--- filter out deleted
      attributes: {
        exclude: ['password'],
        include: [
          [fn('COUNT', col('orders.order_id')), 'orderCount'],
          [fn('SUM', col('orders.total_amount')), 'totalSpent'],
        ],
      },
      include: [
        {
          model: Order,
          as: 'orders',
          attributes: [],
        },
      ],
      group: ['User.user_id'],
    });

    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found!' });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// GET only deleted users
async function getDeletedUsers(req, res) {
  try {
    const deletedUsers = await User.findAll({
      where: { is_deleted: true },
      attributes: {
        exclude: ['password'],
        include: [
          [fn('COUNT', col('orders.order_id')), 'orderCount'],
          [fn('SUM', col('orders.total_amount')), 'totalSpent'],
        ],
      },
      include: [
        {
          model: Order,
          as: 'orders',
          attributes: [],
        },
      ],
      group: ['User.user_id'],
    });

    return res.status(200).json(deletedUsers);
  } catch (error) {
    console.error('Error fetching deleted users:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// CREATE user
async function createUser(req, res) {
  try {
    const {
      name,
      email,
      phone,
      country,
      gender,
      email_verified,
      password
    } = req.body;

    if (!name || !email || !country || !gender || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const hashed = await hashPassword(password);

    const newUser = await User.create({
      name,
      email,
      phone,
      country,
      gender,
      email_verified,
      password: hashed,
      // is_deleted defaults to false in your model, presumably
    });

    return res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(400).json({
      message: error?.errors?.[0]?.message || 'Failed to create user',
    });
  }
}

// UPDATE user
async function updateUser(req, res) {
  try {
    const userId = req.params.id;
    const { name, email, country, role, phone, gender, email_verified } = req.body;

    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.set({
      name: name ?? user.name,
      email: email ?? user.email,
      country: country ?? user.country,
      role: role ?? user.role,
      phone: phone ?? user.phone,
      gender: gender ?? user.gender,
      email_verified: email_verified ?? user.email_verified,
    });

    await user.save();

    return res.status(200).json({
      message: 'User updated successfully',
      user,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

// SOFT-DELETE user
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Instead of physically destroying, just mark it as deleted
    user.is_deleted = true;
    await user.save();

    return res.status(200).json({ message: 'User soft-deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function blockUnblockUser(req, res) {
  try {
    const userId = req.params.id;

    // Get the user
    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Toggle is_deleted
    user.is_deleted = !user.is_deleted;
    await user.save();

    const statusMessage = user.is_deleted
      ? 'User blocked successfully'
      : 'User unblocked successfully';

    return res.status(200).json({ message: statusMessage, user });
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function getUserOrderHistory(req, res) {
  try {
    const { userId } = req.params;

    const orders = await Order.findAll({
      where: { user_id: userId },
      include: [
        {
          model: OrderItem,
          as: 'order_items',
          include: [
            {
              model: Product,
              as: 'product',
              attributes: ['product_id', 'name', 'price']
            },
            {
              model: Inventory,
              as: 'inventory',
              attributes: ['inventory_id', 'asset_code', 'status']
            },
          ],
        },
      ],
      order: [['order_date', 'DESC']],
    });

    if (!orders) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching user order history:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getDeletedUsers,
  updateUser,
  deleteUser,
  blockUnblockUser,
  getUserOrderHistory,
};
