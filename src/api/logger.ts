import { LogObjectInterface } from 'utils/logger'

export default function prodLog(logObj: LogObjectInterface) {
  if (logObj.level === 'debug') {
    return Promise.resolve()
  }

  const copy = Object.assign(
    {
      client: process.env.RUNTIME,
      clientTimestamp: Date.now(),
    },
    logObj
  )
  delete copy.info
  Object.assign(copy, logObj.info)
  // TODO setup remote log
  return console.table ? console.table(copy) : console.log
}
