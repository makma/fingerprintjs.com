import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'

import { ReactComponent as IncognitoCardSVG } from './IncognitoCardSVG.svg'
import { ReactComponent as CatchCardSVG } from './CatchCardSVG.svg'
import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'

import styles from './VisitsSection.module.scss'

export default function VisitsSection({ visits, currentVisit }: CurrentVisitProps) {
  return (
    <Section className={styles.root}>
      <Container className={styles.containerVisits} size='large'>
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
        <section className={styles.cardSection}>
          <Card
            icon={<IncognitoCardSVG />}
            title='Incognito Mode Detection'
            description='Your VisitorID remains constant even if you revisit the page in incognito mode or turn on a VPN. '
          />
        </section>
      </Container>
      <Container className={styles.containerFraudsters} size='large'>
        <section className={styles.cardSection}>
          <Card
            icon={<CatchCardSVG />}
            title='Catch fraudsters concealing their identity'
            description='VisitorIDs can be used to associate patterns of fraud across multiple visits.'
          />
        </section>
        <section className={styles.descriptionSection}></section>
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
