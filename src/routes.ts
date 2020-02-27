import { UrlConfig, formatUrl } from 'utils/url'
import Const from 'utils/Const'

export const RouteNames = Const([
  'landing',
])

type RouteNamesList =
  | typeof RouteNames.landing

const routes: { [K in RouteNamesList]: string } = {
  [RouteNames.landing]: '/',
}

export interface RouteLocation extends UrlConfig {
  name: RouteNamesList
}

export function url(routeLocation: RouteLocation): string {
  const pathPattern = routes[routeLocation.name]
  return formatUrl(pathPattern, {
    query: routeLocation.query,
    params: routeLocation.params,
  })
}

export default routes
