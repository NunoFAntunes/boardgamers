const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// JWT configuration
const JWT_SECRET = process.env.JWT_SECRET || 'boardgamers-jwt-secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'boardgamers-refresh-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

/**
 * Register a new user
 * @param {Object} userData - User registration data
 * @returns {Promise<Object>} - Newly created account
 */
const registerUser = async ({ email, password, username, role = 'USER' }) => {
  // Check if email already exists
  const existingAccount = await prisma.account.findUnique({
    where: { email }
  });

  if (existingAccount) {
    throw new Error('Email already in use');
  }

  // Hash the password
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // Determine the role in the Account model
  const accountRole = role === 'REVIEWER' ? 'REVIEWER' : 'USER';

  // Create account in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // Create account first
    const account = await tx.account.create({
      data: {
        email,
        passwordHash,
        role: accountRole
      }
    });

    // Create the appropriate profile based on role
    if (accountRole === 'REVIEWER') {
      await tx.reviewer.create({
        data: {
          name: username,
          email,
          role: 'Reviewer',
          account: {
            connect: { id: account.id }
          }
        }
      });
    } else {
      await tx.user.create({
        data: {
          username,
          email,
          passwordHash, // For backward compatibility with existing model
          account: {
            connect: { id: account.id }
          }
        }
      });
    }

    return account;
  });

  return result;
};

/**
 * Login a user
 * @param {Object} credentials - User login credentials
 * @returns {Promise<Object>} - JWT tokens and account info
 */
const loginUser = async ({ email, password }) => {
  // Find account by email
  const account = await prisma.account.findUnique({
    where: { email }
  });

  if (!account) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  // Generate JWT tokens
  const token = generateAccessToken(account);
  const refreshToken = generateRefreshToken(account);

  // Update refresh token in database
  await prisma.account.update({
    where: { id: account.id },
    data: { 
      refreshToken,
      lastLogin: new Date()
    }
  });

  return { token, refreshToken, account };
};

/**
 * Refresh access token
 * @param {string} refreshToken - JWT refresh token
 * @returns {Promise<Object>} - New access token and account info
 */
const refreshAccessToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    
    // Find account by id and check if refresh token matches
    const account = await prisma.account.findUnique({
      where: { 
        id: decoded.id,
        refreshToken
      }
    });
    
    if (!account) {
      throw new Error('Invalid refresh token');
    }
    
    // Generate new access token
    const token = generateAccessToken(account);
    
    return { token, account };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};

/**
 * Generate JWT access token
 * @param {Object} account - User account data
 * @returns {string} - JWT token
 */
const generateAccessToken = (account) => {
  return jwt.sign(
    { 
      id: account.id,
      email: account.email,
      role: account.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Generate JWT refresh token
 * @param {Object} account - User account data
 * @returns {string} - JWT refresh token
 */
const generateRefreshToken = (account) => {
  return jwt.sign(
    { 
      id: account.id,
      tokenVersion: Date.now()
    },
    JWT_REFRESH_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN }
  );
};

module.exports = {
  registerUser,
  loginUser,
  refreshAccessToken
}; 