import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import classNames from 'classnames'
import { CurrentVisitProps } from '../../../../types/currentVisitProps'
import { getVisitTitle } from '../../../../helpers/fpjs-widget'

import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'
import { ReactComponent as CatchSVG } from './CatchSVG.svg'

import styles from './VisitsSection.module.scss'

export default function VisitsSection({ visits, currentVisit }: CurrentVisitProps) {
  return (
    <Section className={styles.root}>
      <Container className={styles.containerVisits} size='large'>
        <section className={styles.visitsSection}>
          <div className={styles.visitsCard}>
            <table className={styles.visitsTable}>
              <tr className={styles.tableHeader}>
                <th>Time of visit</th>
                <th>incognito mode</th>
                <th></th>
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
                      <td></td>
                    </tr>
                  )
                })}
            </table>
          </div>
        </section>
        <section className={styles.cardSection}>
          <Card
            icon={<IncognitoSVG />}
            title='Incognito Mode Detection'
            description='Your VisitorID remains constant even if you revisit the page in incognito mode or turn on a VPN. '
          />
        </section>
      </Container>
      <Container className={styles.containerFraudsters} size='large'>
        <section className={styles.cardSection}>
          <Card
            icon={<CatchSVG />}
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
