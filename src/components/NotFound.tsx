import React from 'react'
import Link from 'components/Link'

export default function NotFound() {
  return (
    <div>
      Sorry, this link doesn&apos;t exist. Please make sure you have the right
      link.
      <div>
        ...or check out our <Link to={{ name: 'landing' }}>Shop</Link>!
      </div>
    </div>
  )
}
