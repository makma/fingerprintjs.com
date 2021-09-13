import React from 'react'
import styles from './GetStartedSection.module.scss'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL } from '../../../constants/content'

import Button from '../../common/Button'

export default function GetStartedSection() {
  const clients = ['checkout', 'yahoo', 'ebay', 'coinbase', 'agoda', 'us-bank', 'booking', 'target']

  return (
    <Section className={styles.root}>
      <Container size='small' className={styles.heroContainer}>
        <h1 className={styles.title}>8% of the top 10,000 websites use FingerprintJS </h1>
        <h2 className={styles.subTitle}>Get Started For Free Today</h2>
        <Button size='big' href={URL.dashboardLoginUrl} className={styles.button}>
          Start 30 Day Free Trial
        </Button>
      </Container>
      <Container size='large' className={styles.clientsContainer}>
        <div className={styles.content}>
          {clients.map((client) => {
            return (
              <img
                key={`image_${client}`}
                alt={`${client} logo`}
                className={styles.logo}
                src={`/img/company-logos/${client}.svg`}
              />
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
