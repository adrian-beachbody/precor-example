const chalk = require('chalk')
const rimraf = require('rimraf')
const paths = require('../config/paths')
const scriptUtils = require('./utils')

const build = async () => {
  scriptUtils.checkBuildEnv()

  rimraf.sync(paths.clientBuild)
  rimraf.sync(paths.serverBuild)

  const {
    clientConfig,
    clientCompiler,
    clientPromise,
    serverConfig,
    serverCompiler,
    serverPromise,
  } = scriptUtils.compileWebpackConfigs()
  serverCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats))
      return
    }

    scriptUtils.logStatErrors(error, stats)
  })

  clientCompiler.watch({}, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(chalk.green(stats.toString(clientConfig.stats)))
      return
    }
    scriptUtils.logStatErrors(error, stats)
  })

  try {
    await serverPromise
    await clientPromise
    scriptUtils.logMessage('Done!', 'info')
    process.exit()
  } catch (error) {
    scriptUtils.logMessage(error, 'error')
    process.exit(1)
  }
}

build()
