import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { watchlistService } from '../../hooks/useApi';

// Async thunk untuk mengambil daftar tontonan
export const fetchWatchlist = createAsyncThunk(
  'watchlist/fetchWatchlist',
  async (userId = '1', { rejectWithValue }) => {
    try {
      const watchlist = await watchlistService.getWatchlist(userId);
      return watchlist;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal mengambil daftar tontonan');
    }
  }
);

// Async thunk untuk menambah film ke daftar tontonan
export const addToWatchlist = createAsyncThunk(
  'watchlist/addToWatchlist',
  async ({ userId = '1', movieData }, { rejectWithValue }) => {
    try {
      const newWatchlistItem = await watchlistService.addToWatchlist(userId, movieData);
      return newWatchlistItem;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menambahkan film ke daftar tontonan');
    }
  }
);

// Async thunk untuk memperbarui item di daftar tontonan
export const updateWatchlistItem = createAsyncThunk(
  'watchlist/updateWatchlistItem',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const updatedItem = await watchlistService.updateWatchlistItem(id, data);
      return updatedItem;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal memperbarui item di daftar tontonan');
    }
  }
);

// Async thunk untuk menghapus film dari daftar tontonan
export const removeFromWatchlist = createAsyncThunk(
  'watchlist/removeFromWatchlist',
  async (id, { rejectWithValue }) => {
    try {
      await watchlistService.removeFromWatchlist(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menghapus film dari daftar tontonan');
    }
  }
);

// Async thunk untuk menyegarkan daftar tontonan
export const refreshWatchlist = createAsyncThunk(
  'watchlist/refreshWatchlist',
  async (userId = '1', { rejectWithValue }) => {
    try {
      const watchlist = await watchlistService.refreshWatchlist(userId);
      return watchlist;
    } catch (error) {
      return rejectWithValue(error.message || 'Gagal menyegarkan daftar tontonan');
    }
  }
);

// Initial state untuk watchlist slice
const initialState = {
  watchlist: [],
  loading: false,
  error: null,
};

// Membuat slice untuk watchlist
const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handlers untuk fetchWatchlist
      .addCase(fetchWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(fetchWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk addToWatchlist
      .addCase(addToWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist.push(action.payload);
      })
      .addCase(addToWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk updateWatchlistItem
      .addCase(updateWatchlistItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateWatchlistItem.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.watchlist.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.watchlist[index] = action.payload;
        }
      })
      .addCase(updateWatchlistItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk removeFromWatchlist
      .addCase(removeFromWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeFromWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = state.watchlist.filter(item => item.id !== action.payload);
      })
      .addCase(removeFromWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Handlers untuk refreshWatchlist
      .addCase(refreshWatchlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshWatchlist.fulfilled, (state, action) => {
        state.loading = false;
        state.watchlist = action.payload;
      })
      .addCase(refreshWatchlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = watchlistSlice.actions;

export default watchlistSlice.reducer;