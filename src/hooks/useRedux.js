import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';

// Import actions dari Redux slices
import {
  fetchMovies,
  fetchTrendingMovies,
  fetchTopRatedMovies,
  fetchMovieById,
  addMovie,
  updateMovie,
  deleteMovie
} from '../store/redux/moviesSlice';

import {
  fetchFavorites,
  addToFavorites,
  removeFromFavorites,
  refreshFavorites
} from '../store/redux/favoritesSlice';

import {
  fetchWatchlist,
  addToWatchlist,
  updateWatchlistItem,
  removeFromWatchlist,
  refreshWatchlist
} from '../store/redux/watchlistSlice';

/**
 * Custom hook untuk menggunakan Redux movies state dan actions
 * @returns {Object} Object berisi state dan actions untuk movies
 */
export const useMoviesRedux = () => {
  const dispatch = useDispatch();
  const { allMovies, trendingMovies, topRatedMovies, currentMovie, loading, error } = useSelector(state => state.movies);

  // Fungsi untuk mengambil semua film
  const getAllMovies = useCallback(() => {
    return dispatch(fetchMovies());
  }, [dispatch]);

  // Fungsi untuk mengambil film trending
  const getTrendingMovies = useCallback(() => {
    return dispatch(fetchTrendingMovies());
  }, [dispatch]);

  // Fungsi untuk mengambil film dengan rating tertinggi
  const getTopRatedMovies = useCallback(() => {
    return dispatch(fetchTopRatedMovies());
  }, [dispatch]);

  // Fungsi untuk mengambil film berdasarkan ID
  const getMovieById = useCallback((id) => {
    return dispatch(fetchMovieById(id));
  }, [dispatch]);

  // Fungsi untuk menambah film baru
  const createMovie = useCallback((movieData) => {
    return dispatch(addMovie(movieData));
  }, [dispatch]);

  // Fungsi untuk memperbarui film
  const editMovie = useCallback((id, movieData) => {
    return dispatch(updateMovie({ id, movieData }));
  }, [dispatch]);

  // Fungsi untuk menghapus film
  const removeMovie = useCallback((id) => {
    return dispatch(deleteMovie(id));
  }, [dispatch]);

  return {
    // State
    movies: allMovies,
    trendingMovies,
    topRatedMovies,
    currentMovie,
    loading,
    error,
    // Actions
    getAllMovies,
    getTrendingMovies,
    getTopRatedMovies,
    getMovieById,
    createMovie,
    editMovie,
    removeMovie
  };
};

/**
 * Custom hook untuk menggunakan Redux favorites state dan actions
 * @returns {Object} Object berisi state dan actions untuk favorites
 */
export const useFavoritesRedux = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector(state => state.favorites);

  // Fungsi untuk mengambil daftar favorit
  const getFavorites = useCallback((userId = '1') => {
    return dispatch(fetchFavorites(userId));
  }, [dispatch]);

  // Fungsi untuk menambah film ke favorit
  const addFavorite = useCallback((userId = '1', movieData) => {
    return dispatch(addToFavorites({ userId, movieData }));
  }, [dispatch]);

  // Fungsi untuk menghapus film dari favorit
  const removeFavorite = useCallback((id) => {
    return dispatch(removeFromFavorites(id));
  }, [dispatch]);

  // Fungsi untuk menyegarkan daftar favorit
  const refreshFavoritesList = useCallback((userId = '1') => {
    return dispatch(refreshFavorites(userId));
  }, [dispatch]);

  return {
    // State
    favorites,
    loading,
    error,
    // Actions
    getFavorites,
    addFavorite,
    removeFavorite,
    refreshFavoritesList
  };
};

/**
 * Custom hook untuk menggunakan Redux watchlist state dan actions
 * @returns {Object} Object berisi state dan actions untuk watchlist
 */
export const useWatchlistRedux = () => {
  const dispatch = useDispatch();
  const { watchlist, loading, error } = useSelector(state => state.watchlist);

  // Fungsi untuk mengambil daftar tontonan
  const getWatchlist = useCallback((userId = '1') => {
    return dispatch(fetchWatchlist(userId));
  }, [dispatch]);

  // Fungsi untuk menambah film ke daftar tontonan
  const addToWatchlistItem = useCallback((userId = '1', movieData) => {
    return dispatch(addToWatchlist({ userId, movieData }));
  }, [dispatch]);

  // Fungsi untuk memperbarui item di daftar tontonan
  const updateWatchlistMovie = useCallback((id, data) => {
    return dispatch(updateWatchlistItem({ id, data }));
  }, [dispatch]);

  // Fungsi untuk menghapus film dari daftar tontonan
  const removeWatchlistItem = useCallback((id) => {
    return dispatch(removeFromWatchlist(id));
  }, [dispatch]);

  // Fungsi untuk menyegarkan daftar tontonan
  const refreshWatchlistItems = useCallback((userId = '1') => {
    return dispatch(refreshWatchlist(userId));
  }, [dispatch]);

  return {
    // State
    watchlist,
    loading,
    error,
    // Actions
    getWatchlist,
    addToWatchlistItem,
    updateWatchlistMovie,
    removeWatchlistItem,
    refreshWatchlistItems
  };
};