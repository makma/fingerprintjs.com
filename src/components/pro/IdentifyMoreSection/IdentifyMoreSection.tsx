import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './IdentifyMoreSection.module.scss'

import { ReactComponent as CatchSVG } from './CatchSVG.svg'
import { ReactComponent as ImproveSVG } from './ImproveSVG.svg'
import { ReactComponent as HighSVG } from './HighSVG.svg'
import { ReactComponent as LongestSVG } from './LongestSVG.svg'

export default function IdentifyMoreSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Identify more visitors with accuracy</h2>
        <span className={styles.description}>
          Our best-in-class identifier works wherever you need it: fraud prevention, application analytics or
          personalization.
        </span>
        <div className={styles.cards}>
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
            icon={<HighSVG />}
            title='High accuracy on mobile and web'
            description='Identify users with confidence on all browsers and devices – including iOS and Safari.'
          />
          <Card
            icon={<LongestSVG />}
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
      <span className={styles.iconWrapper}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
