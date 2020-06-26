module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".jsx", ".tsx"] }],
    "import/extensions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-param-reassign": "off",
    "max-len": [1, { "code": 160 }],
    "jsx-a11y/no-static-element-interactions": "off",
  },
  settings: {
    "import/resolver": {
      "node": {
        "paths": ["src"],
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".scss"],
        moduleDirectory: ['node_modules', 'src/'],
      }
    }
  }
};
