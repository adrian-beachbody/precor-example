import React from 'react'
import { Switch, Route } from 'react-router-dom'
import loadable from '@loadable/component'

const Landing = loadable(() =>
  import(/* webpackChunkName: "page-landing" */ 'components/Landing')
)

const PageTemplate = loadable(() =>
  import(
    /* webpackChunkName: "component-page-template" */ 'components/PageTemplate'
  )
)

const NotFound = loadable(() =>
  import(/* webpackChunkName: "NotFound" */ 'components/NotFound')
)

export default function AppRoutes() {
  return (
    <PageTemplate>
      <Switch>
        <Route path="/" exact={true} strict={true} component={Landing} />
        <Route component={NotFound} />
      </Switch>
    </PageTemplate>
  )
}
