import {
  getAllMovies,
  getMovieById,
  getTrendingMovies,
  getTopRatedMovies,
  getMoviesByGenre
} from '../../services/api/movieService';
import apiClient from '../../services/api/index';

// Mock untuk apiClient
jest.mock('../../services/api/index', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  invalidateCache: jest.fn(),
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    invalidateCache: jest.fn()
  }
}));

describe('Movie Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllMovies', () => {
    test('harus mengembalikan data film ketika request berhasil', async () => {
      // Arrange
      const mockMovies = [{ id: 1, title: 'Film 1' }, { id: 2, title: 'Film 2' }];
      apiClient.get.mockResolvedValue({ data: mockMovies });

      // Act
      const result = await getAllMovies();

      // Assert
      expect(apiClient.get).toHaveBeenCalledWith('/movies');
      expect(result).toEqual(mockMovies);
    });

    test('harus menangani error rate limit', async () => {
      // Arrange
      const mockError = new Error('Rate limit exceeded');
      mockError.response = { status: 429 };
      apiClient.get.mockRejectedValue(mockError);

      // Act & Assert
      await expect(getAllMovies()).rejects.toThrow();
      expect(apiClient.get).toHaveBeenCalledWith('/movies');
    });
  });

  describe('getMovieById', () => {
    test('harus mengembalikan data film berdasarkan ID', async () => {
      // Arrange
      const mockMovie = { id: 1, title: 'Film 1' };
      apiClient.get.mockResolvedValue({ data: mockMovie });

      // Act
      const result = await getMovieById(1);

      // Assert
      expect(apiClient.get).toHaveBeenCalledWith('/movies/1');
      expect(result).toEqual(mockMovie);
    });
  });

  describe('getTrendingMovies', () => {
    test('harus mengembalikan film trending', async () => {
      // Arrange
      const mockTrendingMovies = [{ id: 1, title: 'Film Trending 1' }];
      apiClient.get.mockResolvedValue({ data: mockTrendingMovies });

      // Act
      const result = await getTrendingMovies();

      // Assert
      expect(apiClient.get).toHaveBeenCalledWith('/movies?isTrending=true');
      expect(result).toEqual(mockTrendingMovies);
    });
  });

  describe('getTopRatedMovies', () => {
    test('harus mengembalikan film dengan rating tertinggi', async () => {
      // Arrange
      const mockTopRatedMovies = [{ id: 1, title: 'Film Top Rated 1' }];
      apiClient.get.mockResolvedValue({ data: mockTopRatedMovies });

      // Act
      const result = await getTopRatedMovies();

      // Assert
      expect(apiClient.get).toHaveBeenCalledWith('/movies?isTopRated=true');
      expect(result).toEqual(mockTopRatedMovies);
    });

    test('harus mengambil film berdasarkan rating jika tidak ada film top rated', async () => {
      // Arrange
      apiClient.get.mockResolvedValueOnce({ data: [] }); // Tidak ada film top rated
      const mockRatedMovies = [{ id: 1, title: 'Film Rated 1' }];
      apiClient.get.mockResolvedValueOnce({ data: mockRatedMovies }); // Film berdasarkan rating

      // Act
      const result = await getTopRatedMovies();

      // Assert
      expect(apiClient.get).toHaveBeenNthCalledWith(1, '/movies?isTopRated=true');
      expect(apiClient.get).toHaveBeenNthCalledWith(2, '/movies?_sort=rating&_order=desc&_limit=10');
      expect(result).toEqual(mockRatedMovies);
    });
  });

  describe('getMoviesByGenre', () => {
    test('harus mengembalikan film berdasarkan genre', async () => {
      // Arrange
      const allMovies = [
        { id: 1, title: 'Film 1', genres: ['Action', 'Drama'] },
        { id: 2, title: 'Film 2', genres: ['Comedy'] },
        { id: 3, title: 'Film 3', genres: ['Action'] }
      ];
      apiClient.get.mockResolvedValue({ data: allMovies });

      // Act
      const result = await getMoviesByGenre('Action');

      // Assert
      expect(apiClient.get).toHaveBeenCalledWith('/movies');
      expect(result).toEqual([allMovies[0], allMovies[2]]);
    });
  });
});