/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */

export default {
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  arrowParens: 'always',

  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
};
