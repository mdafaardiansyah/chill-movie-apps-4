import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import MovieCarousel from '../components/home/MovieCarousel';

// Import custom hooks untuk Redux
import { useMoviesRedux } from '../hooks/useRedux';


const Home = () => {
  // Menggunakan custom hook Redux untuk mengambil data film
  const { 
    movies: watchingMovies, 
    trendingMovies, 
    topRatedMovies: topRatingMovies, 
    loading, 
    error: reduxError,
    getAllMovies,
    getTrendingMovies,
    getTopRatedMovies
  } = useMoviesRedux();
  
  // State untuk menampilkan pesan loading atau error
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Memuat data film saat komponen dimount
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([
          getAllMovies(),
          getTopRatedMovies(),
          getTrendingMovies()
        ]);
      } catch (err) {
        console.error('Error loading movies:', err);
      }
    };
    
    loadData();
  }, [getAllMovies, getTopRatedMovies, getTrendingMovies]);
  
  // Memperbarui state loading dan error berdasarkan status Redux
  useEffect(() => {
    setIsLoading(loading);
    setError(reduxError);
  }, [loading, reduxError]);

  // Fungsi untuk mencoba memuat ulang data
  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    
    // Memanggil action Redux untuk memuat ulang data
    Promise.all([
      getAllMovies(),
      getTopRatedMovies(),
      getTrendingMovies()
    ]).catch(err => {
      console.error('Error retrying data fetch:', err);
    });
  };

  return (
    <div className="home-page">
      <Header />
      <main className="main-content">
        <Hero />
        {isLoading ? (
          <div className="loading-container" style={{ textAlign: 'center', padding: '50px 0' }}>
            <p>Memuat data film...</p>
            <div className="loading-spinner" style={{ margin: '20px auto', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <style>{`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        ) : error ? (
          <div className="error-container" style={{ textAlign: 'center', padding: '50px 0', color: '#e74c3c' }}>
            <p style={{ fontSize: '18px', marginBottom: '15px' }}>Terjadi kesalahan saat memuat data:</p>
            <p style={{ marginBottom: '20px', backgroundColor: '#f8d7da', padding: '10px', borderRadius: '5px', display: 'inline-block' }}>{error}</p>
            <button 
              onClick={handleRetry}
              style={{ 
                padding: '10px 20px', 
                backgroundColor: '#3498db', 
                color: 'white', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <>
            <MovieCarousel 
              title="Melanjutkan Tonton Film" 
              type="landscape" 
              movies={watchingMovies || []} 
            />

            <MovieCarousel 
              title="Top Rating Film dan Series Hari ini" 
              type="portrait" 
              movies={topRatingMovies || []} 
            />
            <MovieCarousel 
              title="Film Trending" 
              type="portrait" 
              movies={trendingMovies || []} 
            />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;