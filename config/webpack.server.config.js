const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const getBaseConfig = require('./webpack.base.config')
const getRules = require('./webpack.rules.config')
const configUtils = require('./utils')
const paths = require('./paths')

module.exports = function getConfig() {
  return merge(getBaseConfig(), {
    name: 'server',
    target: 'node',
    entry: {
      server: path.join(paths.srcServer, 'index.ts'),
    },
    externals: nodeExternals({
      whitelist: [/\.css$/],
    }),
    module: {
      rules: getRules({ isServer: true }),
    },
    output: {
      path: paths.serverBuild,
      filename: 'index.js',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': configUtils.stringifyValues({
          RUNTIME: 'server',
          PORT: process.env.PORT,
        }),
      }),
    ],
    optimization: {
      splitChunks: false,
    },
  })
}
