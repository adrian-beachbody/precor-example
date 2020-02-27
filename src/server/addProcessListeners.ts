import { Server } from 'http'
import TError from 'utils/TError'
import logger, { TErrorToLog } from 'utils/logger'

export default function addProcessListeners(server: Server): void {
  process.on('unhandledRejection', reason => {
    const wrappedError = new TError({
      message: 'Unhandled server promise rejection',
      name: 'UnhandledServerRejectionError',
      info: reason,
    })
    logger(TErrorToLog(wrappedError)).then(() => {
      process.exit(1)
    })
  })

  process.on('uncaughtException', err => {
    const wrappedError = new TError({
      message: 'Fatal server exception',
      name: 'FatalServerExceptionError',
      cause: err,
    })
    logger(TErrorToLog(wrappedError)).then(() => {
      process.exit(1)
    })
  })
  process.on('SIGINT', () => {
    const wrappedError = new TError({
      message: 'There was an error shutting down the server',
      name: 'ServerShutdownError',
    })
    logger(TErrorToLog(wrappedError)).then(() => {
      process.exit(1)
    })
  })
}
