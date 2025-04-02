const boardGameQueries = require('./board-game-queries');

/**
 * Get all board games with pagination
 */
async function getAllBoardGames(page, limit) {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  
  if (parsedPage < 1) {
    throw new Error('Page must be greater than 0');
  }
  
  if (parsedLimit < 1 || parsedLimit > 50) {
    throw new Error('Limit must be between 1 and 50');
  }
  
  return boardGameQueries.getAllBoardGames(parsedPage, parsedLimit);
}

/**
 * Get a board game by ID
 */
async function getBoardGameById(id) {
  const parsedId = parseInt(id);
  
  if (isNaN(parsedId) || parsedId < 1) {
    throw new Error('Invalid board game ID');
  }
  
  const boardGame = await boardGameQueries.getBoardGameById(parsedId);
  
  if (!boardGame) {
    throw new Error('Board game not found');
  }
  
  return boardGame;
}

/**
 * Create a new board game
 */
async function createBoardGame(boardGameData) {
  validateBoardGameData(boardGameData);
  
  // Transform any data if necessary before saving
  const transformedData = {
    ...boardGameData,
    releaseYear: parseInt(boardGameData.releaseYear),
    minPlayers: parseInt(boardGameData.minPlayers),
    maxPlayers: parseInt(boardGameData.maxPlayers),
    minPlaytime: parseInt(boardGameData.minPlaytime),
    maxPlaytime: parseInt(boardGameData.maxPlaytime),
    minAge: parseInt(boardGameData.minAge),
    complexityRating: parseFloat(boardGameData.complexityRating)
  };
  
  return boardGameQueries.createBoardGame(transformedData);
}

/**
 * Update an existing board game
 */
async function updateBoardGame(id, boardGameData) {
  const parsedId = parseInt(id);
  
  if (isNaN(parsedId) || parsedId < 1) {
    throw new Error('Invalid board game ID');
  }
  
  // Check if board game exists
  const existing = await boardGameQueries.getBoardGameById(parsedId);
  
  if (!existing) {
    throw new Error('Board game not found');
  }
  
  validateBoardGameData(boardGameData, false);
  
  // Transform numeric fields
  const transformedData = { ...boardGameData };
  
  if (transformedData.releaseYear) {
    transformedData.releaseYear = parseInt(transformedData.releaseYear);
  }
  
  if (transformedData.minPlayers) {
    transformedData.minPlayers = parseInt(transformedData.minPlayers);
  }
  
  if (transformedData.maxPlayers) {
    transformedData.maxPlayers = parseInt(transformedData.maxPlayers);
  }
  
  if (transformedData.minPlaytime) {
    transformedData.minPlaytime = parseInt(transformedData.minPlaytime);
  }
  
  if (transformedData.maxPlaytime) {
    transformedData.maxPlaytime = parseInt(transformedData.maxPlaytime);
  }
  
  if (transformedData.minAge) {
    transformedData.minAge = parseInt(transformedData.minAge);
  }
  
  if (transformedData.complexityRating) {
    transformedData.complexityRating = parseFloat(transformedData.complexityRating);
  }
  
  return boardGameQueries.updateBoardGame(parsedId, transformedData);
}

/**
 * Delete a board game
 */
async function deleteBoardGame(id) {
  const parsedId = parseInt(id);
  
  if (isNaN(parsedId) || parsedId < 1) {
    throw new Error('Invalid board game ID');
  }
  
  // Check if board game exists
  const existing = await boardGameQueries.getBoardGameById(parsedId);
  
  if (!existing) {
    throw new Error('Board game not found');
  }
  
  return boardGameQueries.deleteBoardGame(parsedId);
}

/**
 * Search board games by title
 */
async function searchBoardGames(searchTerm, page, limit) {
  if (!searchTerm || searchTerm.trim() === '') {
    throw new Error('Search term is required');
  }
  
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  
  if (parsedPage < 1) {
    throw new Error('Page must be greater than 0');
  }
  
  if (parsedLimit < 1 || parsedLimit > 50) {
    throw new Error('Limit must be between 1 and 50');
  }
  
  return boardGameQueries.searchBoardGames(searchTerm, parsedPage, parsedLimit);
}

/**
 * Get featured board games
 */
async function getFeaturedBoardGames(limit) {
  const parsedLimit = parseInt(limit) || 5;
  
  if (parsedLimit < 1 || parsedLimit > 20) {
    throw new Error('Limit must be between 1 and 20');
  }
  
  return boardGameQueries.getFeaturedBoardGames(parsedLimit);
}

/**
 * Validate board game data
 */
function validateBoardGameData(data, isCreating = true) {
  const requiredFields = [
    'title', 
    'publisher', 
    'releaseYear', 
    'description', 
    'minPlayers', 
    'maxPlayers', 
    'minPlaytime', 
    'maxPlaytime', 
    'minAge', 
    'complexityRating'
  ];
  
  if (isCreating) {
    for (const field of requiredFields) {
      if (!data[field] && data[field] !== 0) {
        throw new Error(`${field} is required`);
      }
    }
  }
  
  // Validate numeric fields if they exist
  if (data.releaseYear && (isNaN(data.releaseYear) || data.releaseYear < 1500 || data.releaseYear > new Date().getFullYear())) {
    throw new Error('Invalid release year');
  }
  
  if (data.minPlayers && (isNaN(data.minPlayers) || data.minPlayers < 1)) {
    throw new Error('Minimum players must be at least 1');
  }
  
  if (data.maxPlayers && (isNaN(data.maxPlayers) || data.maxPlayers < data.minPlayers)) {
    throw new Error('Maximum players must be greater than or equal to minimum players');
  }
  
  if (data.minPlaytime && (isNaN(data.minPlaytime) || data.minPlaytime < 1)) {
    throw new Error('Minimum playtime must be at least 1 minute');
  }
  
  if (data.maxPlaytime && (isNaN(data.maxPlaytime) || data.maxPlaytime < data.minPlaytime)) {
    throw new Error('Maximum playtime must be greater than or equal to minimum playtime');
  }
  
  if (data.minAge && (isNaN(data.minAge) || data.minAge < 0)) {
    throw new Error('Minimum age must be non-negative');
  }
  
  if (data.complexityRating && (isNaN(data.complexityRating) || data.complexityRating < 1 || data.complexityRating > 5)) {
    throw new Error('Complexity rating must be between 1 and 5');
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