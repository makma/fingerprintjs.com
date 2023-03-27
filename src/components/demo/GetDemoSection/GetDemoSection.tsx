import React from 'react'

import Container from '../../common/Container'
import Section from '../../common/Section'
import ContactSalesForm from '../../ContactSalesForm'
import Check from './check.png'

import { Link } from 'gatsby'
import { PATH } from '../../../constants/content'
import styles from './GetDemoSection.module.scss'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'
import { ReactComponent as DropboxSVG } from '../../../../static/img/company-logos/dropbox.svg'
import { ReactComponent as TrustpilotSVG } from './Trustpilot.svg'

export default function GetDemoSection() {
  return (
    <Section elementId='get-demo' className={styles.root}>
      <Container size='large' className={styles.container}>
        <ClientsSection />
        <div className={styles.formSection}>
          <h2 className={styles.titleMobile}>Get a Demo</h2>
          <p className={styles.descriptionMobile}>
            Complete the form for a free demo that’s customized for your use case.
          </p>
          <ContactSalesForm variant='getDemo' />
        </div>
      </Container>
      <Container>
        <ContactSupportMessage mobile />
      </Container>
      <Container className={styles.clientsMobile}>
        <p className={styles.learn}>Learn how over 6,000 companies:</p>
        <ul className={styles.benefits}>
          <li>
            <img src={Check} />
            Prevent fraud by identifying the most sophisticated threats
          </li>
          <li>
            <img src={Check} />
            Streamline user experiences for trusted traffic
          </li>
          <li>
            <img src={Check} />
            Improve visitor analytics on mobile and web
          </li>
        </ul>
        <div className={styles.logosSection}>
          <div className={styles.logos}>
            <div className={styles.logoRow}>
              <CheckoutSVG className={styles.checkout} />
              <DropboxSVG className={styles.dropbox} />
            </div>
            <div className={styles.logoRow}>
              <TrustpilotSVG className={styles.trustpilot} />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}

function ClientsSection() {
  return (
    <Section className={styles.clients}>
      <h2 className={styles.title}>Get a Demo</h2>
      <p className={styles.description}>Complete the form for a free demo that’s customized for your use case.</p>
      <p className={styles.learn}>Learn how over 6,000 companies:</p>
      <ul className={styles.benefits}>
        <li>
          <img src={Check} />
          Prevent fraud by identifying the most sophisticated threats
        </li>
        <li>
          <img src={Check} />
          Streamline user experiences for trusted traffic
        </li>
        <li>
          <img src={Check} />
          Improve visitor analytics on mobile and web
        </li>
      </ul>
      <div className={styles.logosSection}>
        <div className={styles.logos}>
          <TrustpilotSVG className={styles.trustpilot} />
          <CheckoutSVG className={styles.checkout} />
          <DropboxSVG className={styles.dropbox} />
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
