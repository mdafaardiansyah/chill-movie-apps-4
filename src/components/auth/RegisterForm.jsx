import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateUsername, validatePassword, validateEmail } from '../../utils/validation';

// Import assets
import logoImage from '../../assets/images/logo/Logo.png';
import googleIcon from '../../assets/images/icons/google.png';
import { registerBackground } from '../../styles/auth-backgrounds';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const usernameError = validateUsername(username);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (usernameError) newErrors.username = usernameError;
    if (emailError) newErrors.email = emailError;
    if (passwordError) newErrors.password = passwordError;
    if (password !== confirmPassword) newErrors.confirmPassword = 'Kata sandi tidak cocok';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Implementasi register akan ditambahkan di sini
      // Untuk saat ini hanya melakukan navigasi ke halaman login
      window.location.href = '/';
    }
  };

  return (
    <div className="auth-container register-container" style={{ backgroundImage: `url(${registerBackground})` }}>
      <div className="auth-card">
        {/* Logo */}
        <div className="logo-container">
          <img src={logoImage} alt="Chill Logo" className="logo" />
        </div>

        {/* Form Header */}
        <h1 className="auth-title">Daftar</h1>
        <p className="auth-subtitle">Selamat datang!</p>

        {/* Registration Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              placeholder="Masukkan username" 
              required 
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errors.username) {
                  setErrors(prev => ({ ...prev, username: '' }));
                }
              }}
              maxLength={20}
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Masukkan email" 
              required 
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) {
                  setErrors(prev => ({ ...prev, email: '' }));
                }
              }}
              maxLength={20}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Kata Sandi</label>
            <div className="password-input-container">
              <input 
                type="password" 
                id="password" 
                placeholder="Masukkan kata sandi" 
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) {
                    setErrors(prev => ({ ...prev, password: '' }));
                  }
                }}
                maxLength={18}
              />
            </div>
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirm-password">Konfirmasi Kata Sandi</label>
            <div className="password-input-container">
              <input 
                type="password" 
                id="confirm-password" 
                placeholder="Masukkan kata sandi" 
                required
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (errors.confirmPassword) {
                    setErrors(prev => ({ ...prev, confirmPassword: '' }));
                  }
                }}
                maxLength={18}
              />
            </div>
            {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
          </div>

          {/* Links */}
          <div className="auth-links">
            <div className="login-link">
              Sudah punya akun? <Link to="/">Masuk</Link>
            </div>
          </div>

          {/* Register Button */}
          <button type="submit" className="btn-primary">Daftar</button>

          {/* Or Divider */}
          <div className="divider">
            <span>Atau</span>
          </div>

          {/* Google Sign In */}
          <button type="button" className="btn-google">
            <img src={googleIcon} alt="Google" className="google-icon" />
            Daftar dengan Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;