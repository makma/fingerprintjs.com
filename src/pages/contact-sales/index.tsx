import React from 'react'

import { LayoutTemplate } from '../../components/Layout'
import { GeneratedPageContext } from '../../helpers/types'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'

import PageContent from '../../components/contact-sales/PageContent'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ContactSalesPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PageContent />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Contact Sales - Fingerprint Pro' />
}
