const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')
const merge = require('webpack-merge')
const getBaseConfig = require('./webpack.base.config')
const getRules = require('./webpack.rules.config')
const configUtils = require('./utils')
const paths = require('./paths')
const stringifyValues = configUtils.stringifyValues
const optimize = process.env.NODE_ENV === 'production'
function getPlugins() {
  const plugins = [
    new webpack.DefinePlugin({
      'process.env': stringifyValues({
        RUNTIME: 'browser',
      }),
    }),
    new CaseSensitivePathsPlugin(),
    new LoadablePlugin(),
  ]

  if (!optimize) {
    plugins.push(new webpack.HotModuleReplacementPlugin())
  }

  return plugins
}

module.exports = function getConfig() {
  const output = {
    path: paths.clientBuild,
    filename: optimize ? '[chunkhash].js' : '[name].js',
  }
  if (!optimize) {
    output.hotUpdateMainFilename = 'updates/[hash].hot-update.json'
    output.hotUpdateChunkFilename = 'updates/[id].[hash].hot-update.js'
  }

  const config = merge(getBaseConfig(), {
    name: 'client',
    target: 'web',
    devtool: optimize ? false : '#cheap-module-source-map',
    entry: {
      bundle: [paths.srcClient],
    },
    module: {
      rules: getRules({ isServer: false }),
    },
    optimization: {
      namedModules: !optimize,
      noEmitOnErrors: true,
      runtimeChunk: 'single',
      splitChunks: {
        maxAsyncRequests: 1,
      },
    },
    output,
    plugins: getPlugins(),
  })

  if (!optimize) {
    config.entry.bundle = [
      `webpack-hot-middleware/client?path=/__webpack_hmr`,
      ...config.entry.bundle,
    ]
  }

  return config
}
