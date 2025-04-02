const boardGameService = require('./board-game-service');

/**
 * Get all board games
 */
async function getAllBoardGames(req, res, next) {
  try {
    const { page, limit } = req.query;
    const boardGames = await boardGameService.getAllBoardGames(page, limit);
    
    res.status(200).json({
      success: true,
      data: boardGames,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      links: {
        self: `/api/board-games?page=${parseInt(page) || 1}&limit=${parseInt(limit) || 10}`,
        next: `/api/board-games?page=${(parseInt(page) || 1) + 1}&limit=${parseInt(limit) || 10}`,
        prev: (parseInt(page) || 1) > 1 ? `/api/board-games?page=${(parseInt(page) || 1) - 1}&limit=${parseInt(limit) || 10}` : null
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get a board game by ID
 */
async function getBoardGameById(req, res, next) {
  try {
    const { id } = req.params;
    const boardGame = await boardGameService.getBoardGameById(id);
    
    res.status(200).json({
      success: true,
      data: boardGame,
      links: {
        self: `/api/board-games/${id}`,
        collection: '/api/board-games'
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Create a new board game
 */
async function createBoardGame(req, res, next) {
  try {
    const boardGameData = req.body;
    const newBoardGame = await boardGameService.createBoardGame(boardGameData);
    
    res.status(201).json({
      success: true,
      data: newBoardGame,
      links: {
        self: `/api/board-games/${newBoardGame.id}`,
        collection: '/api/board-games'
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Update an existing board game
 */
async function updateBoardGame(req, res, next) {
  try {
    const { id } = req.params;
    const boardGameData = req.body;
    const updatedBoardGame = await boardGameService.updateBoardGame(id, boardGameData);
    
    res.status(200).json({
      success: true,
      data: updatedBoardGame,
      links: {
        self: `/api/board-games/${id}`,
        collection: '/api/board-games'
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Delete a board game
 */
async function deleteBoardGame(req, res, next) {
  try {
    const { id } = req.params;
    await boardGameService.deleteBoardGame(id);
    
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

/**
 * Search board games by title
 */
async function searchBoardGames(req, res, next) {
  try {
    const { query, page, limit } = req.query;
    const boardGames = await boardGameService.searchBoardGames(query, page, limit);
    
    res.status(200).json({
      success: true,
      data: boardGames,
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      links: {
        self: `/api/board-games/search?query=${query}&page=${parseInt(page) || 1}&limit=${parseInt(limit) || 10}`,
        next: `/api/board-games/search?query=${query}&page=${(parseInt(page) || 1) + 1}&limit=${parseInt(limit) || 10}`,
        prev: (parseInt(page) || 1) > 1 ? `/api/board-games/search?query=${query}&page=${(parseInt(page) || 1) - 1}&limit=${parseInt(limit) || 10}` : null
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Get featured board games
 */
async function getFeaturedBoardGames(req, res, next) {
  try {
    const { limit } = req.query;
    const boardGames = await boardGameService.getFeaturedBoardGames(limit);
    
    res.status(200).json({
      success: true,
      data: boardGames,
      links: {
        self: `/api/board-games/featured?limit=${parseInt(limit) || 5}`,
        collection: '/api/board-games'
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllBoardGames,
  getBoardGameById,
  createBoardGame,
  updateBoardGame,
  deleteBoardGame,
  searchBoardGames,
  getFeaturedBoardGames
}; 