module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
  },
  settings: {
    react: {version: '16.9.0'},
  },
  extends: [
    'sanity',
    'sanity/react',
    'sanity/import',
    'plugin:react-hooks/recommended',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'import/no-extraneous-dependencies': 'off', // because of parts
    'import/no-unresolved': ['error', {ignore: ['.*:.*']}], // because of parts
    'prettier/prettier': [
      'error',
      {
        semi: false,
        printWidth: 100,
        bracketSpacing: false,
        singleQuote: true,
      },
    ],
    'sort-imports': 'off', // prefer import/order
    'no-process-env': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  plugins: ['import', 'prettier', 'react'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
}
