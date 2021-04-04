module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  plugins: [
    'jest',
    '@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    'max-len': ['error', {
      code: 125,
      ignoreStrings: true,
      ignoreUrls: true
    }],
    'import/extensions': [
      'warn',
      {
        'json': 'always',
        'js': 'never',
        'jsx': 'never',
        'ts': 'never',
        'tsx': 'never'
      }
    ],
  },
  settings: {
    'import/resolver': {
      'node': {
        'extensions': ['.js', '.ts'],
      },
    },
  },
};