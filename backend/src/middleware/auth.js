const jwt = require('jsonwebtoken');

/**
 * Authentication middleware to verify JWT token
 */
const authenticate = (req, res, next) => {
  try {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1] || req.cookies.token;

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach user to res.locals
    res.locals.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid or expired token' 
    });
  }
};

/**
 * Authorization middleware for admin access
 */
const authorizeAdmin = (req, res, next) => {
  if (!res.locals.user || res.locals.user.role !== 'ADMIN') {
    return res.status(403).json({ 
      success: false, 
      message: 'Forbidden: Admin access required' 
    });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin
}; 