import React from 'react'
import { Layout } from '../../components/Layout'
import ClientsSection from '../../components/ClientsSection'
import AccuracySection from '../../components/AccuracySection/AccuracySection'
import LiveDemoSection from '../../components/LiveDemoSection'
import UseCasesSection from '../../components/UseCasesSection'
import Billing from '../../components/Billing'
import SOCSection from '../../components/SOCSection/SOCSection'
import { SEO } from '../../components/SEO/SEO'
import { withPrefix } from 'gatsby'
import VideoSection from '../../components/VideoSection/VideoSection'
import ProToolsSection from '../../components/ProToolsSection'
import StayProtectedSection from '../../components/StayProtectedSection'

export default function IndexPage() {
  return (
    <Layout>
      <LiveDemoSection advertisingVariant />
      <ClientsSection />
      <AccuracySection />
      <UseCasesSection />
      <Billing />
      <SOCSection advertisingVariant />
      <ProToolsSection />
      <VideoSection />
      <StayProtectedSection advertisingVariant />
    </Layout>
  )
}

export function Head() {
  return (
    <SEO>
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/background.svg')} />
      <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundAfter.svg')} />
      <meta name='robots' content='noindex' />
    </SEO>
  )
}
