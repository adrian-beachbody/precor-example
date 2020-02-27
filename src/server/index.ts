import express, { Router } from 'express'
import addProcessListeners from 'server/addProcessListeners'
import { ServerPaths } from 'server/types'
import { serveAssets } from 'server/static'

function pagesRouter(): Router {
  const router = Router()
  // return html file
  return router
}

export default function startServer(paths: ServerPaths): void {
  const app = express()
  app.disable('x-powered-by')
  app.disable('etag')
  app.use(process.env.ASSETS_URL, serveAssets(paths.clientBuild))
  app.use('/static/', serveAssets(paths.assets))
  app.get('*', pagesRouter())
  const server = app.listen(process.env.PORT, () => {
    console.log(`App is running: 🌎`)
  })
  addProcessListeners(server)
}
