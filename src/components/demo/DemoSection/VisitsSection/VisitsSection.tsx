import React, { useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { VisitorResponse } from '../../../../types/visitorResponse'

import { StaticImage } from 'gatsby-plugin-image'
import Visits from './Visits/Visits'

import styles from './VisitsSection.module.scss'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

interface VisitsSectionProps {
  isLoading?: boolean
  currentVisit?: VisitorResponse
  visits?: VisitorResponse[]
}
export default function VisitsSection({ isLoading, currentVisit, visits }: VisitsSectionProps) {
  const ref = useRef<HTMLElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  return (
    <Section className={styles.visitSection}>
      <Container className={styles.containerVisits} size='large'>
        <Visits isLoading={isLoading} currentVisit={currentVisit} visits={visits} isVisible={isVisible} />
        <section ref={ref} className={classNames(styles.cardSection, { [styles.visible]: isVisible })}>
          <Card
            icon={<StaticImage src='../../../../img/IncognitoLayers.png' alt='Incognito Card' />}
            title='Incognito Mode Detection'
            description='Your VisitorID remains constant even if you revisit the page in incognito mode or turn on a VPN. '
          />
        </section>
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
