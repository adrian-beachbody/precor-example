const env = require('./localEnv').serve
Object.assign(process.env, env)
require('./serve')
