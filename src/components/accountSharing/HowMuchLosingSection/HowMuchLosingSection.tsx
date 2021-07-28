import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as EmailSVG } from './emailSVG.svg'
import { ReactComponent as EmailMobileSVG } from './emailMobileSVG.svg'

import styles from './HowMuchLosingSection.module.scss'

export default function HowMuchLosingSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.imageSectionMobile}>
          <EmailMobileSVG className={styles.heroImage} />
        </section>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>How Much Are You Losing From Account Sharing?</h1>
          <p className={styles.description}>
            Subscription sharing costs businesses over 9.1 billion a year. It is impossible to measure the cost to your
            business without accurate detection.
          </p>
          <p className={styles.description}>
            Assess the extent of account sharing for your website by booking a call with our sales team. We will work
            with your team to set up a trial of FingerprintJS Account Sharing Prevention and help to estimate the impact
            on your business.
          </p>
        </section>
        <section className={styles.imageSection}>
          <EmailSVG className={styles.heroImage} />
        </section>
      </Container>
    </Section>
  )
}
