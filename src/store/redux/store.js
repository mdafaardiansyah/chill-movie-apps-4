import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './moviesSlice';
import favoritesReducer from './favoritesSlice';
import watchlistReducer from './watchlistSlice';

// Konfigurasi Redux store dengan Redux Toolkit
const store = configureStore({
  reducer: {
    movies: moviesReducer,
    favorites: favoritesReducer,
    watchlist: watchlistReducer,
  },
  // Middleware tambahan bisa ditambahkan di sini jika diperlukan
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Untuk menangani nilai non-serializable
    }),
  devTools: import.meta.env.MODE !== 'production', // Aktifkan Redux DevTools di development
});

export default store;