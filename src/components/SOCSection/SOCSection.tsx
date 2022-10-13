import React from 'react'
import Section from '../common/Section'
import Container from '../common/Container'
import { Link } from 'gatsby'
import { PATH } from '../../constants/content'

import { ReactComponent as StarsSVG } from './StarsSVG.svg'
import { ReactComponent as AICPASVG } from './AICPASVG.svg'
import { ReactComponent as ClockSVG } from './ClockSVG.svg'

import styles from './SOCSection.module.scss'

interface SOCSectionProps {
  advertisingVariant?: boolean
}
export default function SOCSection({ advertisingVariant }: SOCSectionProps) {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h1 className={styles.title}>Security & Compliance</h1>
        <p className={styles.description}>
          We are committed to the highest standards in security and compliance to keep your customers&apos; data safe,
          and your operations running smoothly.
        </p>
        {advertisingVariant && (
          <Link className={styles.link} to={PATH.contactSales}>
            Contact Sales →
          </Link>
        )}
      </Container>
      <Container className={styles.cardsContainer}>
        <Card icon={<StarsSVG />} title='GDPR and CCPA Compliant' />
        <Card icon={<AICPASVG />} title='SOC 2 Type 1 Compliant' />
        <Card icon={<ClockSVG />} title='99.9% Uptime SLA' />
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
    <article className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <footer className={styles.cardTitle}>{title}</footer>
    </article>
  )
}
