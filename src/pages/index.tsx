import React from 'react'
import { Layout } from '../components/Layout'
import ClientsSection from '../components/ClientsSection'
import LiveDemoSection from '../components/LiveDemoSection'
import MadeForDevelopersSection from '../components/MadeForDevelopersSection'
import ServerApiSection from '../components/ServerApiSection'
import UseCasesSection from '../components/UseCasesSection'
import Billing from '../components/Billing'
import SOCSection from '../components/SOCSection/SOCSection'

import ProToolsSection from '../components/ProToolsSection'
import StayProtectedSection from '../components/StayProtectedSection'

export const IndexPageTemplate = () => (
  <div>
    <LiveDemoSection />
    <ClientsSection />
    <MadeForDevelopersSection />
    <ServerApiSection />
    <UseCasesSection />
    <Billing />
    <SOCSection />
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
