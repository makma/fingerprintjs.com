import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import GetStartedSection from '../../components/githubPage/GetStartedSection/GetStartedSection'
import ProLayersSection from '../../components/githubPage/ProLayersSection/ProLayersSection'
import WhyGoProSection from '../../components/githubPage/WhyGoProSection/WhyGoProSection'
import FeatureComparisonSection from '../../components/githubPage/FeatureComparisonSection/FeatureComparisonSection'
import PricingSection from '../../components/githubPage/PricingSection/PricingSection'
import NextStepsSection from '../../components/githubPage/NextStepsSection/NextStepsSection'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

interface GitHubProps {
  pageContext: GeneratedPageContext
}
export default function GitHubPage({ pageContext }: GitHubProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <GetStartedSection />
      <ProLayersSection />
      <WhyGoProSection />
      <FeatureComparisonSection />
      <PricingSection />
      <NextStepsSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Pro vs Open Source - Visitor Identification API Comparison' />
}
