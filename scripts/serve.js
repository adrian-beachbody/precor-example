const startServer = require('../build/server').default
const paths = require('../config/paths')
const scriptUtils = require('./utils')
scriptUtils.checkServerEnv()
startServer(paths)
