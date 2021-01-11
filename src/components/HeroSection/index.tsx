import React from 'react'
import GetStartedForm from '../GetStartedForm'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'

import styles from './HeroSection.module.scss'

// Main A/B test changes.
export default function HeroSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.liveDemo} backgroundImageFluid={mainBackground}>
      <h1 className={styles.title}>
        99.5% Accurate Browser Fingerprinting <br className={styles.desktopOnly} />
        as a Service
      </h1>
      <p className={styles.description}>
        Identify your web visitors using the most accurate, developer-friendly identification API.
      </p>
      <GetStartedForm className={styles.form} variant='wide' />
    </Section>
  )
}
