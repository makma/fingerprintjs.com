import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import { URL } from '../../constants/content'

import HeroSection from '../../components/HeroWithCTA/HeroWithCTA'
import DemoSection from '../../components/demo/DemoSection/DemoSection'
import SolveAnyFraudSection from '../../components/demo/SolveAnyFraudSection/SolveAnyFraudSection'
import GetStartedSection from '../../components/demo/GetStartedSection/GetStartedSection'
import CatchFraudstersSection from '../../components/demo/DemoSection/VisitsSection/CatchFraudstersSection'

import { HeadProps } from 'gatsby'
import { SEO } from '../../components/SEO/SEO'

import styles from './Demo.module.scss'

interface DemoPageProps {
  pageContext: GeneratedPageContext
}
export default function DemoPage({ pageContext }: DemoPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection
        className={styles.heroSection}
        title='Fingerprint Pro Demo'
        ctaText='Create Free Account'
        ctaHref={`${URL.signupUrl}?&utm_source=homepage&utm_medium=website&utm_campaign=account-signup`}
        buttonId='create_free_account_demo_hero'
      >
        Identify anonymous site visitors with 99.5% accuracy to prevent online fraud
      </HeroSection>
      <DemoSection />
      <CatchFraudstersSection />
      <SolveAnyFraudSection />
      <GetStartedSection />
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return <SEO pathname={props.location.pathname} title='Technical Demo - Fingerprint Pro' />
}
