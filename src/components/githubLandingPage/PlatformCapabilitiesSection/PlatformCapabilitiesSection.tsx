import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './PlatformCapabilitiesSection.module.scss'

import { ReactComponent as WebSVG } from './WebSVG.svg'
import { ReactComponent as WebhooksSVG } from './WebhooksSVG.svg'
import { ReactComponent as ServerSideSVG } from './ServerSideSVG.svg'

import Button from '../../common/Button'
import { URL } from '../../../constants/content'

import { useInView } from 'framer-motion'
import classNames from 'classnames'

export default function PlatformCapabilitiesSection() {
  const ref = useRef(null)
  const refBottom = useRef(null)

  const isInView = useInView(ref, { once: true })
  const isInViewBottom = useInView(refBottom, { once: true })

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <span className={styles.labelWrapper}>
          <span className={styles.label}>features</span>
        </span>
        <div className={styles.cardsWrapper}>
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
        </div>
        <div className={styles.cardsWrapper}>
          <h2 className={styles.title}>Easy to Install</h2>
          <div
            ref={refBottom}
            className={classNames(styles.cards, {
              [styles.visible]: isInViewBottom,
            })}
          >
            <StepCard step={1} title='Signup For Free' description='Get started for free and generate your API keys.' />
            <StepCard
              step={2}
              title='Install JS agent'
              description='Install the JavaScript agent and then add the code snippet to pages.'
            />
            <StepCard
              step={3}
              title='Create a subdomain'
              description='Use your own domain with Fingerprint Pro to improve accuracy.'
            />
          </div>
          <Button
            className={classNames(styles.button, {
              [styles.visibleButton]: isInViewBottom,
            })}
            variant='whiteOutline'
            size='big'
            href={URL.signupUrl}
            openNewTab
          >
            Get Started
          </Button>
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

interface StepCardProp {
  step: number
  title: string
  description: string
}
function StepCard({ step, title, description }: StepCardProp) {
  return (
    <div className={styles.cardStep}>
      <div className={styles.stepCard}>
        <span className={styles.step}>Step</span>
        <span className={styles.stepNumber}>{step}</span>
      </div>
      <div>
        <h1 className={styles.cardTitle}>{title}</h1>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  )
}
