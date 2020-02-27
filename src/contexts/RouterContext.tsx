import React, { useEffect, useRef, ReactNode } from 'react'
import { RouteComponentProps, Route } from 'react-router-dom'
import logger from 'utils/logger'

type RouterContextProps = RouteComponentProps & {
  lastPageUrl: string
}
const RouterContext = React.createContext<RouterContextProps>(
  {} as RouterContextProps
)
RouterContext.displayName = 'RouterContext'

type InnerProps = RouteComponentProps & {
  children: ReactNode
}

function InnerRouterContextProvider({ children, ...routeProps }: InnerProps) {
  const location = routeProps.location
  const pageUrl = `${location.pathname}${location.search}`
  const isFirstRouteRef = useRef(true)
  const lastPageUrlRef = useRef(pageUrl)

  // If the pageurl doesn't mach the the last or we have already determined
  // that we are no longer on the first route we are not on the first route
  if (lastPageUrlRef.current !== pageUrl || !isFirstRouteRef.current) {
    isFirstRouteRef.current = false
  }

  // On the first route we want to make sure that lastPageUrl is empty otherwise
  // we can just use the the last page url
  const lastPageUrl = isFirstRouteRef.current ? '' : lastPageUrlRef.current
  lastPageUrlRef.current = pageUrl
  useEffect(() => {
    const fullUrl = `${location.pathname}${location.search}`
    logger({
      level: 'stat',
      name: 'PageView',
      info: {
        pageUrl: fullUrl,
        pageSearch: location.search,
      },
    })
  }, [location.pathname, location.search])
  return (
    <RouterContext.Provider
      value={{
        lastPageUrl,
        ...routeProps,
      }}
    >
      {children}
    </RouterContext.Provider>
  )
}

type Props = {
  children: ReactNode
}

export function RouterContextProvider({ children }: Props) {
  return (
    <Route
      render={props => (
        <InnerRouterContextProvider {...props}>
          {children}
        </InnerRouterContextProvider>
      )}
    />
  )
}

export default RouterContext
