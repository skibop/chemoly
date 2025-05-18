module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'next/core-web-vitals',
    ],
    plugins: ['react', '@typescript-eslint'],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',  // global off, can be kept or removed
      '@typescript-eslint/no-explicit-any': 'off',
      'react/no-unescaped-entities': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
    },
    overrides: [
      {
        files: ['src/app/page.tsx', 'src/app/types/page.tsx'],
        rules: {
          '@typescript-eslint/no-unused-vars': 'warn',
        },
      },
    ],
  };
  