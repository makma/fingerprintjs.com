import React from 'react'
import { Layout } from '../components/Layout'
import ClientsSection from '../components/ClientsSection'
import HeroSection from '../components/HeroSection'
import MadeForDevelopersSection from '../components/MadeForDevelopersSection'
import ServerApiSection from '../components/ServerApiSection'
import UseCasesSection from '../components/UseCasesSection'
import Billing from '../components/Billing'
import ProToolsSection from '../components/ProToolsSection'
import StayProtectedSection from '../components/StayProtectedSection'
import DemoSection from '../components/LiveDemoSection/LiveDemoSection'

export const IndexPageTemplate = () => (
  <div>
    <HeroSection />
    <ClientsSection />
    <DemoSection />
    <MadeForDevelopersSection />
    <ServerApiSection />
    <UseCasesSection />
    <Billing />
    <ProToolsSection />
    <StayProtectedSection />
  </div>
)

export default function IndexPage() {
  return (
    <Layout>
      <IndexPageTemplate />
    </Layout>
  )
}
