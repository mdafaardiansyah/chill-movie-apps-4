# Panduan Pengujian Aplikasi Chill Movie

## 1. Pendahuluan

Dokumen ini menyediakan panduan komprehensif untuk menjalankan dan mengembangkan *unit test* pada aplikasi Chill Movie. Pengujian dilakukan menggunakan Jest sebagai *test runner* dan React Testing Library untuk menguji komponen React. Tujuan utama dari pengujian ini adalah untuk memastikan kualitas, stabilitas, dan fungsionalitas aplikasi.

## 2. Struktur Direktori Pengujian

Semua berkas pengujian diorganisir dalam struktur direktori berikut untuk kemudahan navigasi dan pengelolaan:

```plaintext
src/
├── __tests__/           # Direktori utama untuk semua berkas pengujian
│   ├── components/      # Pengujian untuk komponen-komponen React
│   ├── contexts/        # Pengujian untuk React Contexts
│   ├── hooks/           # Pengujian untuk custom hooks
│   ├── services/        # Pengujian untuk layanan (misalnya, interaksi API)
│   └── README.md        # Dokumentasi spesifik terkait direktori pengujian (jika ada)
├── __mocks__/           # Direktori untuk mock modul atau berkas non-JavaScript
└── setupTests.js        # Berkas konfigurasi global untuk lingkungan pengujian Jest
```

## 3. Menjalankan Pengujian

Untuk menjalankan *unit test*, gunakan perintah-perintah berikut pada terminal Anda:

- **Menjalankan Semua Test Sekaligus:**
  ```bash
  npm test
  ```

- **Menjalankan Test dalam Mode *Watch*:**
  Mode ini akan secara otomatis menjalankan ulang test setiap kali ada perubahan pada berkas kode.
  ```bash
  npm run test:watch
  ```

- **Menjalankan Test dengan Laporan *Coverage*:**
  Perintah ini akan menghasilkan laporan yang menunjukkan seberapa banyak kode Anda yang dicakup oleh test.
  ```bash
  npm run test:coverage
  ```

## 4. Fitur yang Telah Diuji

Berikut adalah daftar fitur atau modul yang saat ini telah memiliki cakupan *unit test*:

- **Custom Hooks:**
  - `useApi`: Hook untuk mengelola pemanggilan API, termasuk logika *retry* dan *caching*.
  - `useCrud` (jika ada, contoh dari dokumen asli): Hook yang menyediakan fungsionalitas CRUD (Create, Read, Update, Delete).
- **Services:**
  - `movieService`: Layanan yang bertanggung jawab untuk mengambil dan mengelola data film.
  - `apiClient`: Klien API generik yang mungkin dilengkapi dengan fitur seperti *caching* dan *interceptors*.
- **Contexts:**
  - `AuthContext`: Context yang mengelola status dan logika autentikasi pengguna.
- **Components:**
  - `MovieDetail`: Komponen yang bertugas menampilkan informasi detail sebuah film.

*(Catatan: Daftar ini mungkin perlu diperbarui sesuai dengan implementasi aktual proyek.)*

## 5. Menambahkan Pengujian Baru

Berikut adalah panduan untuk menambahkan pengujian baru untuk berbagai jenis modul dalam aplikasi.

### 5.1. Pengujian untuk Komponen React

1.  **Lokasi Berkas:** Buat berkas pengujian dengan format `[NamaKomponen].test.jsx` atau `[NamaKomponen].spec.jsx` di dalam direktori `src/__tests__/components/`.
2.  **Contoh Implementasi:**

    ```javascript
    import React from 'react';
    import { render, screen } from '@testing-library/react';
    import '@testing-library/jest-dom'; // Untuk matcher tambahan seperti .toBeInTheDocument()
    import MovieCard from '../../components/movie/MovieCard'; // Sesuaikan path jika perlu

    describe('Komponen MovieCard', () => {
      const mockMovie = {
        title: 'Film Pengujian',
        posterUrl: 'url/ke/poster.jpg',
        // tambahkan properti lain yang dibutuhkan oleh MovieCard
      };

      test('harus menampilkan judul film dengan benar', () => {
        render(<MovieCard movie={mockMovie} />); // Asumsi MovieCard menerima prop 'movie'
        expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
      });

      // Tambahkan test case lain sesuai kebutuhan
      // Misalnya: test('harus menampilkan gambar poster', () => { ... });
    });
    ```

### 5.2. Pengujian untuk Custom Hooks

1.  **Lokasi Berkas:** Buat berkas pengujian dengan format `[namaHook].test.js` atau `[namaHook].spec.js` di dalam direktori `src/__tests__/hooks/`.
2.  **Contoh Implementasi:**

    ```javascript
    import { renderHook, act } from '@testing-library/react';
    import { useCounter } from '../../hooks/useCounter'; // Sesuaikan path jika perlu

    describe('Hook useCounter', () => {
      test('harus menginisialisasi counter dengan nilai awal 0', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
      });

      test('harus menambah nilai counter ketika increment dipanggil', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
          result.current.increment();
        });
        expect(result.current.count).toBe(1);
      });

      test('harus mengurangi nilai counter ketika decrement dipanggil', () => {
        const { result } = renderHook(() => useCounter());
        act(() => {
          result.current.increment(); // Jadi 1
          result.current.decrement(); // Jadi 0
        });
        expect(result.current.count).toBe(0);
      });

      // Tambahkan test case lain untuk fungsionalitas hook lainnya
    });
    ```

### 5.3. Pengujian untuk Services (Layanan)

1.  **Lokasi Berkas:** Buat berkas pengujian dengan format `[namaService].test.js` atau `[namaService].spec.js` di dalam direktori `src/__tests__/services/`.
2.  **Contoh Implementasi (dengan Mocking):**

    ```javascript
    // Diasumsikan Anda memiliki apiClient yang digunakan oleh service
    // src/services/api/index.js atau serupa
    import apiClient from '../../services/api/index'; // Sesuaikan path
    import { userService } from '../../services/api/userService'; // Sesuaikan path

    // Mock apiClient untuk mengisolasi pengujian service dari panggilan jaringan aktual
    jest.mock('../../services/api/index');

    describe('Layanan Pengguna (UserService)', () => {
      afterEach(() => {
        // Bersihkan semua mock setelah setiap test
        jest.clearAllMocks();
      });

      test('harus berhasil mengambil data pengguna berdasarkan ID', async () => {
        const mockUserData = { id: 1, name: 'Pengguna Uji Coba', email: 'test@example.com' };
        // Konfigurasi mockResolvedValue untuk simulasi respons sukses dari apiClient.get
        apiClient.get.mockResolvedValue({ data: mockUserData });

        const userId = 1;
        const result = await userService.getUser(userId);

        // Verifikasi bahwa apiClient.get dipanggil dengan URL yang benar
        expect(apiClient.get).toHaveBeenCalledWith(`/users/${userId}`); // Sesuaikan endpoint jika berbeda
        // Verifikasi bahwa hasil yang dikembalikan sesuai dengan data mock
        expect(result).toEqual(mockUserData);
      });

      test('harus menangani error ketika pengambilan data pengguna gagal', async () => {
        const errorMessage = 'Gagal mengambil data pengguna';
        // Konfigurasi mockRejectedValue untuk simulasi respons error
        apiClient.get.mockRejectedValue(new Error(errorMessage));

        const userId = 2;
        // Gunakan try-catch atau .rejects untuk menangani promise yang ditolak
        await expect(userService.getUser(userId)).rejects.toThrow(errorMessage);

        expect(apiClient.get).toHaveBeenCalledWith(`/users/${userId}`);
      });

      // Tambahkan test case lain untuk metode service lainnya (createUser, updateUser, dll.)
    });
    ```

## 6. Praktik Terbaik (Best Practices) dalam Pengujian

Untuk memastikan pengujian yang efektif, mudah dipelihara, dan andal, ikuti praktik terbaik berikut:

1.  **Isolasi dengan Mocking:**
    *   Gunakan `jest.mock()` untuk membuat *mock* dari modul eksternal atau dependensi (misalnya, panggilan API, *local storage*).
    *   Ini memastikan bahwa *unit test* fokus pada unit kode yang sedang diuji dan tidak terpengaruh oleh perilaku dependensi.

2.  **Uji Perilaku (Behavior), Bukan Detail Implementasi:**
    *   Fokus pada pengujian apa yang dilihat dan dapat dilakukan oleh pengguna, atau apa hasil yang diharapkan dari sebuah fungsi/modul.
    *   Hindari pengujian yang terlalu terikat pada struktur internal atau metode privat komponen/modul, karena ini membuat test menjadi rapuh terhadap refaktorisasi.

3.  **Gunakan Atribut `data-testid` untuk Seleksi Elemen:**
    *   Tambahkan atribut `data-testid="nama-unik"` pada elemen-elemen penting di komponen React Anda.
    *   Gunakan `screen.getByTestId('nama-unik')` untuk memilih elemen tersebut dalam pengujian. Ini lebih tahan terhadap perubahan struktur DOM atau kelas CSS dibandingkan selektor lain.
    *   Contoh: `<button data-testid="tombol-kirim">Kirim</button>`

4.  **Tulis Pengujian yang Jelas dan Deskriptif:**
    *   Gunakan nama *test case* (`test('...')` atau `it('...')`) yang dengan jelas menggambarkan perilaku atau skenario yang sedang diuji.
    *   Strukturkan setiap *test case* menggunakan pola **Arrange-Act-Assert (AAA)**:
        *   **Arrange:** Siapkan semua kondisi awal, data *mock*, dan konfigurasi yang diperlukan.
        *   **Act:** Jalankan fungsi atau interaksi yang ingin diuji.
        *   **Assert:** Verifikasi bahwa hasilnya sesuai dengan yang diharapkan.

5.  **Jaga Test Tetap Cepat dan Independen:**
    *   Setiap *test case* harus dapat dijalankan secara independen tanpa bergantung pada hasil dari *test case* lain.
    *   Hindari operasi yang lambat (seperti panggilan jaringan aktual) dalam *unit test*.

6.  **Perbarui Test Bersamaan dengan Kode:**
    *   Ketika Anda memodifikasi atau menambahkan fungsionalitas baru, pastikan untuk memperbarui atau menambahkan *unit test* yang relevan.

## 7. Pemecahan Masalah (Troubleshooting)

Berikut adalah beberapa masalah umum yang mungkin dihadapi dan solusinya:

### 7.1. Error Terkait Modul ESM (ECMAScript Modules)

-   **Masalah:** Jest secara default mungkin mengalami kesulitan dengan modul ESM.
-   **Solusi:** Pastikan konfigurasi Jest Anda (biasanya di `jest.config.cjs` atau `package.json`) sudah benar untuk menangani ESM. Seringkali ini melibatkan penggunaan `babel-jest` atau konfigurasi `transform` yang sesuai. Flag `--experimental-vm-modules` yang disebutkan dalam dokumen asli mungkin diperlukan tergantung pada versi Node.js dan Jest Anda.
    ```json
    // Contoh dalam package.json (jika menggunakan script)
    "scripts": {
      "test": "node --experimental-vm-modules node_modules/jest/bin/jest.js"
    }
    ```
    Periksa konfigurasi `babel.config.cjs` Anda untuk memastikan transformasi yang benar.

### 7.2. Mock untuk Berkas Non-JavaScript (CSS, SVG, Gambar)

-   **Masalah:** Jest tidak dapat memproses berkas non-JavaScript secara langsung.
-   **Solusi:** Konfigurasikan `moduleNameMapper` dalam `jest.config.cjs` untuk menyediakan *mock* untuk jenis berkas ini. Biasanya, sebuah berkas *mock* sederhana (seperti `svgMock.js` atau `fileMock.js` di direktori `src/__mocks__/`) digunakan.

    ```javascript
    // Contoh dalam jest.config.cjs
    module.exports = {
      // ... konfigurasi lainnya
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Untuk CSS Modules
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js' // Sesuaikan path ke mock Anda
      }
    };
    ```

### 7.3. Error "Cannot find module"

-   **Masalah:** Jest tidak dapat menemukan modul yang diimpor.
-   **Solusi:**
    1.  **Periksa Path Impor:** Pastikan path ke modul sudah benar dan sesuai dengan struktur direktori Anda.
    2.  **Instalasi Modul:** Jika modul tersebut adalah dependensi eksternal, pastikan sudah terinstal melalui `npm install [nama-modul]` atau `yarn add [nama-modul]` dan tercantum dalam `package.json`.
    3.  **Konfigurasi `moduleDirectories` atau `paths` (jika menggunakan alias):** Jika Anda menggunakan alias impor (misalnya, `@/components`), pastikan Jest dikonfigurasi untuk mengenali alias tersebut melalui `moduleDirectories` atau `moduleNameMapper`.

Dengan mengikuti panduan ini, Anda diharapkan dapat menulis dan memelihara *unit test* yang efektif untuk aplikasi Chill Movie Apps.