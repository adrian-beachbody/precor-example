import TError, { TErrorInterface } from 'utils/TError'

export interface LogObjectInterface {
  level: string
  name: string
  message?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any
}

export function TErrorToLog(
  err: TErrorInterface,
  level: string = 'error'
): LogObjectInterface {
  const logObj = {
    level: TError.getLevel(err) || level,
    name: TError.fullName(err),
    message: TError.fullMessage(err),
    info: TError.fullInfo(err),
  }

  if (logObj.level === 'error') {
    logObj.info.stack = TError.fullStack(err)
  }

  return logObj
}

export default function logger(logObj: LogObjectInterface): Promise<unknown> {
  const loggerFunc =
    process.env.NODE_ENV === 'production'
      ? require('api/logger').default
      : require('utils/consoleLogger').default
  return loggerFunc(logObj)
}
