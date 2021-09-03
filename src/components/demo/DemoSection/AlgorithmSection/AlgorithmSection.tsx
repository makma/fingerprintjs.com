import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { getTimezoneOffset } from '../../../../helpers/date'

import { ReactComponent as AdBlockSVG } from './AdBlockSVG.svg'
import { ReactComponent as WindowSVG } from './WindowSVG.svg'
import { ReactComponent as PlanetSVG } from './PlanetSVG.svg'
import { ReactComponent as MobileSVG } from './MobileSVG.svg'
import { ReactComponent as TLSSVG } from './TLSSVG.svg'
import { ReactComponent as PointerSVG } from './PointerSVG.svg'
import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'
import { ReactComponent as PointSVG } from './PointSVG.svg'
import { ReactComponent as VisitorSVG } from './VisitorSVG.svg'

import styles from './AlgorithmSection.module.scss'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'

export default function AlgorithmSection({ currentVisit, visitorId }: CurrentVisitProps) {
  const offset = getTimezoneOffset()
  const documentHeight = document.documentElement.clientHeight
  const documentWidth = document.documentElement.clientWidth

  return (
    <Section className={styles.root}>
      <Container size='small' className={styles.headerContainer}>
        <header>
          <h1 className={styles.title}>Advanced identification algorithm</h1>
          <p className={styles.description}>
            Your visitorID is generated using multiple identification techniques, machine learning and probability
            algorithms.
          </p>
        </header>
      </Container>
      <Container size='large' className={styles.algorithmContainer}>
        <section className={styles.browserSignalsTitle}>Browser fingerprinting details</section>
        <section className={styles.browserSignals}>
          <Card icon={<AdBlockSVG />} title='ad block on' />
          <Card
            icon={<PlanetSVG />}
            title={`${currentVisit?.ipLocation?.country?.code}, ${currentVisit?.ipLocation?.city?.name} GTM ${offset}`}
          />
          <Card icon={<WindowSVG />} title={`resolution ${documentWidth}x${documentHeight}`} />
          <Card icon={<MobileSVG />} title={currentVisit?.browserDetails?.os} />
        </section>
        <section className={styles.browserRows}>
          <div className={styles.browserRowsSVG} />
        </section>
        <section className={styles.otherSignalsTitle}>Other identifiers</section>
        <section className={styles.otherSignals}>
          <Card variant='outline' icon={<TLSSVG />} title='TLS' />
          <Card variant='outline' icon={<PointerSVG />} title='Cookies' />
        </section>
        <section className={styles.otherRows}>
          <div className={styles.otherRowsSVG} />
        </section>
        <section className={styles.visitHistoryTitle}>visit History</section>
        <section className={styles.visitHistory}>
          <div className={styles.visitSection}>
            <Visit icon={<PointSVG />} title='Current visit' />
            <Visit title='8 hours ago' />
            <Visit icon={<IncognitoSVG />} title='5 hours ago' />
          </div>
        </section>
        <section className={styles.server}>
          <div className={styles.serverSection}>
            <p className={styles.serverTitle}>Server</p>
          </div>
        </section>
        <section className={styles.visitorRow}>
          <div className={styles.visitorRowSVG} />
        </section>
        <section className={styles.visitorIdTitle}>Your visitor Id</section>
        <section className={styles.visitorId}>
          <Card variant='visitor' icon={<VisitorSVG />} title={visitorId} />
        </section>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title?: string
  variant?: 'outline' | 'visitor'
}
function Card({ icon, title, variant }: CardProps) {
  return (
    <div
      className={classNames(
        styles.card,
        { [styles.outline]: variant === 'outline' },
        { [styles.visitCard]: variant === 'visitor' }
      )}
    >
      <span className={styles.icon}>{icon}</span>
      <h3 className={styles.cardTitle}>{title}</h3>
    </div>
  )
}

interface visitProps {
  icon?: React.ReactNode
  title: string
}
function Visit({ icon, title }: visitProps) {
  return (
    <div className={classNames(styles.visit)}>
      <span className={styles.visitIcon}>{icon}</span>
      <h3 className={styles.visitTitle}>{title}</h3>
    </div>
  )
}
