import React from 'react'
import { Script } from 'gatsby'
import { BASE_URL } from '../../constants/content'
import { Breadcrumb } from './Breadcrumbs'
import { withTrailingSlash } from '../../helpers/url'
import { kebabToStart } from '../../helpers/case'

export default function BreadcrumbsSEO({ breadcrumbs }: { breadcrumbs: Array<Breadcrumb> }) {
  return (
    <Script id='breadcrumbsSeo' type='application/ld+json'>
      {getStructuredData(breadcrumbs)}
    </Script>
  )
}

function getStructuredData(breadcrumbs: Array<Breadcrumb>): string {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map(({ pathname: path, crumbLabel: label }, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: kebabToStart(label),
      item: `${BASE_URL}${withTrailingSlash(path)}`,
    })),
  }

  return JSON.stringify(data)
}
