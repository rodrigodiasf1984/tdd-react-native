module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: ['node_modules/(?!@react-native|react-native)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', {rootMode: 'upward'}],
  },
};
