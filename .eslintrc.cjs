module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react', 'react-hooks', 'react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 0,
    'react/display-name': 0,

    // Material UI
    'no-restricted-imports': [
      'error',
      {
        patterns: ['@mui/*/*/*']
      }
    ],

    // EsLint
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-lonely-if': 'warn',
    'no-trailing-spaces': 'warn',
    'no-multiple-empty-lines': ['warn', { max: 1, maxEOF: 1 }],
    'no-multi-spaces': 'warn',
    'space-before-blocks': ['warn', 'always'],
    'object-curly-spacing': ['warn', 'always'],
    indent: ['warn', 2],
    quotes: ['warn', 'single'],
    'array-bracket-spacing': 'warn',
    'linebreak-style': 'off',
    'no-unexpected-multiline': 'warn',
    'comma-dangle': 'warn',
    'comma-spacing': 'warn',
    'arrow-spacing': 'warn',

    // Tăng cường một số rule prettier (copy từ file .prettierrc qua)
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
  }
}
