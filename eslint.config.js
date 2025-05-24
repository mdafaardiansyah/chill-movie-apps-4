import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginJest from 'eslint-plugin-jest';

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] }, // Menambahkan node_modules dan coverage ke ignores
  {
    files: ['**/*.{js,jsx}'],
    linterOptions: {
      reportUnusedDisableDirectives: true, // Melaporkan directive yang tidak terpakai
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]', caughtErrorsIgnorePattern: '^ignore' }],
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-undef': 'error', // Memastikan no-undef aktif
    },
  },
  // Konfigurasi khusus untuk file test
  {
    files: ['src/__tests__/**/*.{js,jsx}', '**/*.test.{js,jsx}', '**/*.spec.{js,jsx}'],
    plugins: {
      jest: eslintPluginJest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
        // Jika ada global lain yang spesifik untuk Jest dan tidak tercakup, tambahkan di sini
        // Misalnya: global: true (jika Anda benar-benar menggunakan 'global' secara eksplisit di test)
      },
    },
    rules: {
      ...eslintPluginJest.configs.recommended.rules,
      // Anda bisa menonaktifkan atau menyesuaikan aturan tertentu untuk file test jika perlu
      // Contoh: 'jest/expect-expect': 'off', // jika Anda tidak selalu memiliki expect di setiap test
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^[A-Z_]', caughtErrorsIgnorePattern: '^ignore' }], // Mungkin ingin lebih longgar di test
    },
  },
];
