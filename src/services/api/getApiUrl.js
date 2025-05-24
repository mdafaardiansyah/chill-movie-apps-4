// Fungsi untuk mendapatkan API URL yang aman untuk test
export const getApiUrl = () => {
  if (import.meta.env.MODE === 'test') {
    return import.meta.env.VITE_API_URL || 'https://api.example.com';
  }
  return 'https://api.example.com';
}; 