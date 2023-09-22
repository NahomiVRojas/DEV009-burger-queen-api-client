/* eslint-env node */
const path = require('path');

module.exports = {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|js|tsx|jsx)$": "@swc/jest",
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      '\\.(svg|webp)$': path.resolve(__dirname, 'src', '__mocks__', 'fileMock.js')
    },
  };