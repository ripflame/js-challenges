export default {
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.test.js'
  ],
  collectCoverageFrom: [
    '**/solution/**/*.js',
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  verbose: true,
  testTimeout: 10000, // 10 seconds for file operations
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js']
};