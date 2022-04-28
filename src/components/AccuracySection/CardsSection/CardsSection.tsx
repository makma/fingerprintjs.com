import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as CatchSVG } from './logos/CatchSVG.svg'
import { ReactComponent as ImproveSVG } from './logos/ImproveSVG.svg'
import { ReactComponent as DevicesSVG } from './logos/DevicesSVG.svg'
import { ReactComponent as LifetimesSVG } from './logos/LifetimesSVG.svg'

import styles from './CardsSection.module.scss'

export default function CardsSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.cardsContainer}>
        <header className={styles.headerSection}>
          <h2 className={styles.title}>Identify more visitors with accuracy</h2>
          <h3 className={styles.subTitle}>
            Our best-in-class identifier works wherever you need it: fraud prevention, application analytics or
            personalization.
          </h3>
        </header>
        <div className={styles.cardsSection}>
          <Card
            icon={<CatchSVG />}
            title='Catch sophisticated fraudsters'
            description='Associate current users with previous instances of fraud, even when they attempt to conceal their identity.'
          />
          <Card
            icon={<ImproveSVG />}
            title='Improve user experience for trusted visitors'
            description='Skip 2FA and OTP more often, and provide personalized experiences for logged out users.'
          />
          <Card
            icon={<DevicesSVG />}
            title='High accuracy on mobile and web'
            description='Identify users with confidence on all browsers and devices - including iOS and Safari.'
          />
          <Card
            icon={<LifetimesSVG />}
            title='Longest identification lifetimes'
            description='Associate historical, behavioral, and biometric data sources with your users over years, not days.'
          />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h2 className={styles.cardTitle}>{title}</h2>
      <h3 className={styles.cardDescription}>{description}</h3>
    </div>
  )
}
