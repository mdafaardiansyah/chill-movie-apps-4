import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { favoriteService } from '../../hooks/useApi';

// Async thunk untuk mengambil daftar favorit
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (userId = '1', { rejectWithValue }) => {
    try {
      const favorites = await favoriteService.getFavorites(userId);
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil daftar favorit');
    }
  }
);

// Async thunk untuk menambah film ke favorit
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async ({ userId = '1', movieData }, { rejectWithValue }) => {
    try {
      const newFavorite = await favoriteService.addFavorite(userId, movieData);
      return newFavorite;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menambahkan film ke favorit');
    }
  }
);

// Async thunk untuk menghapus film dari favorit
export const removeFromFavorites = createAsyncThunk(
  'favorites/removeFromFavorites',
  async (id, { rejectWithValue }) => {
    try {
      await favoriteService.deleteFavorite(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menghapus film dari favorit');
    }
  }
);

// Async thunk untuk menyegarkan daftar favorit
export const refreshFavorites = createAsyncThunk(
  'favorites/refreshFavorites',
  async (userId = '1', { rejectWithValue }) => {
    try {
      const favorites = await favoriteService.refreshFavorites(userId);
      return favorites;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menyegarkan daftar favorit');
    }
  }
);

// Initial state untuk favorites slice
const initialState = {
  favorites: [],
  loading: false,
  error: null,
};

// Membuat slice untuk favorites
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handlers untuk fetchFavorites
      .addCase(fetchFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk addToFavorites
      .addCase(addToFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites.push(action.payload);
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk removeFromFavorites
      .addCase(removeFromFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = state.favorites.filter(favorite => favorite.id !== action.payload);
      })
      .addCase(removeFromFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk refreshFavorites
      .addCase(refreshFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(refreshFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = favoritesSlice.actions;

export default favoritesSlice.reducer;