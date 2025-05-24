module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': ['babel-jest', { configFile: './babel.config.cjs' }]
  },
  extensionsToTreatAsEsm: ['.jsx'],
  moduleNameMapper: {
    '^.+\\.svg$': '<rootDir>/src/__mocks__/svgMock.js',
    '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
    '^services/(.*)$': '<rootDir>/src/services/$1'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-router|react-router-dom|@remix-run)/)',
    'node_modules/(?!.*\\.mjs$)'
  ],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
    url: 'http://localhost'
  },
  moduleDirectories: ['node_modules', 'src'],
  globals: {
    'process.env': {
      NODE_ENV: 'test'
    }
  }
};