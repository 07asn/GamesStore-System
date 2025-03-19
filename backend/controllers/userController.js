const User = require('../models/User');
const { hashPassword, comparePasswords, generateToken } = require('../services/userService');

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

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await comparePasswords(password, user.password);
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

async function updateProfile(req, res) {
  try {
    const userId = req.user.userId;
    const { name, email, phone, country, gender } = req.body;

    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use Sequelize's `set` method to update the fields, this ensures Sequelize tracks the changes
    user.set({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      country: country || user.country,
      gender: gender || user.gender,
    });

    // Save the updated user to the database
    await user.save();

    res.json({
      message: 'User profile updated successfully',
      user: user,  // Return the updated user object
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId; // Assuming userId is available from authentication middleware

  try {
    // Find the user by ID
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare current password with stored password
    const isMatch = await comparePasswords(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash the new password
    const hashedPassword = await hashPassword(newPassword);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = {
  register,
  login,
  getUserProfile,
  updateProfile,
  updatePassword,
};
