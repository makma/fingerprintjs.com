import React from 'react'

import classNames from 'classnames'
import { VisitorResponse } from '../../../../../types/visitorResponse'

import Skeleton from '../../../../Skeleton/Skeleton'
import { getVisitTitle } from '../../../../../helpers/fpjs-widget'
import { repeatElement } from '../../../../../helpers/repeatElement'

import { ReactComponent as IncognitoSVG } from './IncognitoSVG.svg'

import styles from './Visits.module.scss'

interface Visits {
  isLoading?: boolean
  currentVisit?: VisitorResponse
  visits?: VisitorResponse[]
  className?: string
  isVisible?: boolean
}
export default function Visits({ isLoading, currentVisit, visits, className, isVisible = true }: Visits) {
  const loadedCard = (
    <>
      <div className={classNames(styles.visitsCard, { [styles.incognitoCard]: currentVisit?.incognito })}>
        <table className={styles.visitsTable}>
          <tbody>
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
          </tbody>
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
    </>
  )

  const loadingCard = (
    <>
      <div className={styles.visitsCard}>
        <table className={styles.visitsTable}>
          <tbody>
            <tr className={styles.tableHeader}>
              <th>Time of visit</th>
              <th>incognito mode</th>
            </tr>
            <tr className={styles.selected}>
              <td>Current visit</td>
              {currentVisit ? (
                <td className={classNames({ [styles.incognito]: currentVisit.incognito })}>
                  {currentVisit.incognito ? 'Yes' : 'No'}
                </td>
              ) : (
                <td>
                  <Skeleton className={styles.visitSkeleton} width={24} />
                </td>
              )}
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
          </tbody>
        </table>
      </div>
      <div className={styles.incognito}>
        <IncognitoSVG className={styles.icon} />
        <div className={styles.rows}>
          <Skeleton width={202} height={20} />
          <Skeleton width={245} height={24} />
        </div>
      </div>
    </>
  )
  return (
    <section className={classNames(styles.visitsSection, className, { [styles.visible]: isVisible })}>
      {isLoading ? loadingCard : loadedCard}
    </section>
  )
}
