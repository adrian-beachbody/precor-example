import React, { useEffect, useCallback, ReactNode } from 'react'
import useErrorLogger from 'hooks/useErrorLogger'
import TError from 'utils/TError'
import logger, { TErrorToLog } from 'utils/logger'

const vendorStacks = ['cdn.branch.io', 'safari-extension']

const isVendorError = (error: TError) => {
  return Boolean(
    vendorStacks.some(vStack =>
      error.stack ? error.stack.includes(vStack) : false
    )
  )
}

function getErrorHandler(name: string, onError: (e: TError) => void) {
  return function errorHandler(e: ErrorEvent) {
    if (e.error && isVendorError(e.error)) {
      e.preventDefault()
      return
    }
    window.removeEventListener('error', errorHandler)

    let wrappedError

    if (e.error) {
      wrappedError = new TError({
        name,
        cause: e.error,
      })
    } else {
      wrappedError = new TError({
        name: `Empty${name}`,
      })
    }

    onError(wrappedError)
    e.preventDefault()
  }
}

function getRejectionHandler(name: string, onRejection: (e: TError) => void) {
  return function errorHandler(e: PromiseRejectionEvent) {
    const reason = e.reason
    if (reason && isVendorError(reason)) {
      e.preventDefault()
      return
    }
    window.removeEventListener('unhandledrejection', errorHandler)

    let wrappedError

    if (reason) {
      wrappedError = new TError({
        name,
        cause: reason,
      })
    } else {
      wrappedError = new TError({
        name: `Empty${name}`,
      })
    }

    onRejection(wrappedError)
    e.preventDefault()
  }
}

let errorHandler: (e: ErrorEvent) => void
let rejectionHandler: (e: PromiseRejectionEvent) => void

// This function allows you to listen and log errors as soon
// as the client entry point begins before having access to application
export function addErrorListeners() {
  function onLoadingError(err: TError) {
    const logObj = TErrorToLog(err)
    logObj.info = {
      ...logObj.info,
      pageUrl: window.location.href,
      pageSearch: window.location.search,
    }
    logger(logObj)
  }
  errorHandler = getErrorHandler('PreUncaughExceptionError', onLoadingError)
  rejectionHandler = getRejectionHandler(
    'PreUnhandledRejectionError',
    onLoadingError
  )
  window.addEventListener('error', errorHandler)
  window.addEventListener('unhandledrejection', rejectionHandler)
}

// This renderless component will unbind the existing listeners if any
// and will rebind with listeners that can log with access to live application
// state
type Props = {
  children: ReactNode
}
export default function GlobalErrorListeners({ children }: Props) {
  const errorLogger = useErrorLogger()
  const onError = useCallback(
    (err: TError) => {
      errorLogger(err)
    },
    [errorLogger]
  )
  useEffect(() => {
    window.removeEventListener('error', errorHandler)
    errorHandler = getErrorHandler('UncaughExceptionError', onError)
    window.addEventListener('error', errorHandler)
    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [onError])
  useEffect(() => {
    window.removeEventListener('unhandledrejection', rejectionHandler)
    rejectionHandler = getRejectionHandler('UnhandledRejectionError', onError)
    window.addEventListener('unhandledrejection', rejectionHandler)
    return () => {
      window.removeEventListener('unhandledrejection', rejectionHandler)
    }
  }, [onError])
  return <>{children}</>
}
