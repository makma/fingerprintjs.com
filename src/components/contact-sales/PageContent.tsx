import React from 'react'

import Container from '../common/Container'
import Section from '../common/Section'
import ContactSalesForm from '../ContactSalesForm'
import { ReactComponent as TickSVG } from '../../img/Tick.svg'
import { Link } from 'gatsby'
import { PATH } from '../../constants/content'
import styles from './contact-sales.module.scss'
import { ReactComponent as CheckoutSVG } from '../../../static/img/company-logos/checkout.svg'
import { ReactComponent as YahooSVG } from '../../../static/img/company-logos/yahoo.svg'
import { ReactComponent as BookingSVG } from '../../../static/img/company-logos/booking.svg'
import { ReactComponent as UsBankSVG } from '../../../static/img/company-logos/us-bank.svg'

export default function PageContent() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <ClientsSection />
        <div className={styles.formSection}>
          <h2 className={styles.titleMobile}>Talk to Our Team</h2>
          <ContactSalesForm />
        </div>
      </Container>
    </Section>
  )
}

function ClientsSection() {
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
      <ContactSupportMessage mobile />
      <div className={styles.logosSection}>
        <h4 className={styles.logosTitle}>Join over 6,000 websites using Fingerprint</h4>

        <div className={styles.logos}>
          <div className={styles.logoRow}>
            <CheckoutSVG className={styles.checkout} />
            <YahooSVG className={styles.yahoo} />
          </div>
          <div className={styles.logoRow}>
            <BookingSVG className={styles.booking} />
            <UsBankSVG className={styles.usBank} />
          </div>
        </div>
      </div>
      <ContactSupportMessage />
    </Section>
  )
}

interface ContactSupportMessageParams {
  mobile?: boolean
}
function ContactSupportMessage({ mobile }: ContactSupportMessageParams) {
  return (
    <div className={mobile ? styles.contactSupportSectionMobile : styles.contactSupportSection}>
      <p className={styles.contactSupportText}>
        For technical support, please reach out to{' '}
        <Link className={styles.link} to={PATH.support}>
          Fingerprint support
        </Link>
      </p>
    </div>
  )
}
