# Dokumentasi Testing Chill Movie Apps

## Struktur Testing

Proyek ini menggunakan Jest dan React Testing Library untuk melakukan unit testing. Struktur folder testing diorganisir sebagai berikut:

```
src/
├── __tests__/           # Folder utama untuk semua test
│   ├── components/      # Test untuk komponen React
│   ├── contexts/        # Test untuk React contexts
│   ├── hooks/           # Test untuk custom hooks
│   ├── services/        # Test untuk service API
│   └── README.md        # Dokumentasi testing
├── __mocks__/           # Mock untuk file non-JavaScript
└── setupTests.js        # Konfigurasi global untuk testing
```

## Menjalankan Test

Untuk menjalankan test, gunakan perintah berikut:

```bash
# Menjalankan semua test
npm test

# Menjalankan test dalam mode watch (akan menjalankan ulang test saat ada perubahan)
npm run test:watch

# Menjalankan test dengan coverage report
npm run test:coverage
```

## Best Practices

### 1. Struktur Test

Setiap file test mengikuti pola AAA (Arrange-Act-Assert):

```javascript
test('deskripsi test', () => {
  // Arrange - siapkan data dan kondisi awal
  const mockData = {...};
  
  // Act - lakukan aksi yang ingin ditest
  render(<Component {...mockData} />);
  
  // Assert - verifikasi hasil yang diharapkan
  expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### 2. Mocking

Gunakan mock untuk mengisolasi unit yang ditest:

```javascript
// Mock untuk module
jest.mock('../../path/to/module', () => ({
  functionName: jest.fn(),
}));

// Mock untuk hook
useSomeHook.mockReturnValue({
  data: mockData,
  loading: false,
});
```

### 3. Testing Hooks

Gunakan `renderHook` dari React Testing Library untuk menguji custom hooks:

```javascript
const { result } = renderHook(() => useCustomHook());
expect(result.current.value).toBe(expectedValue);
```

### 4. Testing Asynchronous Code

Gunakan `async/await` dan `waitFor` untuk kode asynchronous:

```javascript
test('async test', async () => {
  // Setup
  mockApiFunction.mockResolvedValue({ data: 'value' });
  
  // Act
  render(<AsyncComponent />);
  
  // Assert - tunggu elemen muncul
  await waitFor(() => {
    expect(screen.getByText('Loaded Data')).toBeInTheDocument();
  });
});
```

## Coverage

Laporan coverage akan menunjukkan seberapa banyak kode yang sudah ditest. Target coverage yang baik adalah:

- Statements: > 80%
- Branches: > 80%
- Functions: > 80%
- Lines: > 80%

## Troubleshooting

### Error ESM Modules

Jika mengalami error terkait ESM modules, pastikan menggunakan flag `--experimental-vm-modules` saat menjalankan Jest (sudah dikonfigurasi dalam package.json).

### Mock untuk File Non-JavaScript

Untuk file seperti CSS, SVG, dll, mock sudah dikonfigurasi dalam `jest.config.js` dan folder `__mocks__`.