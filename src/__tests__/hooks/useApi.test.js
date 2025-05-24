import { renderHook, act, waitFor } from '@testing-library/react';
import { useApi, useCrud } from '../../hooks/useApi';
import apiClient from '../../services/api/index';

// Mock untuk apiClient
jest.mock('../../services/api/index', () => ({
  invalidateCache: jest.fn(),
  __esModule: true,
  default: {
    invalidateCache: jest.fn(),
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn()
  }
}));

describe('useApi Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('harus mengembalikan data ketika API call berhasil', async () => {
    // Arrange
    const mockData = { id: 1, title: 'Test Movie' };
    const mockApiFunction = jest.fn().mockResolvedValue(mockData);
    mockApiFunction.getCacheKey = jest.fn().mockReturnValue('test-cache-key');

    // Act
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    // Assert initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe(null);
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Assert final state
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
    expect(mockApiFunction).toHaveBeenCalledTimes(1);
  });

  test('harus menangani error ketika API call gagal', async () => {
    // Arrange
    const mockError = new Error('API Error');
    const mockApiFunction = jest.fn().mockRejectedValue(mockError);
    
    // Act
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    // Wait for the API call to reject
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Assert
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error).toBe('API Error');
  });

  test('harus mencoba ulang ketika terjadi rate limit error', async () => {
    // Arrange
    const rateLimitError = new Error('rate limit exceeded');
    rateLimitError.response = { status: 429 };
    const mockApiFunction = jest.fn()
      .mockRejectedValueOnce(rateLimitError)
      .mockResolvedValueOnce({ id: 1, title: 'Test Movie' });
    
    // Act
    const { result } = renderHook(() => 
      useApi(mockApiFunction, { retryDelay: 10 }) // Gunakan delay pendek untuk testing
    );
    
    // Wait for all updates
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toEqual({ id: 1, title: 'Test Movie' });
    }, { timeout: 3000 });
    
    // Assert
    expect(mockApiFunction).toHaveBeenCalledTimes(2);
    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual({ id: 1, title: 'Test Movie' });
    expect(result.current.error).toBe(null);
  });

  test('refresh harus memaksa mengambil data baru', async () => {
    // Arrange
    const mockData1 = { id: 1, title: 'Test Movie 1' };
    const mockData2 = { id: 1, title: 'Test Movie 2' };
    const mockApiFunction = jest.fn()
      .mockResolvedValueOnce(mockData1)
      .mockResolvedValueOnce(mockData2);
    mockApiFunction.getCacheKey = jest.fn().mockReturnValue('test-cache-key');
    
    // Act - initial render
    const { result } = renderHook(() => useApi(mockApiFunction));
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Assert initial data
    expect(result.current.data).toEqual(mockData1);
    
    // Act - refresh
    await act(async () => {
      await result.current.refresh();
    });
    
    // Wait for refresh to complete
    await waitFor(() => {
      expect(result.current.data).toEqual(mockData2);
    });
    
    // Assert refreshed data
    expect(result.current.data).toEqual(mockData2);
    expect(mockApiFunction).toHaveBeenCalledTimes(2);
    expect(apiClient.invalidateCache).toHaveBeenCalledWith('test-cache-key');
  });
});

describe('useCrud Hook', () => {
  const mockServices = {
    getAll: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('harus memuat data saat inisialisasi', async () => {
    // Arrange
    const mockItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    mockServices.getAll.mockResolvedValue(mockItems);
    
    // Act
    const { result } = renderHook(() => useCrud(mockServices));
    
    // Assert initial state
    expect(result.current.loading).toBe(true);
    expect(result.current.items).toEqual([]);
    
    // Wait for the API call to resolve
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Assert final state
    expect(result.current.loading).toBe(false);
    expect(result.current.items).toEqual(mockItems);
    expect(mockServices.getAll).toHaveBeenCalledTimes(1);
  });

  test('addItem harus menambahkan item baru', async () => {
    // Arrange
    const initialItems = [{ id: 1, name: 'Item 1' }];
    const newItem = { id: 2, name: 'Item 2' };
    mockServices.getAll.mockResolvedValue(initialItems);
    mockServices.add.mockResolvedValue(newItem);
    
    // Act - initial render
    const { result } = renderHook(() => useCrud(mockServices));
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Act - add item
    await act(async () => {
      await result.current.addItem({ name: 'Item 2' });
    });
    
    // Assert
    expect(result.current.items).toEqual([...initialItems, newItem]);
    expect(mockServices.add).toHaveBeenCalledWith({ name: 'Item 2' });
  });

  test('updateItem harus memperbarui item yang ada', async () => {
    // Arrange
    const initialItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const updatedItem = { id: 1, name: 'Updated Item 1' };
    mockServices.getAll.mockResolvedValue(initialItems);
    mockServices.update.mockResolvedValue(updatedItem);
    
    // Act - initial render
    const { result } = renderHook(() => useCrud(mockServices));
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Act - update item
    await act(async () => {
      await result.current.updateItem(1, { name: 'Updated Item 1' });
    });
    
    // Assert
    expect(result.current.items).toEqual([updatedItem, initialItems[1]]);
    expect(mockServices.update).toHaveBeenCalledWith(1, { name: 'Updated Item 1' });
  });

  test('deleteItem harus menghapus item', async () => {
    // Arrange
    const initialItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    mockServices.getAll.mockResolvedValue(initialItems);
    mockServices.delete.mockResolvedValue({});
    
    // Act - initial render
    const { result } = renderHook(() => useCrud(mockServices));
    
    // Wait for initial data to load
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    
    // Act - delete item
    await act(async () => {
      await result.current.deleteItem(1);
    });
    
    // Assert
    expect(result.current.items).toEqual([initialItems[1]]);
    expect(mockServices.delete).toHaveBeenCalledWith(1);
  });
});