import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './PlatformCapabilitiesSection.module.scss'

import { ReactComponent as WebSVG } from './WebSVG.svg'
import { ReactComponent as WebhooksSVG } from './WebhooksSVG.svg'
import { ReactComponent as ServerSideSVG } from './ServerSideSVG.svg'

import { useInView } from 'framer-motion'
import classNames from 'classnames'

export default function PlatformCapabilitiesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <span className={styles.label}>features</span>
        <h2 className={styles.title}>Platform Capabilities</h2>
        <div
          ref={ref}
          className={classNames(styles.cards, {
            [styles.visible]: isInView,
          })}
        >
          <Card
            icon={<WebSVG />}
            title='Web and Mobile Support'
            description='Identify devices in native iOS and Android applications in addition to the browser.'
          />
          <Card
            icon={<WebhooksSVG />}
            title='Webhooks'
            description='Receive instant notifications delivered securely to your backend systems.'
          />
          <Card
            icon={<ServerSideSVG />}
            title='Server-side API'
            description='Integrate into your server-side business rules or signup process.'
          />
        </div>
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
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
