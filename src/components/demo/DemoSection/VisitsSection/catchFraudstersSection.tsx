import React, { useState, useEffect, useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'

import { graphql, useStaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

import { ReactComponent as DotsSVG } from './DotsSVG.svg'
import { ReactComponent as IncognitoIconSVG } from './IncognitoIconSVG.svg'

import styles from './VisitsSection.module.scss'

// The file name should be CatchFraudstersSection but due to a bug in gatsby
// the static query fails if it has the first capital letter.
// TODO: After updating to gatsby 3 we have to test if it is fixed
export default function CatchFraudstersSection() {
  interface SVGElement extends Element {
    beginElement(): SVGElement
  }

  const [hover, setHover] = useState(false)
  const imageData = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "CatchLayers.png" }) {
        childImageSharp {
          fixed(width: 104, height: 104, quality: 100) {
            ...GatsbyImageSharpFixed_withWebp
          }
        }
      }
    }
  `)

  const ref = useRef<SVGSVGElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting
  const beginAnimation = hover || (isVisible && window.screen.width < 640)

  useEffect(() => {
    if (beginAnimation) {
      const beginElement = document.querySelector<SVGElement>(`:scope [begin="indefinite"]`)
      beginElement?.beginElement()
    }
  }, [beginAnimation])

  return (
    <Section className={styles.catchFraudstersSection}>
      <Container className={styles.containerFraudsters} size='large'>
        <section className={styles.cardSection}>
          <div className={styles.card}>
            <span className={styles.icon}>
              <Img alt='Catch Fraudsters Card' fixed={imageData.file.childImageSharp.fixed} />
            </span>
            <h1 className={styles.cardTitle}>Catch fraudsters concealing their identity</h1>
            <p className={styles.cardDescription}>
              VisitorIDs can be used to connect fraud vents across multiple visits.
            </p>
          </div>
        </section>
        <section className={styles.chartSection}>
          <DotsSVG ref={ref} className={styles.dotsImage} onMouseOver={() => setHover(true)} />
          <VisitCard isVisible={beginAnimation} incognito mail='fraud@yourmail.com' />
          <VisitCard isVisible={beginAnimation} incognito mail='8fraud@yourmail.com' />
          <VisitCard isVisible={beginAnimation} mail='fraud123@yourmail.com' />
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
