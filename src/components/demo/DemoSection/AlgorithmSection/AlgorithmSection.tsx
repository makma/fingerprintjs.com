import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'

import styles from './AlgorithmSection.module.scss'

export default function AlgorithmSection() {
  return (
    <Section className={styles.root}>
      <Container size='small' className={styles.container}>
        <header>
          <h1 className={styles.title}>Advanced identification algorithm</h1>
          <p className={styles.description}>
            Your visitorID is generated using multiple identification techniques, machine learning and probability
            algorithms.
          </p>
        </header>
      </Container>
    </Section>
  )
}
