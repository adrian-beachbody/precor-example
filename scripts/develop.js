const path = require('path')
const nodemon = require('nodemon')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const paths = require('../config/paths')
const scriptUtils = require('./utils')
const env = require('./localEnv').develop

Object.assign(process.env, env)

function createDevServer(clientCompiler, clientConfig, watchOptions) {
  const app = express()
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    return next()
  })
  app.use(
    webpackDevMiddleware(clientCompiler, {
      publicPath: process.env.ASSETS_URL,
      stats: 'none',
      watchOptions,
    })
  )
  app.use(webpackHotMiddleware(clientCompiler))
  app.use('/static', express.static(paths.clientBuild))
  const devPort = Number(process.env.PORT) + 1
  app.listen(devPort)
}

function startAppServer() {
  const script = nodemon({
    script: path.join(paths.app, 'scripts/serve.js'),
    ignore: ['src', 'scripts', 'config', './*.*', 'build/client'],
  })

  script.on('restart', () => {
    scriptUtils.logMessage('Server side app has been restarted.', 'warning')
  })

  script.on('quit', () => {
    console.log('Process quit')
    process.exit()
  })

  script.on('error', () => {
    scriptUtils.logMessage('An error occured. Exiting', 'error')
    process.exit(1)
  })
}

const start = async () => {
  scriptUtils.checkBuildEnv()
  scriptUtils.checkServerEnv()

  const {
    clientConfig,
    clientCompiler,
    clientPromise,
    serverCompiler,
    serverPromise,
  } = scriptUtils.compileWebpackConfigs()

  const watchOptions = {
    ignored: /node_modules/,
  }

  createDevServer(clientCompiler, clientConfig, watchOptions)

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log('server rebuilt')
      return
    }
    scriptUtils.logStatErrors(error, stats)
  })

  clientCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log('client rebuilt')
      return
    }
  })

  // wait until client and server is compiled
  try {
    await serverPromise
    await clientPromise
  } catch (error) {
    scriptUtils.logMessage(error, 'error')
  }

  startAppServer()
}

start()
