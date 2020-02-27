const env = require('./localEnv').build
Object.assign(process.env, env)
require('./build')
