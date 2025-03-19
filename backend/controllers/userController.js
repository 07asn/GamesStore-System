const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { hashPassword, generateToken } = require('../services/userService');
const jwt = require('jsonwebtoken');
const Cookie = require('cookie');


async function register(req, res) {
  try {
    const { email, password, name, phone, country, gender } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      name,
      phone,
      country,
      gender,
    });

    const token = generateToken(newUser.user_id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

module.exports = {
  register,
};

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.user_id);
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    res.json({
      message: 'Login successful',
      token,
    });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.user.userId;

    const user = await User.findOne({
      where: { user_id: userId },
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  register,
  login,
  getUserProfile,
};
