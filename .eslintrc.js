const isDev =
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development'

module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'jest',
    'simple-import-sort',
  ],
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  globals: {
    ethereum: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
    createDefaultProgram: true,
  },
  rules: {
    'react/destructuring-assignment': 0,
    'linebreak-style': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        trailingComma: 'es5',
        jsxSingleQuote: false,
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-loop-func': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'no-loop-func': 'error',
    'no-redeclare': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'no-debugger': !isDev ? 'error' : 'warn',
    '@typescript-eslint/ban-ts-comment': !isDev ? 'error' : 'warn',
    'no-console': [!isDev ? 'error' : 'warn', { allow: ['warn', 'error'] }],
    'react/prop-types': 0,
    'import/prefer-default-export': 'off',
    'consistent-return': 0,
    'react/button-has-type': 0,
    'react/jsx-props-no-spreading': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'react/state-in-constructor': ['error', 'never'],
    'react/react-in-jsx-scope': 0,
    'import/extensions': 0,
    '@typescript-eslint/no-unused-vars': !isDev ? 'error' : 'warn',
    trailingComma: 'off',
    'react/require-default-props': 0,
    'react/jsx-fragments': 0,
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'only-multiline',
      },
    ],
    'react/jsx-key': ['error', { checkFragmentShorthand: true }],
  },
}
