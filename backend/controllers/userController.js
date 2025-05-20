const User = require("../models/User");
const {
  hashPassword,
  comparePasswords,
  generateToken,
} = require("../services/userService");
const { sendEmail } = require("../services/emailService");

const jwt = require("jsonwebtoken");

const generateVerificationToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

async function register(req, res) {
  try {
    const { email, password, name, phone, country, gender } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
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

    const token = generateToken(newUser.user_id, newUser.role);

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user.user_id, user.role);
    res.cookie("token", token, { httpOnly: false, maxAge: 3600000, path: "/" });

    if (!user.email_verified) {
      return res.json({
        message: "Login successful, but email is not verified",
        token,
        email_verified: false,
      });
    }

    res.json({
      message: "Login successful",
      token,
      email_verified: true,
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function getUserProfile(req, res) {
  try {
    const userId = req.user.userId;
    const user = await User.findOne({
      where: { user_id: userId },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
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
      return res.status(404).json({ message: "User not found" });
    }

    user.set({
      name: name || user.name,
      email: email || user.email,
      phone: phone || user.phone,
      country: country || user.country,
      gender: gender || user.gender,
    });

    await user.save();

    res.json({
      message: "User profile updated successfully",
      user: user,
    });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function updatePassword(req, res) {
  const { currentPassword, newPassword } = req.body;
  const userId = req.user.userId;

  try {
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await comparePasswords(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const hashedPassword = await hashPassword(newPassword);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function sendVerificationEmail(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verificationToken = generateVerificationToken(user.user_id);

    await sendEmail({
      to: user.email,
      subject: "Verify Your Email",
      text: `Please verify your email by clicking the following link: ${process.env.APP_URL}/verify-email?token=${verificationToken}`,
    });

    res.json({ message: "Verification email sent successfully." });
  } catch (error) {
    console.error("Error sending verification email:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function verifyEmail(req, res) {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Missing token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;
    console.log("Decoded user_id:", userId);

    const [updated] = await User.update(
      { email_verified: true },
      { where: { user_id: userId } }
    );
    console.log("Number of rows updated:", updated);

    if (updated === 0) {
      return res
        .status(404)
        .json({ message: "User not found or already verified" });
    }

    res.json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
}

async function forgotPassword(req, res) {
  try {
    console.log("backend: forgotPassword");
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.json({
        message:
          "If a user with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    const baseUrl = process.env.APP_URL.replace(/\/$/, "");
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested to reset your password. Please click the following link to reset your password: ${resetUrl}
      
If you did not request a password reset, please ignore this email.`,
    });

    res.json({
      message: "If a user with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

async function resetPassword(req, res) {
  try {
    console.log("backend: resetPassword");
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res
        .status(400)
        .json({ message: "Token and new password are required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.user_id;
    console.log("Decoded user_id:", userId);

    const user = await User.findOne({ where: { user_id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;
    await user.save();

    const updatedUser = await User.findOne({ where: { user_id: userId } });
    console.log("Updated user password in DB:", updatedUser.password);

    res.json({ message: "Password has been reset successfully." });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(400).json({ message: "Invalid or expired token" });
  }
}

async function getAuthStatus(req, res) {
  try {
    if (req.user) {
      return res.json({ loggedIn: true, user: req.user });
    } else {
      return res.json({ loggedIn: false });
    }
  } catch (error) {
    return res.status(500).json({ loggedIn: false, message: "Server error" });
  }
}

module.exports = {
  register,
  login,
  getUserProfile,
  updateProfile,
  updatePassword,
  sendVerificationEmail,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getAuthStatus,
};
