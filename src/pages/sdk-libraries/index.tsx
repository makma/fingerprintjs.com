import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import HeroSection from '../../components/sdks/HeroSection/HeroSection'
import CardsSection from '../../components/sdks/CardsSection/CardsSection'
import IntegrationsBanner from '../../components/IntegrationsBanner/IntegrationsBanner'
import { URL } from '../../constants/content'
import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

interface SdksProps {
  pageContext: GeneratedPageContext
}
export default function Sdks({ pageContext }: SdksProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <CardsSection />
      <IntegrationsBanner
        title='Don’t Have An Account Yet?'
        ctaHref={URL.signupUrl}
        ctaText='Sign Up'
        openNewTab
        variant='blue'
      >
        Developers can start building with Fingerprint for free - no credit card required.
      </IntegrationsBanner>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='SDKs and Libraries - Fingerprint'
      description='Connect Fingerprint quickly to your applications with our custom built SDKs and libraries.'
    />
  )
}
