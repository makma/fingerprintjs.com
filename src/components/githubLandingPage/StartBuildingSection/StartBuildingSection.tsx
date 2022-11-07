import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'

import { PATH, URL } from '../../../constants/content'
import styles from './StartBuildingSection.module.scss'

import { ReactComponent as MagnifyingSVG } from './MagnifyingSVG.svg'
import { ReactComponent as CalendarSVG } from './CalendarSVG.svg'
import { ReactComponent as PlugSVG } from './PlugSVG.svg'
import { ReactComponent as MoneySVG } from './MoneySVG.svg'

import { useInView } from 'framer-motion'
import classNames from 'classnames'

export default function StartBuildingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref)
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <div
          ref={ref}
          className={classNames(styles.wrapper, {
            [styles.visible]: isInView,
          })}
        >
          <div className={styles.cta}>
            <h2 className={styles.title}>
              Start building <br />
              with Pro for free
            </h2>
            <p className={styles.description}>
              Fingerprint Pro maintains a 99.9% uptime SLA, and has a{' '}
              <a className={styles.link} target='_blank' rel='noreferrer' href={URL.statusUrl}>
                publicly available Status page
              </a>{' '}
              to review at anytime.
            </p>
            <div className={styles.buttonSection}>
              <Button className={styles.button} variant='orangeGradient' size='big' href={PATH.pricingUrl}>
                See Detailed Pricing
              </Button>
              <span className={styles.noCreditCard}>No credit card needed to start.</span>
            </div>
          </div>

          <div className={styles.cards}>
            <Card icon={<MagnifyingSVG />} description='Transparent pricing' />
            <Card icon={<CalendarSVG />} description='Monthly and annual plans' />
            <Card icon={<PlugSVG />} description='Unlimited trial available' />
            <Card icon={<MoneySVG />} description='Money back guarantee' />
          </div>
        </div>
      </Container>
    </Section>
  )
}
interface CardProps {
  icon: React.ReactNode
  description: string
}
function Card({ icon, description }: CardProps) {
  return (
    <div className={styles.card}>
      <span className={styles.icon}>{icon}</span>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
