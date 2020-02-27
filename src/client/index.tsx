import React from 'react'
import { hydrate } from 'react-dom'
import { HelmetProvider } from 'react-helmet-async'
import {
  BrowserRouter as Router,
  Route,
  RouteComponentProps,
} from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import ErrorBoundary from 'components/ErrorBoundary'
import GlobalErrorListeners, {
  addErrorListeners,
} from 'client/GlobalErrorListeners'
import { RouterContextProvider } from 'contexts/RouterContext'
import App from 'App'

function addPolyfills() {
  let promises: Promise<unknown>[] = []
  if (!window.Intl) {
    promises = [
      import(/* webpackChunkName: "intl-data-old-browsers" */ 'intl'),
      import(
        /* webpackChunkName: "intl-data-old-browsers" */ 'intl/locale-data/jsonp/en.js'
      ),
      import(
        /* webpackChunkName: "intl-data-old-browsers" */ 'intl/locale-data/jsonp/en-US.js'
      ),
    ]
  }

  return Promise.all(promises)
}

addErrorListeners()
const loadablePromise = new Promise(resolve => {
  loadableReady(resolve)
})
Promise.all([addPolyfills(), loadablePromise]).then(() => {
  hydrate(
    <Router>
      <HelmetProvider>
        <RouterContextProvider>
          <GlobalErrorListeners>
            <Route
              render={({ location }: RouteComponentProps) => (
                <ErrorBoundary location={location}>
                  <App />
                </ErrorBoundary>
              )}
            />
          </GlobalErrorListeners>
        </RouterContextProvider>
      </HelmetProvider>
    </Router>,
    document.querySelector('#app')
  )
})

if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept()
  }
}
