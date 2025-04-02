const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Retrieves all board games with pagination
 */
async function getAllBoardGames(page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  return prisma.boardGame.findMany({
    skip,
    take: limit,
    include: {
      categories: {
        include: {
          category: true
        }
      },
      mechanics: {
        include: {
          mechanic: true
        }
      },
      tags: {
        include: {
          tag: true
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  });
}

/**
 * Retrieves a board game by ID
 */
async function getBoardGameById(id) {
  return prisma.boardGame.findUnique({
    where: { id },
    include: {
      categories: {
        include: {
          category: true
        }
      },
      mechanics: {
        include: {
          mechanic: true
        }
      },
      reviews: {
        include: {
          reviewScores: {
            include: {
              reviewer: true
            }
          }
        }
      },
      tags: {
        include: {
          tag: true
        }
      }
    }
  });
}

/**
 * Creates a new board game
 */
async function createBoardGame(boardGameData) {
  return prisma.boardGame.create({
    data: boardGameData
  });
}

/**
 * Updates an existing board game
 */
async function updateBoardGame(id, boardGameData) {
  return prisma.boardGame.update({
    where: { id },
    data: boardGameData
  });
}

/**
 * Deletes a board game
 */
async function deleteBoardGame(id) {
  return prisma.boardGame.delete({
    where: { id }
  });
}

/**
 * Search board games by title
 */
async function searchBoardGames(searchTerm, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  
  return prisma.boardGame.findMany({
    where: {
      title: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    skip,
    take: limit,
    include: {
      categories: {
        include: {
          category: true
        }
      }
    },
    orderBy: {
      title: 'asc'
    }
  });
}

/**
 * Get featured board games
 */
async function getFeaturedBoardGames(limit = 5) {
  return prisma.boardGame.findMany({
    where: { isFeatured: true },
    take: limit,
    include: {
      categories: {
        include: {
          category: true
        }
      }
    }
  });
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