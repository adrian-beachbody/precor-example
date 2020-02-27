import React, { ReactNode } from 'react'
import { Link as BrowserLink } from 'react-router-dom'
import { url, RouteLocation } from 'routes'

export type LinkProps = {
  to: string | RouteLocation
  className?: string
  children: ReactNode
  onClick?: () => void
}

export default function Link({
  to,
  children,
  className,
  onClick,
  ...props
}: LinkProps) {
  const path: string = typeof to !== 'string' ? url(to) : to
  return (
    <BrowserLink to={path} {...props} className={className} onClick={onClick}>
      {children}
    </BrowserLink>
  )
}
