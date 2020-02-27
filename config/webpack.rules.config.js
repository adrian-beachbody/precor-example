const babelConfig = require('./babel.config.js')
const paths = require('./paths')
const optimize = process.env.NODE_ENV === 'production'
module.exports = function getRulesConfig({ isServer }) {
  const babelOptions = Object.assign(
    {
      cacheDirectory: !optimize,
      cacheCompression: optimize,
      compact: optimize,
    },
    babelConfig
  )

  const babelLoader = {
    test: /\.(js|jsx|ts|tsx|mjs)$/,
    exclude: /node_modules/,
    loader: require.resolve('babel-loader'),
    options: babelOptions,
  }

  const urlLoader = {
    loader: 'url-loader',
    test: /\.(png|jpg|jpeg|gif|svg|eot|ttf|woff|woff2|mp4|otf)$/,
    options: {
      context: paths.src,
      publicPath: process.env.ASSETS_URL,
      name: '[path][name].[hash].[ext]',
      limit: 1,
      emitFile: !isServer,
    },
  }

  const imageLoader = {
    loader: 'image-webpack-loader',
    test: /\.(gif|png|jpe?g|svg)$/i,
    options: {
      disable: !optimize,
    },
  }

  return [
    {
      oneOf: [babelLoader, urlLoader, imageLoader],
    },
  ]
}
