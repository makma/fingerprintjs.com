import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import GetBeyondSection from '../../components/githubLandingPage/GetBeyondSection/GetBeyondSection'
import AccuracySection from '../../components/githubLandingPage/AccuracySection/AccuracySection'
import PlatformCapabilitiesSection from '../../components/githubLandingPage/PlatformCapabilitiesSection/PlatformCapabilitiesSection'
import IntegrationsSection from '../../components/githubLandingPage/IntegrationsSection/IntegrationsSection'
import ProLayersSection from '../../components/githubLandingPage/ProLayersSection/ProLayersSection'
import FeatureComparisonSection from '../../components/githubLandingPage/FeatureComparisonSection/FeatureComparisonSection'
import TechnicalUseCasesSection from '../../components/githubLandingPage/TechnicalUseCasesSection/TechnicalUseCasesSection'
import CircuitSection from '../../components/githubLandingPage/CircuitSection/CircuitSection'
import StartBuildingSection from '../../components/githubLandingPage/StartBuildingSection/StartBuildingSection'
import NextStepsSection from '../../components/githubLandingPage/NextStepsSection/NextStepsSection'

import { HeadProps, withPrefix } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

interface GitHubProps {
  pageContext: GeneratedPageContext
}
export default function GitHubPage({ pageContext }: GitHubProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate darkVariant>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}

      <GetBeyondSection />
      <AccuracySection />
      <PlatformCapabilitiesSection />
      <IntegrationsSection />
      <ProLayersSection />
      <FeatureComparisonSection />
      <TechnicalUseCasesSection />
      <CircuitSection />
      <StartBuildingSection />
      <NextStepsSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO pathname={props.location.pathname} title='Pro vs Open Source - Visitor Identification API Comparison'>
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/Cards.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/CardHover1.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/CardHover2.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/CardHover3.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/CardHover4.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit1.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit2.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit3.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit4.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit5.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit6.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit7.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit8.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/circuitSection/Circuit9.png')} />
    </SEO>
  )
}
