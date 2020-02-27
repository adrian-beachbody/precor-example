module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
    'stylelint-prettier/recommended',
  ],
  plugins: ['stylelint-no-unsupported-browser-features'],
  rules: {
    'function-calc-no-invalid': true,
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['multicolumn', 'object-fit', 'css-gradients'],
      },
    ],
  },
}
