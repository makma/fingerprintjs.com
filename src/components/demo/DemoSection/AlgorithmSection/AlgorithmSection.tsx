import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import { ReactComponent as AdBlockSVG } from './AdBlockSVG.svg'

import styles from './AlgorithmSection.module.scss'

export default function AlgorithmSection() {
  return (
    <Section className={styles.root}>
      <Container size='small' className={styles.headerContainer}>
        <header>
          <h1 className={styles.title}>Advanced identification algorithm</h1>
          <p className={styles.description}>
            Your visitorID is generated using multiple identification techniques, machine learning and probability
            algorithms.
          </p>
        </header>
      </Container>
      <Container size='large' className={styles.algorithmContainer}>
        <section className={styles.browserSignalsTitle}>Browser fingerprinting details</section>
        <section className={styles.browserSignals}>
          <Card icon={<AdBlockSVG />} title='ad block on' />
          <Card icon={<AdBlockSVG />} title='ad block on' />
          <Card icon={<AdBlockSVG />} title='ad block on' />
          <Card icon={<AdBlockSVG />} title='ad block on' />
        </section>
        <section className={styles.otherSignalsTitle}>Other identifiers</section>
        <section className={styles.otherSignals}></section>
        <section className={styles.visitHistoryTitle}>visit History</section>
        <section className={styles.visitHistory}></section>
        <section className={styles.server}></section>
        <section className={styles.visitorId}></section>
        <section className={styles.visitorIdTitle}>Your visitor Id</section>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
}
function Card({ icon, title }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  )
}
