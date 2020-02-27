interface TErrorOptions {
  name?: string
  level?: string
  message?: string
  cause?: TErrorInterface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any
}

export interface TErrorInterface {
  message: string
  name: string
  stack?: string
  level?: string
  cause?: TErrorInterface
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any
}

class TError extends Error {
  message: string
  name: string
  level?: string
  cause?: TError
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info?: any
  constructor(options: TErrorOptions) {
    super(options.message)
    Object.setPrototypeOf(this, TError.prototype)
    this.message = options.message || ''
    this.name = options.name || ''
    this.level = options.level || ''
    if (options.cause) {
      this.cause = options.cause
    }
    this.info = options && options.info ? Object.assign({}, options.info) : {}
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }

  toString() {
    return TError.fullMessage(this)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static fullInfo(err: TErrorInterface): any {
    const cause = err.cause
    const info = cause !== undefined ? TError.fullInfo(cause) : {}
    if (err && err.info) {
      return Object.assign(info, err.info)
    }

    return info
  }

  static fullStack(err: TErrorInterface): string {
    const cause = err.cause

    // IE doesn't have stack
    const stack = err.stack || err.name
    if (cause) {
      return `${stack}\n\nCaused by\n\n${TError.fullStack(cause)}`
    }

    return stack
  }

  static fullName(err: TErrorInterface): string {
    const cause = err.cause

    if (cause) {
      return `${err.name}.${TError.fullName(cause)}`
    }

    if (err) {
      return err.name
    }
    return ''
  }

  static fullMessage(err: TErrorInterface): string {
    const cause = err.cause
    const message = `${err.name}: ${err.message}`

    if (cause) {
      return `${message} > ${TError.fullMessage(cause)}`
    }

    return message
  }

  static getLevel(err: TErrorInterface): string {
    if (err.level) {
      return err.level
    }
    const cause = err.cause
    if (cause) {
      return TError.getLevel(cause)
    }
    return ''
  }
}

export default TError
