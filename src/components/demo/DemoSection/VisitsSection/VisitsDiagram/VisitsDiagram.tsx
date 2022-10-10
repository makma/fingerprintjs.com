import React, { useEffect, useRef } from 'react'

import classNames from 'classnames'

import useIntersectionObserver from '../../../../../hooks/useIntersectionObserver'

import { ReactComponent as DotsSVG } from '../DotsSVG.svg'
import { ReactComponent as IncognitoIconSVG } from '../IncognitoIconSVG.svg'

import styles from '../VisitsSection.module.scss'

export default function VisitsDiagram() {
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
    <section className={styles.chartSection}>
      <DotsSVG ref={ref} className={styles.dotsImage} />
      <VisitCard isVisible={isVisible} incognito mail='fraud@yourmail.com' />
      <VisitCard isVisible={isVisible} incognito mail='8fraud@yourmail.com' />
      <VisitCard isVisible={isVisible} mail='fraud123@yourmail.com' />
    </section>
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
