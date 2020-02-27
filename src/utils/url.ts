import { Location } from 'history'

type QueryParamValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | string[]
  | number[]
  | boolean[]
  | null[]
  | undefined[]

export type UrlQueryConfig = Record<string, QueryParamValue>
export type UrlConfig = {
  params?: Record<string, string | number>
  query?: UrlQueryConfig
}

function interpolateParams(
  url: string,
  params: Record<string, string | number>
): string {
  return url
    .split('/')
    .map(part => {
      if (!part || part[0] !== ':') {
        return part
      }
      const value = encodeURIComponent(String(params[part.slice(1)]))

      return value || part
    })
    .join('/')
}

function appendQuery(url: string, query: string): string {
  if (!query) {
    return url
  }

  const hasQuery = url.includes('?')

  if (hasQuery) {
    const existingQuery = getUrlParts(url)[1]
    if (existingQuery) {
      return `${url}&${query}`
    }

    return `${url}${query}`
  }

  return `${url}?${query}`
}

export function formatUrl(url: string, config?: UrlConfig): string {
  if (!url) {
    return url
  }

  let newUrl = url

  if (config && config.params) {
    newUrl = interpolateParams(url, config.params)
  }

  if (newUrl.includes('/:')) {
    let message = `Url is missing params. url=${newUrl}`
    if (config) {
      message = `${message}, config=${JSON.stringify(config)}`
    }
    throw new Error(message)
  }

  if (config && config.query) {
    const query = formatQuery(config.query)
    newUrl = appendQuery(newUrl, query)
  }

  return newUrl
}

export function getLocationUrl(location: Location) {
  return `${location.pathname}${location.search}`
}

export type QueryParams = {
  get: (key: string) => null | string
  getAll: (key: string) => string[]
  parsed: Record<string, string[]>
}

export function formatQuery(obj: Record<string, QueryParamValue>) {
  if (!obj) {
    return ''
  }

  const args = Object.keys(obj)
  args.sort()
  return args.reduce((next, arg) => {
    let pair = ''
    if (Array.isArray(obj[arg])) {
      const values = obj[arg] as string[]
      pair = values
        .map(value => {
          const strValue = value || ''
          return `${encodeURIComponent(arg)}=${encodeURIComponent(strValue)}`
        })
        .join('&')
    } else if (obj[arg] !== undefined && obj[arg] !== null) {
      const value = String(obj[arg])
      pair = `${encodeURIComponent(arg)}=${encodeURIComponent(value)}`
    }

    if (next.length && pair.length) {
      return `${next}&${pair}`
    }
    return `${pair}`
  }, '')
}

export function parseUrlQueryParams(url: string) {
  const query = getUrlParts(url)[1]
  return parseQueryParams(query)
}

export function parseQueryParams(query: string) {
  let local = query
  if (query.startsWith('?')) {
    local = query.slice(1)
  }
  const keyValues = local.split('&')
  function get(key: string): string | null {
    if (parsed[key]) {
      return parsed[key][0]
    }
    return null
  }
  function getAll(key: string): string[] {
    if (parsed[key]) {
      return parsed[key]
    }
    return []
  }
  const parsed = keyValues.reduce((next, keyValue) => {
    const [key, value] = keyValue.split('=')
    const strValue = decodeURIComponent(value || '')
    if (key) {
      const decodedKey = decodeURIComponent(key)
      if (next[decodedKey]) {
        const arr = next[decodedKey] as string[]
        arr.push(strValue)
      } else {
        next[decodedKey] = [strValue]
      }
    }
    return next
  }, {} as Record<string, string[]>)

  return {
    get,
    getAll,
    parsed,
  }
}

export function filterQuery(currentUrl: string, paramSet: Set<string>): string {
  const [pathname, search] = getUrlParts(currentUrl)
  const params = parseQueryParams(search)
  const paramKeys = Object.keys(params.parsed)
  const newParams = paramKeys.reduce((next, key) => {
    if (paramSet.has(key)) {
      next[key] = params.parsed[key]
    }
    return next
  }, {} as Record<string, string[]>)

  const newQuery = formatQuery(newParams)
  return newQuery ? `${pathname}?${newQuery}` : pathname
}

export function getUrlParts(url: string): [string, string] {
  const [pathname, search] = url.split('?')
  return [pathname, search || '']
}
