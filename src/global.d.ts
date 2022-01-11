/// <reference types="./__generated__/gatsby-types" />

declare module '*.svg' {
  import React = require('react')
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}

declare module '*.png'

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

import 'jest-fetch-mock'
