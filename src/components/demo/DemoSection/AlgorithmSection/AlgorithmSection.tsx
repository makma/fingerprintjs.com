import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { getTimezoneOffset } from '../../../../helpers/date'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'
import Skeleton from '../../../Skeleton/Skeleton'

import { ReactComponent as AdBlockSVG } from './img/AdBlockSVG.svg'
import { ReactComponent as WindowSVG } from './img/WindowSVG.svg'
import { ReactComponent as PlanetSVG } from './img/PlanetSVG.svg'
import { ReactComponent as MobileSVG } from './img/MobileSVG.svg'
import { ReactComponent as TLSSVG } from './img/TLSSVG.svg'
import { ReactComponent as PointerSVG } from './img/PointerSVG.svg'
import { ReactComponent as IncognitoSVG } from './img/IncognitoSVG.svg'
import { ReactComponent as PointSVG } from './img/PointSVG.svg'
import { ReactComponent as VisitorSVG } from './img/VisitorSVG.svg'

import styles from './AlgorithmSection.module.scss'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'

export default function AlgorithmSection({ visits, currentVisit, visitorId }: CurrentVisitProps) {
  const offset = getTimezoneOffset()
  const width = window.screen.width
  const height = window.screen.height

  return (
    <Section className={styles.root}>
      <Header />
      <Container size='large' className={styles.algorithmContainer}>
        <section className={styles.browserSignalsTitle}>Browser fingerprinting details</section>
        <section className={styles.browserSignals}>
          <Card icon={<AdBlockSVG />} title={`Incognito mode ${currentVisit?.incognito ? 'Yes' : 'No'}`} />
          <Card
            icon={<PlanetSVG />}
            title={`${currentVisit?.ipLocation?.country?.code}, ${currentVisit?.ipLocation?.city?.name} GTM ${offset}`}
          />
          <Card icon={<WindowSVG />} title={`resolution ${width}x${height}`} />
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
            <Visit current title='Current visit' />
            <Visit incognito={visits[1].incognito} title={getVisitTitle(visits[1].timestamp)} />
            <Visit incognito={visits[2].incognito} title={getVisitTitle(visits[2].timestamp)} />
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
        <section className={styles.mobileRows}>
          <div className={styles.mobileRowsSVG} />
        </section>
        <section className={styles.visitorMobileRow}>
          <div className={styles.visitorMobileRowSVG} />
        </section>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title?: string
  variant?: 'outline' | 'visitor'
  isLoading?: boolean
}
function Card({ icon, title, variant, isLoading }: CardProps) {
  return (
    <div
      className={classNames(
        styles.card,
        { [styles.outline]: variant === 'outline' },
        { [styles.visitCard]: variant === 'visitor' }
      )}
    >
      <span className={styles.icon}>{icon}</span>
      {isLoading ? <Skeleton className={styles.skeleton} width={150} height={20} /> : <h3 className={styles.cardTitle}>{title}</h3>}
    </div>
  )
}

interface visitProps {
  current?: boolean
  incognito?: boolean
  title?: string
  isLoading?: boolean
}
function Visit({ current, incognito, title, isLoading }: visitProps) {
  return (
    <div className={classNames(styles.visit)}>
      {!current ? (
        incognito ? (
          <span className={styles.visitIcon}>
            <IncognitoSVG />
          </span>
        ) : (
          <span />
        )
      ) : (
        <span className={styles.visitIcon}>
          <PointSVG />
        </span>
      )}
      {isLoading ? <Skeleton width={100} height={14} /> : <h3 className={styles.visitTitle}>{title}</h3>}
    </div>
  )
}

function Header() {
  return (
    <Container size='small' className={styles.headerContainer}>
      <header>
        <h1 className={styles.title}>Advanced identification algorithm</h1>
        <p className={styles.description}>
          Your visitorID is generated using multiple identification techniques, machine learning and probability
          algorithms.
        </p>
      </header>
    </Container>
  )
}

export function AlgorithmSectionLoading() {
  return (
    <Section className={styles.root}>
      <Header />
      <Container size='large' className={styles.algorithmContainer}>
        <section className={styles.browserSignalsTitle}>Browser fingerprinting details</section>
        <section className={styles.browserSignals}>
          <Card icon={<AdBlockSVG />} isLoading />
          <Card icon={<PlanetSVG />} isLoading />
          <Card icon={<WindowSVG />} isLoading />
          <Card icon={<MobileSVG />} isLoading />
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
            <Visit current title='Current visit' />
            <Visit isLoading />
            <Visit isLoading />
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
          <Card variant='visitor' icon={<VisitorSVG />} isLoading />
        </section>
        <section className={styles.mobileRows}>
          <div className={styles.mobileRowsSVG} />
        </section>
        <section className={styles.visitorMobileRow}>
          <div className={styles.visitorMobileRowSVG} />
        </section>
      </Container>
    </Section>
  )
}
