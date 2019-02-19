module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'prettier', 'prettier/react'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
        semi: false,
      },
    ],
    indent: ['error', 2],
    'react/prefer-stateless-function': 0,
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    'class-methods-use-this': 0,
    'import/no-named-as-default': 0,
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'no-underscore-dangle': 0,
    'no-unused-vars': 1
  },
}
