// Import Jest DOM untuk memperluas expect dengan matcher DOM
import '@testing-library/jest-dom';

// Polyfill untuk TextEncoder dan TextDecoder
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Setup global mocks
global.fetch = jest.fn();

// Mock untuk localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

global.localStorage = localStorageMock;

// Mematikan console.error dan console.warn selama testing
global.console.error = jest.fn();
global.console.warn = jest.fn();