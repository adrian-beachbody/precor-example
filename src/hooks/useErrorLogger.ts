import { useCallback } from 'react'
import { TErrorToLog } from 'utils/logger'
import TError from 'utils/TError'
import useLogger from 'hooks/useLogger'

export type ErrorLoggerOptions = {
  name?: string
  info?: Record<string, any>
  level?: string
  message?: string
}

export default function useErrorLogger() {
  const myLogger = useLogger()
  return useCallback(
    (error: Error, options?: ErrorLoggerOptions): void => {
      if (options) {
        const settings = {
          ...options,
          cause: error,
        }
        const extendedError = new TError(settings)
        myLogger(TErrorToLog(extendedError))
      } else {
        myLogger(TErrorToLog(error))
      }
    },
    [myLogger]
  )
}
