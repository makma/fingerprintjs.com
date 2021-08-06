import React from 'react'
import useSiteMetadata from '../../../hooks/useSiteMetadata'
import { LayoutTemplate } from '../../../components/Layout'

import { useLocation } from '@reach/router'
import { GeneratedPageContext } from '../../../helpers/types'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'

import { PageContent } from '../index'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ConfirmPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Sales - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PageContent confirmPage={true} />
    </LayoutTemplate>
  )
}
