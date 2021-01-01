import React from 'react'
import GetStartedForm from '../GetStartedForm'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'

import styles from './HeroSection.module.scss'

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
      <GetStartedForm
        className={styles.form}
        bullets={[
          { text: 'Over 6,000 Websites' },
          { text: '300M Monthly Requests' },
          {
            text: 'GDPR and CCPA Compliant',
            info: (
              <span>
                FingerprintJS is GDPR/CCPA compliant. Our technology is intended to be used for fraud detection only -
                for this use case, no user consent is required.
                <br />
                Any use outside of fraud detection would need to comply with GDPR/CCPA user consent rules. We never
                automatically track traffic, and never do cross-domain tracking.
              </span>
            ),
          },
        ]}
        wide
      />
    </Section>
  )
}
