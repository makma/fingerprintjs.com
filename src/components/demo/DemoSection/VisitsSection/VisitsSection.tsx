import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'
import Skeleton from '../../../Skeleton/Skeleton'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'
import { StaticImage } from 'gatsby-plugin-image'

import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'

import styles from './VisitsSection.module.scss'

export default function VisitsSection({ visits, currentVisit }: CurrentVisitProps) {
  const loadedCard = (
    <section className={styles.visitsSection}>
      <div className={classNames(styles.visitsCard, { [styles.incognitoCard]: currentVisit?.incognito })}>
        <table className={styles.visitsTable}>
          <tr className={styles.tableHeader}>
            <th>Time of visit</th>
            <th>incognito mode</th>
          </tr>
          {visits &&
            visits.slice(0, 6).map(({ requestId, timestamp, incognito }, i) => {
              return (
                <tr
                  className={classNames({ [styles.selected]: currentVisit?.requestId === requestId })}
                  id={`visit_${requestId}`}
                  key={requestId}
                >
                  <td>{i === 0 ? 'Current visit' : getVisitTitle(timestamp)}</td>
                  <td className={classNames({ [styles.incognito]: incognito })}>{incognito ? 'Yes' : 'No'}</td>
                </tr>
              )
            })}
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          {currentVisit?.incognito ? (
            <h3 className={styles.title}>you are in private browsing</h3>
          ) : (
            <>
              <h3 className={styles.title}>Not in private browsing</h3>
              <p className={styles.description}>Try revisiting in incognito mode</p>
            </>
          )}
        </div>
      </div>
    </section>
  )

  return <Content visitsSection={loadedCard} />
}
export function VisitsSectionLoading() {
  const repeatElement = (length, fn) => Array.from({ length }, (_, i) => fn(i))

  const loadingCard = (
    <section className={styles.visitsSection}>
      <div className={styles.visitsCard}>
        <table className={styles.visitsTable}>
          <tr className={styles.tableHeader}>
            <th>Time of visit</th>
            <th>incognito mode</th>
          </tr>
          <tr className={styles.selected}>
            <td>Current visit</td>
            <td>
              <Skeleton className={styles.visitSkeleton} width={24} />
            </td>
          </tr>
          {repeatElement(5, (i) => (
            <tr key={i}>
              <td>
                <Skeleton className={styles.visitSkeleton} width={104} />
              </td>
              <td>
                <Skeleton className={styles.visitSkeleton} width={24} />
              </td>
            </tr>
          ))}
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          <Skeleton width={202} height={20} />
          <Skeleton width={245} height={24} />
        </div>
      </div>
    </section>
  )

  return <Content visitsSection={loadingCard} />
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
interface ContentProps {
  visitsSection: React.ReactNode
}
function Content({ visitsSection }: ContentProps) {
  return (
    <Section className={styles.visitSection}>
      <Container className={styles.containerVisits} size='large'>
        {visitsSection}
        <section className={styles.cardSection}>
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
