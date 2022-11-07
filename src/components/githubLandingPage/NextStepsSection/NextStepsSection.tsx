import React, { useRef } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL, DOC_URL } from '../../../constants/content'

import styles from './NextStepsSection.module.scss'

import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'

import { useInView, motion } from 'framer-motion'

export default function NextStepsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <h2 ref={ref} className={styles.title}>
          Next Steps with Fingerprint Pro
        </h2>

        <motion.div animate={isInView ? 'open' : 'closed'} className={styles.wrapper}>
          <div className={styles.cards}>
            <Card
              number={1}
              title='New to Fingerprint?'
              description='Set up your free Fingerprint Pro account No credit card needed.'
              hrefText='Create account now'
              hrefLink={URL.signupUrl}
              transitionDelay={2}
            />
            <Card
              number={2}
              title='Migrate from OSS'
              description='Learn how to upgrade your code to use Pro instead of Open Source in 30 seconds.'
              hrefText='View documentation'
              hrefLink={DOC_URL.migrateUrl}
              transitionDelay={6}
            />
            <Card
              number={3}
              title='Join our Discord'
              description='Connect with other Fingerprint users to learn how to solve your use case, get notifications and updates, and send us your feedback.'
              hrefText='Join for updates'
              hrefLink={URL.discordServerURL}
              transitionDelay={10}
            />
          </div>
          <div className={styles.progressBar}>
            <span className={styles.barBackground}>
              <motion.div
                className={styles.barProgress}
                variants={{
                  open: {
                    width: '100%',
                    height: '100%',
                  },
                }}
                transition={{ delay: 2, width: { duration: 4 }, height: { duration: 4 } }}
              />
            </span>
            <Circle transitionDelay={6} />
            <span className={styles.barBackground}>
              <motion.div
                className={styles.barProgress}
                variants={{
                  open: {
                    width: '100%',
                    height: '100%',
                  },
                }}
                transition={{ delay: 6, width: { duration: 4 }, height: { duration: 4 } }}
              />
            </span>
            <Circle transitionDelay={10} />
            <span className={styles.barBackground}>
              <motion.div
                className={styles.barProgress}
                variants={{
                  open: {
                    width: '100%',
                    height: '100%',
                  },
                }}
                transition={{ delay: 10, width: { duration: 4 }, height: { duration: 4 } }}
              />
            </span>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
interface CardProps {
  number: number
  title: string
  description: string
  hrefText: string
  hrefLink: string
  transitionDelay: number
}
function Card({ number, title, description, hrefText, hrefLink, transitionDelay }: CardProps) {
  return (
    <div className={styles.card}>
      <motion.span
        variants={{
          open: {
            background: '#FDE9E2',
            color: '#F86E48',
          },
        }}
        transition={{ delay: transitionDelay }}
        className={styles.cardNumber}
      >
        {number}
      </motion.span>
      <motion.h3
        variants={{
          open: {
            color: '#F86E48',
          },
        }}
        transition={{ delay: transitionDelay }}
        className={styles.cardTitle}
      >
        {title}
      </motion.h3>
      <p className={styles.cardDescription}>{description}</p>
      <a href={hrefLink} target='_blank' rel='noreferrer' className={styles.cardLink}>
        {hrefText}
        <ArrowSVG className={styles.arrow} />
      </a>
    </div>
  )
}

interface CircleProps {
  transitionDelay: number
}
function Circle({ transitionDelay }: CircleProps) {
  return (
    <svg width='12' height='13' viewBox='0 0 12 13' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <motion.circle
        cx='6.02985'
        cy='6.26715'
        r='4.80817'
        strokeWidth='2'
        initial={{ stroke: '#E8E8E8' }}
        variants={{
          open: {
            stroke: '#ff7542',
          },
        }}
        transition={{ delay: transitionDelay }}
      />
    </svg>
  )
}
