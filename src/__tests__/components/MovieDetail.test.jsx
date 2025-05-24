import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import MovieDetail from '../../components/movie/MovieDetail';
import { useApi } from '../../hooks/useApi';
import { useAuth } from '../../contexts/AuthContext';

// Mock untuk hooks dan services
jest.mock('../../hooks/useApi', () => ({
  useApi: jest.fn()
}));

// Mock untuk services
const mockMovieService = {
  getMovieById: jest.fn()
};

const mockFavoriteService = {
  getFavorites: jest.fn(),
  addFavorite: jest.fn(),
  deleteFavorite: jest.fn()
};

const mockWatchlistService = {
  getWatchlist: jest.fn(),
  addToWatchlist: jest.fn(),
  removeFromWatchlist: jest.fn()
};

// Assign mocks to global scope for test access
window.movieService = mockMovieService;
window.favoriteService = mockFavoriteService;
window.watchlistService = mockWatchlistService;

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}));

// Mock untuk useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn().mockReturnValue({ id: '1' }),
  useNavigate: jest.fn().mockReturnValue(jest.fn())
}));

describe('MovieDetail Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mocks
    useAuth.mockReturnValue({
      currentUser: null
    });
    
    useApi.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });
    
    mockFavoriteService.getFavorites.mockResolvedValue([]);
    mockWatchlistService.getWatchlist.mockResolvedValue([]);
  });

  test('harus menampilkan loading state', () => {
    // Arrange
    useApi.mockReturnValue({
      data: null,
      loading: true,
      error: null
    });

    // Act
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText(/memuat detail film/i)).toBeInTheDocument();
  });

  test('harus menampilkan error state', () => {
    // Arrange
    useApi.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error loading movie'
    });

    // Act
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText(/error: error loading movie/i)).toBeInTheDocument();
  });

  test('harus menampilkan not found state', () => {
    // Arrange
    useApi.mockReturnValue({
      data: null,
      loading: false,
      error: null
    });

    // Act
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText(/film tidak ditemukan/i)).toBeInTheDocument();
    expect(screen.getByText(/kembali ke beranda/i)).toBeInTheDocument();
  });

  test('harus menampilkan detail film', () => {
    // Arrange
    const mockMovie = {
      id: 1,
      title: 'Test Movie',
      year: '2023',
      genre: 'Action',
      duration: '120 min',
      poster: 'https://example.com/poster.jpg',
      overview: 'This is a test movie'
    };
    
    useApi.mockReturnValue({
      data: mockMovie,
      loading: false,
      error: null
    });

    // Act
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2023')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('120 min')).toBeInTheDocument();
    expect(screen.getByText('This is a test movie')).toBeInTheDocument();
    expect(screen.getByAltText('Test Movie')).toHaveAttribute('src', 'https://example.com/poster.jpg');
  });

  test('harus menampilkan tombol favorit dan watchlist untuk user yang login', async () => {
    // Arrange
    const mockMovie = {
      id: 1,
      title: 'Test Movie',
      year: '2023',
      genre: 'Action',
      duration: '120 min',
      poster: 'https://example.com/poster.jpg',
      overview: 'This is a test movie'
    };
    
    useApi.mockReturnValue({
      data: mockMovie,
      loading: false,
      error: null
    });
    
    useAuth.mockReturnValue({
      currentUser: { id: 'user1', name: 'Test User' }
    });

    // Act
    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Assert - tombol harus ada
    expect(await screen.findByText(/tambah ke favorit/i)).toBeInTheDocument();
    expect(await screen.findByText(/tambah ke watchlist/i)).toBeInTheDocument();
  });
});