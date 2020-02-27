const webpack = require('webpack')
const chalk = require('chalk')
const getClientConfig = require('../config/webpack.client.config.js')
const getServerConfig = require('../config/webpack.server.config.js')

const logMessage = (message, level = 'info') => {
  const color =
    level === 'error'
      ? 'red'
      : level === 'warning'
      ? 'yellow'
      : level === 'info'
      ? 'blue'
      : 'white'
  console.log(`[${new Date().toISOString()}]`, chalk[color](message))
}

const compilerPromise = (name, compiler) => {
  return new Promise((resolve, reject) => {
    compiler.hooks.compile.tap(name, () => {
      logMessage(`[${name}] Compiling `)
    })
    compiler.hooks.done.tap(name, stats => {
      if (!stats.hasErrors()) {
        return resolve()
      }
      return reject(`Failed to compile ${name}`)
    })
  })
}

function checkEnv(requiredEnvVars) {
  const missing = []
  requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  })
  if (missing.length > 0) {
    throw new Error(`Missing environment variables: ${missing}`)
  }
}

function checkServerEnv() {
  if (process.env.TIARA_PM2) {
    checkEnv(['MAX_MEMORY_RESTART'])
  }
  checkEnv(['NODE_ENV'])
}
function checkBuildEnv() {
  checkEnv([
    'NODE_ENV',
    'ASSETS_URL',
    'DOTE_API_HOST',
    'DOTE_CACHE_API_HOST',
    'DOTE_API_PROTOCOL',
    'PORT',
    'GA_ID',
    'BRANCH_KEY',
    'LOGGLY_KEY',
    'SMARTY_AUTH_ID',
    'FB_APP_ID',
    'CONTENTFUL_ACCESS_TOKEN',
    'CONTENTFUL_API_URL',
    'CONTENTFUL_SPACE',
    'ROBOTS_TXT',
    'APPLE_PAY_TXT',
    'HOTJAR_ID',
    'SNAP_ID',
  ])
}

function compileWebpackConfigs() {
  const clientConfig = getClientConfig()
  const serverConfig = getServerConfig()
  const multiCompiler = webpack([clientConfig, serverConfig])

  const clientCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === 'client'
  )
  const serverCompiler = multiCompiler.compilers.find(
    compiler => compiler.name === 'server'
  )

  const clientPromise = compilerPromise('client', clientCompiler)
  const serverPromise = compilerPromise('server', serverCompiler)
  return {
    clientConfig,
    clientCompiler,
    clientPromise,
    serverConfig,
    serverCompiler,
    serverPromise,
  }
}

function logStatErrors(error, stats) {
  if (error) {
    logMessage(error, 'error')
  }
  if (stats.hasErrors()) {
    const info = stats.toJson()
    const errors = info.errors[0].split('\n')
    const maxErrorIndex = 3
    const loggableErrors = errors.slice(0, maxErrorIndex)
    loggableErrors.forEach((item, index) => {
      logMessage(errors[index], 'error')
    })
  }
}

module.exports = {
  logMessage,
  checkServerEnv,
  checkBuildEnv,
  compileWebpackConfigs,
  logStatErrors,
}
