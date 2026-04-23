import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginAstro from 'eslint-plugin-astro';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.astro'],
    plugins: {
      astro: eslintPluginAstro,
    },
    languageOptions: {
      parser: await import('astro-eslint-parser').then((m) => m.default),
      parserOptions: {
        parser: await import('@typescript-eslint/parser').then(
          (m) => m.default,
        ),
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      ...(eslintPluginAstro.rules['no-conflict-set-directives'] ? {} : {}),
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'warn',
    },
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
      },
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/*.astro', '**/*.astro/*'],
    plugins: {
      'jsx-a11y': jsxA11y,
    },
    rules: jsxA11y.configs.recommended.rules,
  },
  {
    ignores: ['dist/**', 'node_modules/**', '.astro/**', 'public/**'],
  },
];
