const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
const signup = async (req, res) => {
  try {
    const { name, email, phone, password, role, location, preferredLanguage } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.phone === phone
          ? 'Phone number already registered'
          : 'Email already registered',
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || 'farmer',
      location: location || '',
      preferredLanguage: preferredLanguage || 'en',
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
        totalLandArea: user.totalLandArea,
        irrigationType: user.irrigationType,
        soilType: user.soilType,
        token,
      },
    });
  } catch (error) {
    console.error('Signup error:', error.message);
    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({ success: false, message: `This ${field} is already registered.` });
    }
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join('. ') });
    }
    res.status(500).json({ success: false, message: error.message || 'Server error during signup' });
  }
};

// @desc    Login user (supports email OR phone as identifier)
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    // Validate
    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/phone and password',
      });
    }

    // Determine if identifier is phone or email
    const isPhone = /^[6-9]\d{9}$/.test(identifier);
    const query = isPhone ? { phone: identifier } : { email: identifier.toLowerCase() };

    // Find user and include password
    const user = await User.findOne(query).select('+password');
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
        profileImage: user.profileImage,
        totalLandArea: user.totalLandArea,
        irrigationType: user.irrigationType,
        soilType: user.soilType,
        token,
      },
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error during login' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('GetMe error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

// @desc    Login/Signup with Google
// @route   POST /api/auth/google
// @access  Public
const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: 'Google credential is required',
      });
    }

    // Verify the Google ID token
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, picture, sub: googleId } = payload;

    // Find existing user or create new one
    let user = await User.findOne({ email });

    if (!user) {
      // Auto-create user from Google profile
      user = await User.create({
        name: name || 'Google User',
        email,
        phone: `G${googleId.slice(-9)}`, // Placeholder phone from Google ID
        password: `google_${googleId}_${Date.now()}`, // Random password (won't be used)
        role: 'farmer',
        profileImage: picture || '',
      });
    }

    // Generate JWT token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: user.createdAt ? 'Login successful' : 'Account created successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        location: user.location,
        profileImage: user.profileImage || picture,
        totalLandArea: user.totalLandArea,
        irrigationType: user.irrigationType,
        soilType: user.soilType,
        token,
      },
    });
  } catch (error) {
    console.error('Google auth error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Google authentication failed' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Allow updating specific fields
    user.name = req.body.name || user.name;
    user.location = req.body.location !== undefined ? req.body.location : user.location;
    user.preferredLanguage = req.body.preferredLanguage || user.preferredLanguage;
    user.totalLandArea = req.body.totalLandArea !== undefined ? req.body.totalLandArea : user.totalLandArea;
    user.irrigationType = req.body.irrigationType !== undefined ? req.body.irrigationType : user.irrigationType;
    user.soilType = req.body.soilType !== undefined ? req.body.soilType : user.soilType;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        location: updatedUser.location,
        preferredLanguage: updatedUser.preferredLanguage,
        totalLandArea: updatedUser.totalLandArea,
        irrigationType: updatedUser.irrigationType,
        soilType: updatedUser.soilType,
        token: generateToken(updatedUser._id),
      },
    });
  } catch (error) {
    console.error('Update profile error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error during profile update' });
  }
};

// @desc    Reset password (by phone)
// @route   PUT /api/auth/reset-password
// @access  Public
const resetPassword = async (req, res) => {
  try {
    const { phone, newPassword } = req.body;

    if (!phone || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide phone number and new password',
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    const user = await User.findOne({ phone }).select('+password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this phone number',
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successfully',
    });
  } catch (error) {
    console.error('Reset password error:', error.message);
    res.status(500).json({ success: false, message: error.message || 'Server error during password reset' });
  }
};

module.exports = { signup, login, getMe, googleLogin, updateProfile, resetPassword };
