// .eslintrc.js
//
// WHY THIS CONFIG:
// - "expo" extends eslint-config-expo which bundles React, React Native,
//   and Expo-specific rules (hooks, no inline styles warnings, etc.)
// - @typescript-eslint adds TS-aware rules on top
// - eslint-plugin-import enforces consistent import ordering
//   (built-ins → externals → internals → relatives)

module.exports = {
  root: true,
  extends: [
    'expo',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // ─── TypeScript ───────────────────────────────────────────────────
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off', // Too verbose for React components
    '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],

    // ─── Import Order ─────────────────────────────────────────────────
    'import/order': [
      'error',
      {
        groups: [
          'builtin',        // node built-ins (path, fs)
          'external',       // npm packages (react, expo-router)
          'internal',       // @/ absolute imports
          ['parent', 'sibling', 'index'], // relative imports
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],

    // ─── React ────────────────────────────────────────────────────────
    'react/react-in-jsx-scope': 'off', // Not needed with React 17+ automatic JSX runtime
    'react/prop-types': 'off',         // We use TypeScript for prop types

    // ─── General ──────────────────────────────────────────────────────
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
};
