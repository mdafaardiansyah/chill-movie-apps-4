# Chill Movie Apps - V4.0.0

![Chill Movie Apps Logo](/src/assets/images/logo/LogoWithBG.png)

## Deskripsi

Chill Movie Apps adalah aplikasi streaming film berbasis web yang memungkinkan pengguna untuk menjelajahi dan menonton berbagai film dan acara TV. Aplikasi ini dibangun menggunakan React dan Vite untuk memberikan pengalaman pengguna yang cepat dan responsif.

## Fitur Utama

### Autentikasi & Manajemen Pengguna
- **Sistem Autentikasi**: Login, register, dan manajemen sesi pengguna
- **Context API**: Menggunakan React Context untuk manajemen state autentikasi
- **Token-based Auth**: Implementasi JWT untuk keamanan
- **Profil Pengguna**: Manajemen profil dan preferensi pengguna

### Manajemen State
- **Redux Toolkit**: State management terpusat untuk data film dan pengguna
- **Redux Persist**: Penyimpanan state di localStorage
- **Redux Thunk**: Penanganan async actions
- **Slice Pattern**: Organisasi state yang modular dan mudah dikelola

### Fitur Film
- **Carousel Film**: Tampilan film yang interaktif dan menarik
- **Format Poster Ganda**: Mendukung tampilan poster dalam format landscape dan portrait
- **Dropdown Genre**: Navigasi genre film yang mudah diakses
- **Berbagi Film**: Fitur untuk berbagi film favorit dengan teman
- **Rating & Review**: Sistem rating dan review film
- **Rekomendasi Film**: Rekomendasi film berdasarkan preferensi pengguna

### Manajemen Konten
- **Favorit**: Sistem manajemen film favorit
- **Watchlist**: Daftar film yang ingin ditonton
- **Admin Panel**: Panel admin untuk manajemen konten film
- **CRUD Operations**: Operasi lengkap untuk manajemen film

### UI/UX
- **Responsif**: Tampilan optimal di berbagai perangkat
- **Dark/Light Mode**: Tema yang dapat disesuaikan
- **Loading States**: Indikator loading yang informatif
- **Error Handling**: Penanganan error yang user-friendly
- **Animasi**: Transisi dan animasi yang smooth

### Integrasi & API
- **RESTful API**: Integrasi dengan backend API
- **Axios**: HTTP client untuk request API
- **API Caching**: Optimasi performa dengan caching
- **Error Boundaries**: Penanganan error di level komponen

## Teknologi yang Digunakan

### Frontend
- **Framework**: React 19
- **State Management**: Redux Toolkit, React Context
- **Routing**: React Router DOM 7.5
- **Build Tool**: Vite 6.2
- **Linting**: ESLint 9.21
- **Testing**: Jest, React Testing Library
- **API Integration**: Axios
- **Styling**: CSS Modules

### State Management
- **Redux Toolkit**: State management terpusat
- **Redux Persist**: Persistensi state
- **Redux Thunk**: Async actions
- **React Context**: State management untuk autentikasi

### DevOps & Deployment
- **Containerization**: Docker
- **CI/CD**: Jenkins dengan integrasi ENVIRONMENT VARIABLES
- **Orchestration**: Docker Compose
- **Web Server**: Nginx
- **Notifikasi**: Discord Webhook
- **Monitoring**: Error tracking dan logging

## Struktur Proyek

```
├── deployments/         # Konfigurasi deployment
├── src/
│   ├── components/      # Komponen React
│   ├── pages/          # Halaman aplikasi
│   ├── services/       # Layanan API
│   ├── contexts/       # React Context
│   ├── store/          # Redux store
│   │   ├── redux/      # Redux configuration
│   │   └── slices/     # Redux slices
│   ├── hooks/          # Custom hooks
│   ├── utils/          # Utility functions
│   ├── styles/         # Styling
│   └── assets/         # Static assets
├── tests/              # Test files
└── public/             # Public assets
```

## Cara Instalasi

### Pengembangan Lokal

1. Clone repositori
   ```bash
   git clone https://github.com/mdafaardiansyah/chill-movie-apps-4.git
   cd chill-movie-apps
   ```

2. Install dependensi
   ```bash
   npm install
   ```

3. Konfigurasi environment
   ```bash
   cp .env.example .env
   # Edit .env sesuai kebutuhan
   ```

4. Jalankan development server
   ```bash
   npm run dev
   ```

### Docker Deployment

1. Build image
   ```bash
   docker build -t chill-movie-apps .
   ```

2. Jalankan container
   ```bash
   docker run -p 3004:80 chill-movie-apps
   ```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## Deployment

Aplikasi dapat diakses di:
- Production: [https://hsba2b-chill.glanze.site](https://hsba2b-chill.glanze.site)

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Dibuat dengan ❤️ dari Dapuk
