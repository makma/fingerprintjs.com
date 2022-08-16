import React from 'react'
import { Layout } from '../components/Layout'
import ClientsSection from '../components/ClientsSection'
import AccuracySection from '../components/AccuracySection/AccuracySection'
import LiveDemoSection from '../components/LiveDemoSection'
import MadeForDevelopersSection from '../components/MadeForDevelopersSection'
import ServerApiSection from '../components/ServerApiSection'
import UseCasesSection from '../components/UseCasesSection'
import Billing from '../components/Billing'
import SOCSection from '../components/SOCSection/SOCSection'
import { SEO } from '../components/SEO/SEO'
import { withPrefix } from 'gatsby'

import ProToolsSection from '../components/ProToolsSection'
import StayProtectedSection from '../components/StayProtectedSection'

export default function IndexPage() {
  return (
    <Layout>
      <div>
        <LiveDemoSection />
        <ClientsSection />
        <AccuracySection />
        <ServerApiSection />
        <MadeForDevelopersSection />
        <UseCasesSection />
        <Billing />
        <SOCSection />
        <ProToolsSection />
        <StayProtectedSection />
      </div>
    </Layout>
  )
}

export function Head() {
  return (
    <SEO>
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/background.svg')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundAfter.svg')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundTabletBefore.svg')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundTabletAfter.png')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundMobileBefore.svg')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundMobileAfter.png')} />
    </SEO>
  )
}
