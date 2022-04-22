import React, { useRef } from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { getTimezoneOffset } from '../../../../helpers/date'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'
import Skeleton from '../../../Skeleton/Skeleton'
import { VisitorResponse } from '../../../../types/visitorResponse'
import { isBrowser } from '../../../../helpers/detector'

import { ReactComponent as IncognitoCardSVG } from './img/IncognitoCardSVG.svg'
import { ReactComponent as WindowSVG } from './img/WindowSVG.svg'
import { ReactComponent as PlanetSVG } from './img/PlanetSVG.svg'
import { ReactComponent as MobileSVG } from './img/MobileSVG.svg'
import { ReactComponent as TLSSVG } from './img/TLSSVG.svg'
import { ReactComponent as PointerSVG } from './img/PointerSVG.svg'
import { ReactComponent as IncognitoSVG } from './img/IncognitoSVG.svg'
import { ReactComponent as PointSVG } from './img/PointSVG.svg'
import { ReactComponent as VisitorSVG } from './img/VisitorSVG.svg'

import styles from './AlgorithmSection.module.scss'
import useIntersectionObserver from '../../../../hooks/useIntersectionObserver'

interface AlgorithmSectionProps {
  isVisitDetailsLoading?: boolean
  isVisitHistoryLoading?: boolean
  currentVisit?: VisitorResponse
  visits?: VisitorResponse[]
  visitorId?: string
}

export default function AlgorithmSection({
  isVisitDetailsLoading,
  isVisitHistoryLoading,
  visits,
  currentVisit,
  visitorId,
}: AlgorithmSectionProps) {
  const offset = getTimezoneOffset()
  const width = isBrowser() ? window.screen.width : ''
  const height = isBrowser() ? window.screen.height : ''

  const ref = useRef<HTMLHeadingElement | null>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  return (
    <Section className={styles.root}>
      <Header />
      <Container size='large' className={styles.algorithmContainer}>
        <h2 className={classNames(styles.browserSignalsTitle, { [styles.visible]: isVisible })}>
          Browser fingerprinting details
        </h2>
        <section ref={ref} className={classNames(styles.browserSignals, { [styles.visible]: isVisible })}>
          {isVisitDetailsLoading ? (
            <>
              <Card icon={<IncognitoCardSVG />} isLoading />
              <Card icon={<PlanetSVG />} isLoading />
              <Card icon={<WindowSVG />} isLoading />
              <Card icon={<MobileSVG />} isLoading />
            </>
          ) : (
            <>
              <Card icon={<IncognitoCardSVG />} title={`Incognito: ${currentVisit?.incognito ? 'Yes' : 'No'}`} />
              <Card
                icon={<PlanetSVG />}
                title={`${currentVisit?.ipLocation?.country?.code}, ${currentVisit?.ipLocation?.city?.name} GTM ${offset}`}
              />
              <Card icon={<WindowSVG />} title={`resolution ${width}x${height}`} />
              <Card icon={<MobileSVG />} title={currentVisit?.browserDetails?.os} />
            </>
          )}
        </section>
        <div className={classNames(styles.browserRows, { [styles.visible]: isVisible })}>
          <div className={styles.browserRowsSVG} />
        </div>
        <h2 className={classNames(styles.otherSignalsTitle, { [styles.visible]: isVisible })}>Other identifiers</h2>
        <section className={classNames(styles.otherSignals, { [styles.visible]: isVisible })}>
          <Card variant='outline' icon={<TLSSVG />} title='TLS' />
          <Card variant='outline' icon={<PointerSVG />} title='Cookies' />
        </section>
        <div className={classNames(styles.otherRows, { [styles.visible]: isVisible })}>
          <div className={styles.otherRowsSVG} />
        </div>
        <h2 className={classNames(styles.visitHistoryTitle, { [styles.visible]: isVisible })}>visit History</h2>
        <section className={classNames(styles.visitHistory, { [styles.visible]: isVisible })}>
          <div className={styles.visitSection}>
            <Visit current title='Current visit' />
            {isVisitHistoryLoading ? (
              <>
                <Visit isLoading />
                <Visit isLoading />
              </>
            ) : (
              visits &&
              visits.slice(1, 3).map((visit, index) => {
                return <Visit key={index} incognito={visit.incognito} title={getVisitTitle(visit.timestamp)} />
              })
            )}
          </div>
        </section>
        <div className={classNames(styles.historyRows, { [styles.visible]: isVisible })}>
          <div className={styles.historyRowsSVG} />
        </div>
        <section className={classNames(styles.server, { [styles.visible]: isVisible })}>
          <div className={classNames(styles.serverSection, { [styles.visible]: isVisible })}>
            <h2 className={styles.serverTitle}>Server</h2>
          </div>
        </section>
        <div className={classNames(styles.visitorRow, { [styles.visible]: isVisible })}>
          <div className={styles.visitorRowSVG} />
        </div>
        <h2 className={classNames(styles.visitorIdTitle, { [styles.visible]: isVisible })}>Your visitor Id</h2>
        <section className={classNames(styles.visitorId, { [styles.visible]: isVisible })}>
          {isVisitDetailsLoading ? (
            <Card variant='visitor' icon={<VisitorSVG />} isLoading isVisible={isVisible} />
          ) : (
            <Card variant='visitor' icon={<VisitorSVG />} title={visitorId} isVisible={isVisible} />
          )}
        </section>
        <aside className={classNames(styles.mobileRows, { [styles.visible]: isVisible })}>
          <div className={styles.mobileRowsSVG} />
        </aside>
        <div className={classNames(styles.visitorMobileRow, { [styles.visible]: isVisible })}>
          <div className={styles.visitorMobileRowSVG} />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title?: string
  variant?: 'outline' | 'visitor'
  isLoading?: boolean
  isVisible?: boolean
}
function Card({ icon, title, variant, isLoading, isVisible }: CardProps) {
  return (
    <div
      className={classNames(
        styles.card,
        { [styles.outline]: variant === 'outline' },
        { [styles.visitCard]: variant === 'visitor' },
        { [styles.isVisible]: isVisible }
      )}
    >
      <span className={styles.icon}>{icon}</span>
      {isLoading ? (
        <Skeleton
          className={classNames(styles.cardSkeleton, { [styles.visitSkeleton]: variant === 'visitor' })}
          width={150}
          height={20}
        />
      ) : (
        <h3 className={classNames(styles.cardTitle, { [styles.visitTitle]: variant === 'visitor' })}>{title}</h3>
      )}
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
      {isLoading ? <Skeleton width={100} height={19} /> : <h3 className={styles.visitTitle}>{title}</h3>}
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
