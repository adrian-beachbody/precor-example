import { LogObjectInterface } from 'utils/logger'

const indentationSpaces = 2
const RequestCompletedCategories = new Set([
  'PageRequestCompleted',
  'StaticRequestCompleted',
  'HMRRequestCompleted',
])

const CriticalClientRequestStarted = new Set(['PageRequestStarted'])

function spaceIf(next: string, part: string): string {
  const nextPart = part ? `${part} ` : ''
  return `${next}${nextPart}`
}

function formatPageRequestId(info: any): string {
  return info ? info.pageRequestId || '' : ''
}

function formatName(name: string): string {
  return `${name}:`
}

function formatRequestInfo(info: any): string {
  const requestInfo = `${info.method.toUpperCase()} ${info.pageUrl} ${
    info.status
  } ${info.duration}ms`
  if (info.redirect) {
    return `${requestInfo} -> ${info.redirect}`
  }
  return requestInfo
}

function formatMessage(logObj: LogObjectInterface): string {
  if (logObj.level === 'error') {
    return ''
  }

  return logObj.message || ''
}

function formatInfoObject(logObj: LogObjectInterface): string {
  const info = logObj.info
  const level = logObj.level
  const name = logObj.name

  if (RequestCompletedCategories.has(name)) {
    return formatRequestInfo(info)
  }

  if (CriticalClientRequestStarted.has(name)) {
    return formatStartedRequest(info.method, info.pageUrl)
  }

  if (name === 'PageView') {
    return info.pageUrl
  }

  if (level === 'info' || level === 'debug' || level === 'stat') {
    const sortedKeys = Object.keys(info).sort()
    const pairs = sortedKeys.map(key => {
      if (key === 'duration') {
        return `${info[key]}ms`
      }
      return `${key}=${info[key]}`
    })
    return pairs.join(' ')
  }

  return `\n${JSON.stringify(info, null, indentationSpaces)}\n`
}

function formatInfo(logObj: LogObjectInterface): string {
  const info = logObj.info

  if (info) {
    delete info.pageRequestId
    delete info.stack
    if (Object.keys(info).length > 0) {
      return formatInfoObject(logObj)
    }
  }

  return ''
}

function formatStartedRequest(method: string, url: string): string {
  return `${method.toUpperCase()} ${url}`
}

function formatLogLine(logObj: LogObjectInterface): string {
  const name = logObj.name
  const info = logObj.info
  const level = logObj.level

  const logLineParts = [
    level.toUpperCase(),
    formatPageRequestId(info),
    formatName(name),
    formatMessage(logObj),
    formatInfo(logObj),
  ]

  const logLine = logLineParts.reduce(spaceIf, '')
  return level === 'error' ? `\n${logLine}` : logLine
}

export default function logger(logObj: LogObjectInterface) {
  const stack = logObj.info ? logObj.info.stack : null
  const logLine = formatLogLine(logObj)
  console.log(logLine)
  if (stack) {
    console.log(`${stack}\n`)
  }
  return Promise.resolve()
}
