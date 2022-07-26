import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import ShieldSVG from '-!svg-react-loader!./images/shield.inline.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>Security at Fingerprint</h1>
          <p className={styles.description}>
            We’re committed to upholding the industry’s highest standards in security, privacy, and compliance to keep
            you and your customer’s data safe.
          </p>
        </section>
        <section className={styles.imageSection}>
          <ShieldSVG />
        </section>
      </Container>
    </Section>
  )
}
