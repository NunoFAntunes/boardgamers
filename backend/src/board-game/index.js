const express = require('express');
const { body } = require('express-validator');
const boardGameHandlers = require('./board-game-handlers');
const { validateRequest } = require('../middleware/validate-request');

const router = express.Router();

// Define validation middleware
const createBoardGameValidators = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isString().withMessage('Title must be a string')
    .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters'),
  body('publisher')
    .notEmpty().withMessage('Publisher is required')
    .isString().withMessage('Publisher must be a string'),
  body('releaseYear')
    .notEmpty().withMessage('Release year is required')
    .isInt({ min: 1500, max: new Date().getFullYear() }).withMessage(`Release year must be between 1500 and ${new Date().getFullYear()}`),
  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),
  body('minPlayers')
    .notEmpty().withMessage('Minimum players is required')
    .isInt({ min: 1 }).withMessage('Minimum players must be at least 1'),
  body('maxPlayers')
    .notEmpty().withMessage('Maximum players is required')
    .isInt({ min: 1 }).withMessage('Maximum players must be at least 1')
    .custom((value, { req }) => {
      if (parseInt(value) < parseInt(req.body.minPlayers)) {
        throw new Error('Maximum players must be greater than or equal to minimum players');
      }
      return true;
    }),
  body('minPlaytime')
    .notEmpty().withMessage('Minimum playtime is required')
    .isInt({ min: 1 }).withMessage('Minimum playtime must be at least 1 minute'),
  body('maxPlaytime')
    .notEmpty().withMessage('Maximum playtime is required')
    .isInt({ min: 1 }).withMessage('Maximum playtime must be at least 1 minute')
    .custom((value, { req }) => {
      if (parseInt(value) < parseInt(req.body.minPlaytime)) {
        throw new Error('Maximum playtime must be greater than or equal to minimum playtime');
      }
      return true;
    }),
  body('minAge')
    .notEmpty().withMessage('Minimum age is required')
    .isInt({ min: 0 }).withMessage('Minimum age must be non-negative'),
  body('complexityRating')
    .notEmpty().withMessage('Complexity rating is required')
    .isFloat({ min: 1, max: 5 }).withMessage('Complexity rating must be between 1 and 5'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('Featured flag must be a boolean')
];

const updateBoardGameValidators = [
  body('title')
    .optional()
    .isString().withMessage('Title must be a string')
    .isLength({ min: 1, max: 255 }).withMessage('Title must be between 1 and 255 characters'),
  body('publisher')
    .optional()
    .isString().withMessage('Publisher must be a string'),
  body('releaseYear')
    .optional()
    .isInt({ min: 1500, max: new Date().getFullYear() }).withMessage(`Release year must be between 1500 and ${new Date().getFullYear()}`),
  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),
  body('minPlayers')
    .optional()
    .isInt({ min: 1 }).withMessage('Minimum players must be at least 1'),
  body('maxPlayers')
    .optional()
    .isInt({ min: 1 }).withMessage('Maximum players must be at least 1')
    .custom((value, { req }) => {
      if (req.body.minPlayers && parseInt(value) < parseInt(req.body.minPlayers)) {
        throw new Error('Maximum players must be greater than or equal to minimum players');
      }
      return true;
    }),
  body('minPlaytime')
    .optional()
    .isInt({ min: 1 }).withMessage('Minimum playtime must be at least 1 minute'),
  body('maxPlaytime')
    .optional()
    .isInt({ min: 1 }).withMessage('Maximum playtime must be at least 1 minute')
    .custom((value, { req }) => {
      if (req.body.minPlaytime && parseInt(value) < parseInt(req.body.minPlaytime)) {
        throw new Error('Maximum playtime must be greater than or equal to minimum playtime');
      }
      return true;
    }),
  body('minAge')
    .optional()
    .isInt({ min: 0 }).withMessage('Minimum age must be non-negative'),
  body('complexityRating')
    .optional()
    .isFloat({ min: 1, max: 5 }).withMessage('Complexity rating must be between 1 and 5'),
  body('imageUrl')
    .optional()
    .isURL().withMessage('Image URL must be a valid URL'),
  body('isFeatured')
    .optional()
    .isBoolean().withMessage('Featured flag must be a boolean')
];

// Define routes
router.get('/board-games', boardGameHandlers.getAllBoardGames);
router.get('/board-games/featured', boardGameHandlers.getFeaturedBoardGames);
router.get('/board-games/search', boardGameHandlers.searchBoardGames);
router.get('/board-games/:id', boardGameHandlers.getBoardGameById);
router.post('/board-games', createBoardGameValidators, validateRequest, boardGameHandlers.createBoardGame);
router.put('/board-games/:id', updateBoardGameValidators, validateRequest, boardGameHandlers.updateBoardGame);
router.delete('/board-games/:id', boardGameHandlers.deleteBoardGame);

// Export router
module.exports = router; 