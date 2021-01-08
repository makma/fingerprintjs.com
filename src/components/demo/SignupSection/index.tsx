import React from 'react'
import GetStartedForm from '../../GetStartedForm'
import Container from '../../common/Container'
import Section from '../../common/Section'
import signupImage from '../../../img/TEMP_signup_image.png'
import BackgroundImage from 'gatsby-background-image'
import { useMainBackgroundImage } from '../../../hooks/useBackgroundImage'

import styles from './SignupSection.module.scss'

export default function SignupSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.section}>
      <Container size='large' className={styles.container}>
        <div className={styles.form}>
          <h2 className={styles.header}>
            <strong className={styles.strong}>Sign Up</strong> Today!
          </h2>
          <GetStartedForm
            bullets={[
              { text: '10 Day Trial' },
              { text: 'API & Webhooks' },
              {
                text: 'GDPR and CCPA Compliant',
                info: (
                  <span>
                    FingerprintJS is GDPR/CCPA compliant. Our technology is intended to be used for fraud detection only
                    - for this use case, no user consent is required.
                    <br />
                    Any use outside of fraud detection would need to comply with GDPR/CCPA user consent rules. We never
                    automatically track traffic, and never do cross-domain tracking.
                  </span>
                ),
              },
            ]}
          />
        </div>

        <BackgroundImage Tag='span' className={styles.background} fluid={mainBackground}>
          <img alt='Stylized FingerprintJS widget' src={signupImage} className={styles.image} />
        </BackgroundImage>
      </Container>
    </Section>
  )
}
