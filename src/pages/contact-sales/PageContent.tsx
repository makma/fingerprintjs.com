import React from 'react'

import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import ContactSalesForm from '../../components/ContactSalesForm'

import styles from './contact-sales.module.scss'

export default function PageContent() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <ContactSalesForm />
        <ClientsSection />
      </Container>
    </Section>
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
