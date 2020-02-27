import React, { ReactNode } from 'react'
import { Location } from 'history'
import logger, { TErrorToLog } from 'utils/logger'
import TError from 'utils/TError'

interface Props {
  children: ReactNode
  location: Location
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends React.Component<Props, State> {
  location: Location

  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
    this.location = props.location
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: any) {
    // You can also log the error to an error reporting service
    const wrappedError = new TError({
      name: 'ClientError',
      cause: error,
      info: {
        ...info,
        pageUrl: `${location.pathname}${location.search}`,
        pageSearch: location.search,
      },
    })
    logger(TErrorToLog(wrappedError))
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <section>
          Sorry, about this. Looks like we hit a snag. Thanks for your patience.
        </section>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
