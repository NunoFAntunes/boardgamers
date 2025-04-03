const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userQueries = require('./user-queries');

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Created user (without password)
 */
const registerUser = async (userData) => {
  // Check if user already exists
  const existingEmail = await userQueries.findUserByEmail(userData.email);
  if (existingEmail) {
    throw new Error('Email already in use');
  }
  
  const existingUsername = await userQueries.findUserByUsername(userData.username);
  if (existingUsername) {
    throw new Error('Username already taken');
  }
  
  // Hash password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(userData.password, saltRounds);
  
  // Create user
  const user = await userQueries.createUser({
    username: userData.username,
    email: userData.email,
    passwordHash,
    role: userData.role || 'USER'
  });
  
  // Return user without password
  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Login a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<Object>} - User data and JWT token
 */
const loginUser = async (email, password) => {
  // Find user by email
  const user = await userQueries.findUserByEmail(email);
  if (!user) {
    throw new Error('Invalid email or password');
  }
  
  // Check password
  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }
  
  // Update last login
  await userQueries.updateLastLogin(user.id);
  
  // Generate JWT token
  const token = generateToken(user);
  
  // Return user without password
  const { passwordHash: _, ...userWithoutPassword } = user;
  return {
    user: userWithoutPassword,
    token
  };
};

/**
 * Get user profile
 * @param {number} userId - User ID
 * @returns {Promise<Object>} - User profile
 */
const getUserProfile = async (userId) => {
  const user = await userQueries.findUserById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  
  // Return user without password
  const { passwordHash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Generate JWT token
 * @param {Object} user - User object
 * @returns {string} - JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      username: user.username,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile
}; 