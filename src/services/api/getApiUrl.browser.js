// Fungsi untuk mendapatkan API URL khusus untuk browser
export const getApiUrl = () => {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.VITE_API_URL || 'https://api.example.com';
  }
  return 'https://api.example.com';
}; 