import React from 'react'

import { LayoutTemplate } from '../../components/Layout'
import { GeneratedPageContext } from '../../helpers/types'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'

import PageContent from '../../components/contact-sales/PageContent'
import IntegrationsBanner from '../../components/IntegrationsBanner/IntegrationsBanner'
import { PATH } from '../../constants/content'
import DemoSection from '../../components/contactSales/DemoSection/DemoSection'
import { HeadProps, withPrefix } from 'gatsby'
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
      <DemoSection />
      <IntegrationsBanner
        title='Prevent fraud with Fingerprint Pro'
        ctaHref={PATH.demoUrl}
        ctaText='Learn More'
        openNewTab
      >
        Learn how Fingerprint Pro can help your business build a custom solution to detect and prevent fraud attempts.
      </IntegrationsBanner>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO pathname={props.location.pathname} title='Contact Sales - Fingerprint Pro'>
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundafter.svg')} />
    </SEO>
  )
}
