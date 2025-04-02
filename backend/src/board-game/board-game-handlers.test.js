const boardGameHandlers = require('./board-game-handlers');
const boardGameService = require('./board-game-service');

// Mock the service
jest.mock('./board-game-service');

describe('Board Game Handlers', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      end: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('getAllBoardGames', () => {
    it('should return all board games with pagination', async () => {
      // Arrange
      const mockBoardGames = [
        { id: 1, title: 'Game 1' },
        { id: 2, title: 'Game 2' }
      ];
      
      mockRequest.query = { page: '1', limit: '10' };
      boardGameService.getAllBoardGames.mockResolvedValue(mockBoardGames);

      // Act
      await boardGameHandlers.getAllBoardGames(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(boardGameService.getAllBoardGames).toHaveBeenCalledWith('1', '10');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockBoardGames,
        page: 1,
        limit: 10,
        links: {
          self: '/api/board-games?page=1&limit=10',
          next: '/api/board-games?page=2&limit=10',
          prev: null
        }
      });
    });
    
    it('should handle errors', async () => {
      // Arrange
      const mockError = new Error('Test error');
      mockRequest.query = { page: '1', limit: '10' };
      boardGameService.getAllBoardGames.mockRejectedValue(mockError);

      // Act
      await boardGameHandlers.getAllBoardGames(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getBoardGameById', () => {
    it('should return a board game by ID', async () => {
      // Arrange
      const mockBoardGame = { id: 1, title: 'Game 1' };
      mockRequest.params = { id: '1' };
      boardGameService.getBoardGameById.mockResolvedValue(mockBoardGame);

      // Act
      await boardGameHandlers.getBoardGameById(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(boardGameService.getBoardGameById).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockBoardGame,
        links: {
          self: '/api/board-games/1',
          collection: '/api/board-games'
        }
      });
    });
    
    it('should handle errors', async () => {
      // Arrange
      const mockError = new Error('Test error');
      mockRequest.params = { id: '1' };
      boardGameService.getBoardGameById.mockRejectedValue(mockError);

      // Act
      await boardGameHandlers.getBoardGameById(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(nextFunction).toHaveBeenCalledWith(mockError);
    });
  });

  describe('createBoardGame', () => {
    it('should create a new board game', async () => {
      // Arrange
      const mockBoardGameData = { 
        title: 'New Game',
        publisher: 'Test Publisher',
        releaseYear: 2022
      };
      const mockNewBoardGame = { 
        id: 1, 
        title: 'New Game',
        publisher: 'Test Publisher',
        releaseYear: 2022 
      };
      
      mockRequest.body = mockBoardGameData;
      boardGameService.createBoardGame.mockResolvedValue(mockNewBoardGame);

      // Act
      await boardGameHandlers.createBoardGame(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(boardGameService.createBoardGame).toHaveBeenCalledWith(mockBoardGameData);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockNewBoardGame,
        links: {
          self: '/api/board-games/1',
          collection: '/api/board-games'
        }
      });
    });
  });

  describe('updateBoardGame', () => {
    it('should update an existing board game', async () => {
      // Arrange
      const mockBoardGameData = { title: 'Updated Game' };
      const mockUpdatedBoardGame = { 
        id: 1, 
        title: 'Updated Game',
        publisher: 'Test Publisher'
      };
      
      mockRequest.params = { id: '1' };
      mockRequest.body = mockBoardGameData;
      boardGameService.updateBoardGame.mockResolvedValue(mockUpdatedBoardGame);

      // Act
      await boardGameHandlers.updateBoardGame(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(boardGameService.updateBoardGame).toHaveBeenCalledWith('1', mockBoardGameData);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: mockUpdatedBoardGame,
        links: {
          self: '/api/board-games/1',
          collection: '/api/board-games'
        }
      });
    });
  });

  describe('deleteBoardGame', () => {
    it('should delete a board game', async () => {
      // Arrange
      mockRequest.params = { id: '1' };
      boardGameService.deleteBoardGame.mockResolvedValue();

      // Act
      await boardGameHandlers.deleteBoardGame(mockRequest, mockResponse, nextFunction);

      // Assert
      expect(boardGameService.deleteBoardGame).toHaveBeenCalledWith('1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.end).toHaveBeenCalled();
    });
  });
}); 