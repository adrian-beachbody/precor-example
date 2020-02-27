const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const WriteFileWebpackPlugin = require('write-file-webpack-plugin')
const configUtils = require('./utils')
const paths = require('./paths')
const stringifyValues = configUtils.stringifyValues

const optimize = process.env.NODE_ENV === 'production'

module.exports = function getConfig() {
  const config = {
    mode: optimize ? 'production' : 'development',
    output: {
      publicPath: process.env.ASSETS_URL,
    },
    performance: {
      hints: optimize ? 'warning' : false,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      modules: paths.resolveModules,
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              ecma: 6,
              warnings: false,
              drop_console: optimize, // eslint-disable-line camelcase
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 6,
              comments: false,
            },
          },
        }),
      ],
    },
  }

  let plugins = [
    new webpack.DefinePlugin({
      'process.env': stringifyValues({
        NODE_ENV: process.env.NODE_ENV,
        DOTE_API_HOST: process.env.DOTE_API_HOST,
        PROXY_API: process.env.PROXY_API,
        DOTE_CACHE_API_HOST: process.env.DOTE_CACHE_API_HOST,
        DOTE_API_PROTOCOL: process.env.DOTE_API_PROTOCOL,
        ASSETS_URL: process.env.ASSETS_URL,
        LOGGLY_KEY: process.env.LOGGLY_KEY,
        SMARTY_AUTH_ID: process.env.SMARTY_AUTH_ID,
        BRANCH_KEY: process.env.BRANCH_KEY,
        GA_ID: process.env.GA_ID,
        FB_APP_ID: process.env.FB_APP_ID,
        CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
        CONTENTFUL_API_URL: process.env.CONTENTFUL_API_URL,
        CONTENTFUL_SPACE: process.env.CONTENTFUL_SPACE,
        ROBOTS_TXT: process.env.ROBOTS_TXT,
        APPLE_PAY_TXT: process.env.APPLE_PAY_TXT,
        HOTJAR_ID: process.env.HOTJAR_ID,
        SNAP_ID: process.env.SNAP_ID,
      }),
    }),
  ]

  if (optimize) {
    plugins = plugins.concat([new webpack.HashedModuleIdsPlugin()])
  } else {
    plugins = plugins.concat([new WriteFileWebpackPlugin()])
  }

  config.plugins = plugins

  return config
}
