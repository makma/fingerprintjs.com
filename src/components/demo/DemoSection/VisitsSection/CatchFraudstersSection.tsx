import React, { useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'

import { StaticImage } from 'gatsby-plugin-image'
import VisitsDiagram from './VisitsDiagram/VisitsDiagram'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

import styles from './VisitsSection.module.scss'

export default function CatchFraudstersSection() {
  const ref = useRef<HTMLElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  return (
    <Section className={styles.catchFraudstersSection}>
      <Container className={styles.containerFraudsters} size='large'>
        <section ref={ref} className={classNames(styles.cardSection, { [styles.visible]: isVisible })}>
          <div className={styles.card}>
            <span className={styles.icon}>
              <StaticImage src='../../../../img/CatchLayers.png' alt='Catch Fraudsters Card' />
            </span>
            <h1 className={styles.cardTitle}>Catch fraudsters concealing their identity</h1>
            <p className={styles.cardDescription}>
              VisitorIDs can be used to connect fraud events across multiple visits.
            </p>
          </div>
        </section>
        <VisitsDiagram />
      </Container>
    </Section>
  )
}
