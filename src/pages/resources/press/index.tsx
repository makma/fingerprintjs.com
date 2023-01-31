import React from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'

import PressReleasesSection from '../../../components/press/PressReleasesSection/PressReleasesSection'
import TimelineSection from '../../../components/press/TimelineSection/TimelineSection'
import BrandAssetsSection from '../../../components/press/BrandAssetsSection/BrandAssetsSection'
import ReachTeamSection from '../../../components/press/ReachTeamSection/ReachTeamSection'

import { HeadProps } from 'gatsby'
import { SEO } from '../../../components/SEO/SEO'

interface SecurityProps {
  pageContext: GeneratedPageContext
}
export default function Security({ pageContext }: SecurityProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PressReleasesSection />
      <TimelineSection />
      <BrandAssetsSection />
      <ReachTeamSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Fingerprint Press & Brand Resources - Logos and Recent News'
      description='Visit the Fingerprint Press and Brand Resources. This page includes recent news and media coverage, the company story, and downloadable brand guidelines and logos.'
    />
  )
}
