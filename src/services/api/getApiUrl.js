// Fungsi untuk mendapatkan API URL yang aman untuk test
export const getApiUrl = () => {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'test') {
    return process.env.VITE_API_URL || 'https://api.example.com';
  }
  return 'https://api.example.com';
}; 