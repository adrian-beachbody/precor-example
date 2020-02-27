// TODO we cannot have babel.config.js at root of project for now because of
// https://github.com/stylelint/stylelint/issues/4018
module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: false,
      },
    ],
    '@babel/react',
    '@babel/typescript',
  ],
  plugins: [
    ['@babel/proposal-object-rest-spread', { useBuiltIns: true }],
    '@babel/proposal-class-properties',
    '@babel/syntax-dynamic-import',
    [
      'babel-plugin-styled-components',
      {
        transpileTemplateLiteral: false,
        displayName: process.env.NODE_ENV !== 'production',
      },
    ],
    [
      'babel-plugin-named-asset-import',
      {
        loaderMap: {
          svg: {
            ReactComponent: '@svgr/webpack?-prettier,-svgo![path]',
          },
        },
      },
    ],
    '@loadable/babel-plugin',
    '@babel/plugin-transform-runtime',
  ],
}
