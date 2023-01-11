import React from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'

import HeroSection from '../../../components/pro/HeroSection/HeroSection'
import CardSection from '../../../components/pro/CardSection/CardSection'
import IdentifyMoreSection from '../../../components/pro/IdentifyMoreSection/IdentifyMoreSection'
import DiagramSection from '../../../components/AccuracySection/DiagramSection/DiagramSection'
import WhoUsesSection from '../../../components/pro/WhoUsesSection/WhoUsesSection'
import MadeForDevelopers from '../../../components/pro/MadeForDevelopers/MadeForDevelopers'
import IncludedSection from '../../../components/pro/IncludedSection/IncludedSection'
import BannerSection from '../../../components/pro/BannerSection/BannerSection'

import { SEO } from '../../../components/SEO/SEO'
import { HeadProps, withPrefix } from 'gatsby'

import styles from './Pro.module.scss'

interface ProProps {
  pageContext: GeneratedPageContext
}
export default function Pro({ pageContext }: ProProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <CardSection />
      <IdentifyMoreSection />
      <DiagramSection className={styles.diagram} box />
      <WhoUsesSection />
      <MadeForDevelopers />
      <IncludedSection />
      <BannerSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Fingerprint Pro - 99.5% Visitor Identification API - Detect Anonymous Visitors'
      description='Get a full picture of your visitors - even anonymous visitors. Identify 99.5% of returning visitors, even when they attempt to conceal their identity. Our best-in-class identifier works wherever you need it: fraud prevention, application analytics or personalization.'
    >
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundafter.svg')} />
    </SEO>
  )
}
