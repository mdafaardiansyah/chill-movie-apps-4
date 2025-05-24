// Import Jest DOM untuk memperluas expect dengan matcher DOM
import '@testing-library/jest-dom';

// Polyfill untuk TextEncoder dan TextDecoder
import { TextEncoder, TextDecoder } from 'util';
window.TextEncoder = TextEncoder;
window.TextDecoder = TextDecoder;

// Setup global mocks
window.fetch = jest.fn();

// Mock untuk localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

window.localStorage = localStorageMock;

// Mematikan console.error dan console.warn selama testing
window.console.error = jest.fn();
window.console.warn = jest.fn();