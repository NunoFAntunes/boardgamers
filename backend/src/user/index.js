const express = require('express');
const router = express.Router();
const userHandlers = require('./user-handlers');
const { registerValidation, loginValidation } = require('./user-validation');
const { authenticate } = require('../middleware/auth');

// Public routes
router.post('/register', registerValidation, userHandlers.registerUser);
router.post('/login', loginValidation, userHandlers.loginUser);
router.post('/logout', userHandlers.logoutUser);

// Protected routes
router.get('/profile', authenticate, userHandlers.getUserProfile);

module.exports = router; 