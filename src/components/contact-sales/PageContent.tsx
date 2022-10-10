import React from 'react'

import Container from '../common/Container'
import Section from '../common/Section'
import ContactSalesForm from '../ContactSalesForm'
import { ReactComponent as TickSVG } from '../../img/Tick.svg'

import styles from './contact-sales.module.scss'

export default function PageContent() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <ClientsSection />
        <div>
          <h2 className={styles.titleMobile}>Talk to Our Team</h2>
          <ContactSalesForm />
        </div>
      </Container>
    </Section>
  )
}

function ClientsSection() {
  const clients = ['checkout', 'yahoo', 'booking', 'us-bank']

  return (
    <Section className={styles.clients}>
      <h2 className={styles.title}>Talk to Our Team</h2>
      <ul className={styles.benefits}>
        <li>
          <TickSVG />
          Prevent fraud by identifying the most sophisticated threats
        </li>
        <li>
          <TickSVG />
          Streamline user experiences for trusted traffic
        </li>
        <li>
          <TickSVG />
          Improve visitor analytics on mobile and web
        </li>
      </ul>
      <div className={styles.logosSection}>
        <h4 className={styles.logosTitle}>Join over 6,000 websites using Fingerprint</h4>

        <div className={styles.logos}>
          {clients.map((client) => {
            return (
              <span key={`slide_${client}`} className={styles.slide}>
                <img alt={`${client} logo`} className={styles.logo} src={`/img/company-logos/${client}.svg`} />
              </span>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
