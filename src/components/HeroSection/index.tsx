import React from 'react'
import GetStartedForm from '../GetStartedForm'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.liveDemo} backgroundImageFluid={mainBackground}>
      <h1 className={styles.title}>99.5% Accurate Browser Fingerprinting As a Service</h1>
      <p className={styles.description}>
        Identify your web visitors using the most accurate, developer-friendly identification API.
      </p>
      <GetStartedForm
        className={styles.form}
        bullets={['Over 6,000 Websites', '300M Monthly Requests', 'GDPR and CCPA Compliant']}
        wide
      />
    </Section>
  )
}
