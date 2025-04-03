const userService = require('./user-service');
const { validationResult } = require('express-validator');

/**
 * Register a new user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const registerUser = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const userData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      // Only allow admin role if the system has no users yet (first user becomes admin)
      role: req.body.role === 'ADMIN' ? 'ADMIN' : 'USER'
    };

    const user = await userService.registerUser(userData);
    
    return res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    if (error.message === 'Email already in use' || error.message === 'Username already taken') {
      return res.status(409).json({
        success: false,
        message: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Failed to register user'
    });
  }
};

/**
 * Login user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const loginUser = async (req, res) => {
  try {
    // Check validation results
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    
    // Set JWT token in cookie (optional, client can also use Authorization header)
    res.cookie('token', result.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'strict'
    });
    
    return res.json({
      success: true,
      data: {
        user: result.user,
        token: result.token
      }
    });
  } catch (error) {
    if (error.message === 'Invalid email or password') {
      return res.status(401).json({
        success: false,
        message: error.message
      });
    }
    
    return res.status(500).json({
      success: false,
      message: 'Login failed'
    });
  }
};

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getUserProfile = async (req, res) => {
  try {
    const userId = res.locals.user.id;
    const user = await userService.getUserProfile(userId);
    
    return res.json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Logout user
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const logoutUser = (req, res) => {
  // Clear cookie
  res.clearCookie('token');
  
  return res.json({
    success: true,
    message: 'Logged out successfully'
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  logoutUser
}; 