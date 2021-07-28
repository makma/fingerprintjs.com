import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as PlaySVG } from './PlaySVG.svg'
import { ReactComponent as ApiWebhooksSVG } from './ApiWebhooksSVG.svg'
import { ReactComponent as DocSVG } from './DocSVG.svg'
import { ReactComponent as TalkSVG } from './TalkSVG.svg'

import styles from './BuiltForEngineersSection.module.scss'

export default function BuiltForEngineersSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h1 className={styles.title}>Built for engineers, by engineers</h1>
        <p className={styles.description}>
          Developer teams can easily incorporate FingerprintJS into existing workflows or build from scratch with our
          highly accessible documentation and support.
        </p>
      </Container>
      <Container size='large' className={styles.cardsContainer}>
        <Card
          icon={<PlaySVG />}
          title='Quick Start'
          description='Our lightweight Javascript agent can be installed in minutes. Create an account for free with no credit card required and start collecting visitorIDs immediately.'
        />
        <Card
          icon={<ApiWebhooksSVG />}
          title='Webhooks'
          description='Receive instant notifications delivered securely to your backend systems, ideal for building scalable and asynchronous processes.'
        />
        <Card
          icon={<DocSVG />}
          title='Documentation'
          description='Extensive guides make it easy for developer teams to get up to speed with FingerprintJS, fast.'
        />
        <Card
          icon={<TalkSVG />}
          title='Support'
          description='Get in touch via chat and email and get technical help within 1 business day.'
        />
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
