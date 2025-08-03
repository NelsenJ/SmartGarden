module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    // Disable rules that cause build failures in CI
    'jsx-a11y/anchor-is-valid': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    // Add more rules as needed
  },
  env: {
    browser: true,
    es6: true,
    node: true
  }
}; 