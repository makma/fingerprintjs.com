import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'

import styles from './CardSection.module.scss'

export default function CardSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.cardContainer} size='large'>
        <div className={styles.sections}>
          <section className={styles.descriptionSection}>
            <h2 className={styles.title}>The internet relies on Fingerprint</h2>
          </section>
          <section className={styles.labelsSection}>
            <Card value='6k+' field='companies' />
            <Card value='16%' field='of top 500 sites' />
            <Card value='1.2B+' field='API calls/month' />
          </section>
        </div>
      </Container>
      <div className={styles.backgroundLayer} />
    </Section>
  )
}

interface CardProps {
  value: string
  field: string
}
function Card({ value, field }: CardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.value}>{value}</span>
      <span className={styles.field}>{field}</span>
    </article>
  )
}
