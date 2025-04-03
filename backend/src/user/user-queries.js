const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Find a user by email
 * @param {string} email - User email
 * @returns {Promise<Object|null>} - User object or null
 */
const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email }
  });
};

/**
 * Find a user by username
 * @param {string} username - Username
 * @returns {Promise<Object|null>} - User object or null
 */
const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username }
  });
};

/**
 * Find a user by ID
 * @param {number} id - User ID
 * @returns {Promise<Object|null>} - User object or null
 */
const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id }
  });
};

/**
 * Create a new user
 * @param {Object} userData - User data
 * @returns {Promise<Object>} - Created user
 */
const createUser = async (userData) => {
  return prisma.user.create({
    data: userData
  });
};

/**
 * Update user's last login timestamp
 * @param {number} id - User ID
 * @returns {Promise<Object>} - Updated user
 */
const updateLastLogin = async (id) => {
  return prisma.user.update({
    where: { id },
    data: { lastLogin: new Date() }
  });
};

module.exports = {
  findUserByEmail,
  findUserByUsername,
  findUserById,
  createUser,
  updateLastLogin
}; 