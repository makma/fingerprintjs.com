import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL } from '../../../constants/content'

import { ReactComponent as UpTimeSVG } from './logos/UpTimeSVG.svg'
import { ReactComponent as ZeroTrustSVG } from './logos/ZeroTrustSVG.svg'
import { ReactComponent as ServerSideSVG } from './logos/ServerSideSVG.svg'
import { ReactComponent as DataEncryptionSVG } from './logos/DataEncryptionSVG.svg'
import { ReactComponent as DataCentersSVG } from './logos/DataCentersSVG.svg'
import { ReactComponent as PenetrationSVG } from './logos/PenetrationSVG.svg'

import styles from './CardsSection.module.scss'

export default function CardsSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.cardsContainer}>
        <header className={styles.headerSection}>
          <h2 className={styles.title}>Trust, Reliability, and Data Security</h2>
        </header>
        <div className={styles.cardsSection}>
          <Card
            icon={<UpTimeSVG />}
            title='99.9% Uptime'
            description={
              <>
                Fingerprint Pro maintains a 99.9% uptime SLA, and have a{' '}
                <a className={styles.link} target='_blank' rel='noreferrer' href={URL.statusUrl}>
                  publicly available Status page
                </a>{' '}
                to review at anytime.
              </>
            }
          />
          <Card
            icon={<ServerSideSVG />}
            title='Server-side security'
            description='Information is transferred server-side and transmitted securely to your servers using server-to-server API so information is never exposed in the browser.'
          />
          <Card
            icon={<ZeroTrustSVG />}
            title='Zero Trust mode'
            description='The Fingerprint Pro API supports Zero Trust mode to make it very difficult to send malicious identification requests that impersonate other visitors.'
          />
          <Card
            icon={<DataCentersSVG />}
            title='Data Centers'
            description='All data is secured in a series of global Amazon Web Services (AWS) datacenters with enterprise-grade physical and network security.'
          />
          <Card
            icon={<PenetrationSVG />}
            title='Penetration testing'
            description='Fingerprint undergoes comprehensive penetration and vulnerability testing on a yearly basis to ensure the compliance and security of our infrastructure.'
          />
          <Card
            icon={<DataEncryptionSVG />}
            title='Data Encryption'
            description={
              <>
                All web traffic through
                <br />
                Fingerprint is encrypted via
                <br />
                HTTPS and TLS 1.2.
              </>
            }
          />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
