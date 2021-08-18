import React from 'react'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'
import { LayoutTemplate } from '../../components/Layout'
import { GeneratedPageContext } from '../../helpers/types'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import ContactSalesForm from '../../components/ContactSalesForm'
import { ReactComponent as ConfirmSVG } from './confirmSVG.svg'

import styles from './contact-sales.module.scss'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ContactSalesPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Sales - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PageContent />
    </LayoutTemplate>
  )
}

function ClientsSection() {
  const clients = ['coinbase', 'yahoo', 'agoda', 'us-bank', 'ebay', 'target', 'booking', 'checkout-com']

  return (
    <Section className={styles.clients}>
      <header className={styles.header}>
        <h2 className={styles.title}>Join over 8,000 websites using FingerprintJS to prevent fraud</h2>
      </header>
      <div className={styles.content}>
        {clients.map((client) => {
          return (
            <span key={`slide_${client}`} className={styles.slide}>
              <img alt={`${client} logo`} className={styles.logo} src={`/img/company-logos/${client}.svg`} />
            </span>
          )
        })}
      </div>
    </Section>
  )
}

function TalkToSalesSection() {
  return (
    <Section className={styles.form}>
      <h1 className={styles.header}>Talk to an Expert</h1>
      <h2 className={styles.subHeader}>Fill out the form below and we will reach out shortly.</h2>
      <ContactSalesForm />
    </Section>
  )
}

function ConfirmDataSent() {
  return (
    <Section className={styles.dataSent}>
      <ConfirmSVG className={styles.confirmLogo} />
      <h2 className={styles.message}>We’ll reach out to you shortly</h2>
    </Section>
  )
}

interface PageContentProps {
  confirmPage?: boolean
}

export function PageContent({ confirmPage }: PageContentProps) {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        {confirmPage ? <ConfirmDataSent /> : <TalkToSalesSection />}
        <ClientsSection />
      </Container>
    </Section>
  )
}
