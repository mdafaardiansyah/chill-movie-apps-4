import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as movieService from '../../services/api/movieService';

// Async thunk untuk mengambil semua film
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getAllMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil data film');
    }
  }
);

// Async thunk untuk mengambil film trending
export const fetchTrendingMovies = createAsyncThunk(
  'movies/fetchTrendingMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getTrendingMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil data film trending');
    }
  }
);

// Async thunk untuk mengambil film dengan rating tertinggi
export const fetchTopRatedMovies = createAsyncThunk(
  'movies/fetchTopRatedMovies',
  async (_, { rejectWithValue }) => {
    try {
      const movies = await movieService.getTopRatedMovies();
      return movies;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil data film dengan rating tertinggi');
    }
  }
);

// Async thunk untuk mengambil film berdasarkan ID
export const fetchMovieById = createAsyncThunk(
  'movies/fetchMovieById',
  async (id, { rejectWithValue }) => {
    try {
      const movie = await movieService.getMovieById(id);
      return movie;
    } catch (error) {
      return rejectWithValue(error.message || `Gagal mengambil data film dengan ID ${id}`);
    }
  }
);

// Async thunk untuk menambah film baru
export const addMovie = createAsyncThunk(
  'movies/addMovie',
  async (movieData, { rejectWithValue }) => {
    try {
      const newMovie = await movieService.addMovie(movieData);
      return newMovie;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menambahkan film baru');
    }
  }
);

// Async thunk untuk memperbarui film
export const updateMovie = createAsyncThunk(
  'movies/updateMovie',
  async ({ id, movieData }, { rejectWithValue }) => {
    try {
      const updatedMovie = await movieService.updateMovie(id, movieData);
      return updatedMovie;
    } catch (error) {
      return rejectWithValue(error.message || `Gagal memperbarui film dengan ID ${id}`);
    }
  }
);

// Async thunk untuk menghapus film
export const deleteMovie = createAsyncThunk(
  'movies/deleteMovie',
  async (id, { rejectWithValue }) => {
    try {
      await movieService.deleteMovie(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || `Gagal menghapus film dengan ID ${id}`);
    }
  }
);

// Initial state untuk movies slice
const initialState = {
  allMovies: [],
  trendingMovies: [],
  topRatedMovies: [],
  currentMovie: null,
  loading: false,
  error: null,
};

// Membuat slice untuk movies
const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentMovie: (state) => {
      state.currentMovie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handlers untuk fetchMovies
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk fetchTrendingMovies
      .addCase(fetchTrendingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.trendingMovies = action.payload;
      })
      .addCase(fetchTrendingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk fetchTopRatedMovies
      .addCase(fetchTopRatedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topRatedMovies = action.payload;
      })
      .addCase(fetchTopRatedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk fetchMovieById
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk addMovie
      .addCase(addMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies.push(action.payload);
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk updateMovie
      .addCase(updateMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMovie.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.allMovies.findIndex(movie => movie.id === action.payload.id);
        if (index !== -1) {
          state.allMovies[index] = action.payload;
        }
        if (state.currentMovie && state.currentMovie.id === action.payload.id) {
          state.currentMovie = action.payload;
        }
      })
      .addCase(updateMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk deleteMovie
      .addCase(deleteMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.allMovies = state.allMovies.filter(movie => movie.id !== action.payload);
        if (state.currentMovie && state.currentMovie.id === action.payload) {
          state.currentMovie = null;
        }
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearCurrentMovie } = moviesSlice.actions;

export default moviesSlice.reducer;