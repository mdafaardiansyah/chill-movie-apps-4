import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, AuthContext } from '../../contexts/AuthContext';
import apiClient from '../../services/api/index';

// Mock untuk apiClient
jest.mock('../../services/api/index');

// Setup mock implementation before each test
beforeEach(() => {
  apiClient.get = jest.fn();
  apiClient.post = jest.fn();
  jest.clearAllMocks();
  localStorage.clear();
  jest.spyOn(window.localStorage, 'setItem');
  jest.spyOn(window.localStorage, 'removeItem');
  // Override localStorage dengan mock baru setiap test
  Object.defineProperty(window, 'localStorage', {
    value: {
      getItem: jest.fn(),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    configurable: true
  });
});

// Komponen test untuk mengakses context
const TestComponent = () => {
  const auth = React.useContext(AuthContext);
  return (
    <div>
      <div data-testid="user-status">
        {auth.currentUser ? 'Logged In' : 'Not Logged In'}
      </div>
      <div data-testid="user-name">
        {auth.currentUser?.name || 'No User'}
      </div>
      <button 
        data-testid="login-button" 
        onClick={() => auth.login({ email: 'test@example.com', password: 'password' })}
      >
        Login
      </button>
      <button 
        data-testid="logout-button" 
        onClick={() => auth.logout()}
      >
        Logout
      </button>
      <button 
        data-testid="register-button" 
        onClick={() => auth.register({ name: 'Test User', email: 'test@example.com', password: 'password' })}
      >
        Register
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  test('harus menyediakan nilai default', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('user-status')).toHaveTextContent('Not Logged In');
    expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
  });

  test('login harus mengatur currentUser', async () => {
    // Arrange
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    const mockResponse = { data: { user: mockUser, token: 'test-token' } };
    apiClient.post.mockResolvedValueOnce(mockResponse);

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Klik tombol login
    const user = userEvent.setup();
    await user.click(screen.getByTestId('login-button'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged In');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    expect(apiClient.post).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });

  test('logout harus menghapus currentUser', async () => {
    // Arrange - set user terlebih dahulu
    const mockUser = { id: 1, name: 'Test User' };
    const mockLoginResponse = { data: { user: mockUser, token: 'test-token' } };
    apiClient.post.mockResolvedValueOnce(mockLoginResponse);
    apiClient.post.mockResolvedValueOnce({}); // Mock untuk logout API call

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login terlebih dahulu
    const user = userEvent.setup();
    await user.click(screen.getByTestId('login-button'));

    // Pastikan user sudah login
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged In');
    });

    // Logout
    await user.click(screen.getByTestId('logout-button'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Not Logged In');
      expect(screen.getByTestId('user-name')).toHaveTextContent('No User');
    });

    expect(apiClient.post).toHaveBeenCalled();
    expect(localStorage.removeItem).toHaveBeenCalled();
  });

  test('register harus mengatur currentUser jika token disediakan', async () => {
    // Arrange
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    const mockResponse = { data: { user: mockUser, token: 'test-token' } };
    apiClient.post.mockResolvedValueOnce(mockResponse);

    // Act
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Klik tombol register
    const user = userEvent.setup();
    await user.click(screen.getByTestId('register-button'));

    // Assert
    await waitFor(() => {
      expect(screen.getByTestId('user-status')).toHaveTextContent('Logged In');
      expect(screen.getByTestId('user-name')).toHaveTextContent('Test User');
    });

    expect(apiClient.post).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalled();
  });
});