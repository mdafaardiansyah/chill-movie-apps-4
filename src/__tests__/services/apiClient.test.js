import apiClient from '../../services/api/index';

// Mock untuk axios
jest.mock('axios', () => {
  const mockAxiosInstance = {
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() }
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  };
  // Pastikan bisa di-extend
  Object.setPrototypeOf(mockAxiosInstance, Object.prototype);
  return {
    create: jest.fn(() => mockAxiosInstance),
    __esModule: true,
    default: {
      create: jest.fn(() => mockAxiosInstance)
    }
  };
});

// Mock untuk localStorage
const localStorageMock = {
  getItem: jest.fn(() => 'mock-token'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('API Client', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('invalidateCache harus menghapus cache berdasarkan kunci', () => {
    // Setup spy untuk Map.delete
    const mapDeleteSpy = jest.spyOn(Map.prototype, 'delete');
    
    // Act
    apiClient.invalidateCache('test-key');
    
    // Assert
    expect(mapDeleteSpy).toHaveBeenCalledWith('test-key');
    
    // Cleanup
    mapDeleteSpy.mockRestore();
  });

  test('invalidateCache tanpa kunci harus menghapus semua cache', () => {
    // Setup spy untuk Map.clear
    const mapClearSpy = jest.spyOn(Map.prototype, 'clear');
    
    // Act
    apiClient.invalidateCache();
    
    // Assert
    expect(mapClearSpy).toHaveBeenCalled();
    
    // Cleanup
    mapClearSpy.mockRestore();
  });
});