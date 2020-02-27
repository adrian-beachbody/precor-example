import { useContext, useCallback } from 'react'
import logger, { LogObjectInterface } from 'utils/logger'
import RouterContext from 'contexts/RouterContext'

export default function useLogger() {
  const { location } = useContext(RouterContext)
  return useCallback(
    (logObj: LogObjectInterface): void => {
      const info = {
        pageUrl: `${location.pathname}${location.search}`,
        pageSearch: location.search,
      }
      let merged
      if (logObj.info) {
        merged = {
          ...logObj,
          info: {
            ...info,
            ...logObj.info,
          },
        }
      } else {
        merged = {
          ...logObj,
          info,
        }
      }

      logger(merged)
    },
    [location.pathname, location.search]
  )
}
