// Validasi untuk username
export const validateUsername = (username) => {
  if (!username) return 'Username tidak boleh kosong';
  if (username.length > 20) return 'Username maksimal 20 karakter';
  if (!/^[a-zA-Z0-9_]+$/.test(username)) return 'Username hanya boleh mengandung huruf, angka, dan underscore';
  return '';
};

// Validasi untuk password
export const validatePassword = (password) => {
  if (!password) return 'Password tidak boleh kosong';
  if (password.length < 8) return 'Password minimal 8 karakter';
  if (password.length > 18) return 'Password maksimal 18 karakter';
  if (!/[A-Z]/.test(password)) return 'Password harus mengandung minimal 1 huruf besar';
  if (!/[a-z]/.test(password)) return 'Password harus mengandung minimal 1 huruf kecil';
  if (!/[0-9]/.test(password)) return 'Password harus mengandung minimal 1 angka';
  if (!/[!@#$%^&*]/.test(password)) return 'Password harus mengandung minimal 1 karakter khusus (!@#$%^&*)';
  return '';
};

// Validasi untuk email
export const validateEmail = (email) => {
  if (!email) return 'Email tidak boleh kosong';
  if (email.length > 20) return 'Email maksimal 20 karakter';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Format email tidak valid';
  return '';
}; 