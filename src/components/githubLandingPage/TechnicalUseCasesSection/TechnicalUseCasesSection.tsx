import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'

import styles from './TechnicalUseCasesSection.module.scss'

import { ReactComponent as AccountSVG } from './AccountSVG.svg'
import { ReactComponent as BotSVG } from './BotSVG.svg'
import { ReactComponent as DeviceSVG } from './DeviceSVG.svg'
import { ReactComponent as Arrow } from '../IntegrationsSection/ArrowSVG.svg'

import { USE_CASE_PATH, PATH } from '../../../constants/content'

import { Link } from 'gatsby'

export default function TechnicalUseCasesSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.cards}>
          <Card
            icon={<DeviceSVG />}
            title='Payment Fraud'
            description='Protect your revenue while keeping approval rates high.'
            ctaHref={USE_CASE_PATH.paymentFraud}
          />
          <Card
            icon={<AccountSVG />}
            title='Personalization'
            description='Increase cart sizes, remove checkout friction, and enhance recommendations.'
            ctaHref={USE_CASE_PATH.personalization}
          />
          <Card
            icon={<BotSVG />}
            title='Account Sharing Prevention'
            description='Increase revenue by converting existing users into paying customers.'
            ctaHref={USE_CASE_PATH.accountSharing}
          />
        </div>
        <div className={styles.ctaSection}>
          <h2 className={styles.title}>Technical use cases</h2>
          <p className={styles.description}>
            Fingerprint Pro is used by thousands of developers to prevent fraud and improve user experiences.
          </p>
          <Button variant='orangeGradient' size='big' href={PATH.useCases}>
            All Use Cases
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
  ctaHref: string
}
function Card({ icon, title, description, ctaHref }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
      <Link className={styles.link} to={ctaHref}>
        Explore code examples
        <Arrow className={styles.arrow} />
      </Link>
      <Link className={styles.linkMobile} to={ctaHref}>
        Code Examples
        <Arrow className={styles.arrow} />
      </Link>
    </div>
  )
}
