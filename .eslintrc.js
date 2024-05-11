import stylistic from '@stylistic/eslint-plugin';

module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true, // jest 사용
  },
  extends: ['airbnb', 'plugin:prettier/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': 'off',
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react/jsx-props-no-spreading': 'off',
  },
};
