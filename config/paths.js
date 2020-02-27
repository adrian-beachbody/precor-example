const path = require('path')
const base = path.resolve(__dirname, '..')
const resolveApp = relativePath => path.resolve(base, relativePath)

const paths = {
  app: base,
  build: resolveApp('build'),
  clientBuild: resolveApp('build/client'),
  serverBuild: resolveApp('build/server'),
  src: resolveApp('src'),
  assets: resolveApp('src/assets'),
  srcClient: resolveApp('src/client'),
  srcServer: resolveApp('src/server'),
}

paths.loadableStatsFile = path.resolve(paths.clientBuild, 'loadable-stats.json')
paths.resolveModules = [paths.src, 'node_modules']

module.exports = paths
