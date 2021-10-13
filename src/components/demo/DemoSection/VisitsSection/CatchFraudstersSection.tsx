import React, { useEffect, useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'

import { StaticImage } from 'gatsby-plugin-image'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

import { ReactComponent as DotsSVG } from './DotsSVG.svg'
import { ReactComponent as IncognitoIconSVG } from './IncognitoIconSVG.svg'

import styles from './VisitsSection.module.scss'

export default function CatchFraudstersSection() {
  interface SVGElement extends Element {
    beginElement(): SVGElement
  }

  const ref = useRef<SVGSVGElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (isVisible) {
      const beginElement = document.querySelector<SVGElement>(`:scope [begin="indefinite"]`)
      beginElement?.beginElement()
    }
  }, [isVisible])

  return (
    <Section className={styles.catchFraudstersSection}>
      <Container className={styles.containerFraudsters} size='large'>
        <section className={classNames(styles.cardSection, { [styles.visible]: isVisible })}>
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
        <section className={styles.chartSection}>
          <DotsSVG ref={ref} className={styles.dotsImage} />
          <VisitCard isVisible={isVisible} incognito mail='fraud@yourmail.com' />
          <VisitCard isVisible={isVisible} incognito mail='8fraud@yourmail.com' />
          <VisitCard isVisible={isVisible} mail='fraud123@yourmail.com' />
        </section>
      </Container>
    </Section>
  )
}

interface VisitCardProps {
  incognito?: boolean
  mail: string
  isVisible: boolean
}
export function VisitCard({ incognito, mail, isVisible }: VisitCardProps) {
  return (
    <div className={classNames(styles.card, { [styles.visible]: isVisible })}>
      <p className={styles.visitorId}>QyDG8Zmc3tIKmfzHg00e</p>

      {incognito ? (
        <div className={styles.incognitoSection}>
          <IncognitoIconSVG className={styles.icon} />
          <span className={styles.isIncognito}>Incognito mode</span>
        </div>
      ) : (
        <span className={styles.isIncognito}>Normal mode</span>
      )}
      <p className={styles.isIncognito}>{mail}</p>
    </div>
  )
}
