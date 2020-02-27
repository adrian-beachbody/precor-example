import React from 'react'
import { Switch, Route } from 'react-router-dom'
import GlobalStyle from 'styles/global'
import AppRoutes from 'components/AppRoutes'

// const ExampleRoute = loadable(() =>
//   import(/* webpackChunkName: "example-route" */ 'components/ExampleRoute')
// )

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route component={AppRoutes} />
      </Switch>
    </>
  )
}
