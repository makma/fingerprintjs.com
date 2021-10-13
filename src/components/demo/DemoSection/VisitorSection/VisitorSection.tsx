import React from 'react'
import Section from '../../../common/Section'
import Container from '../../../common/Container'
import Skeleton from '../../../Skeleton/Skeleton'
import classNames from 'classnames'

import { DOC_URL } from '../../../../constants/content'

import { VisitorResponse } from '../../../../types/visitorResponse'

import styles from './VisitorSection.module.scss'

interface VisitorProps {
  isLoading?: boolean
  currentVisit?: VisitorResponse
  visitorId?: string
}
export default function VisitorSection({ isLoading, currentVisit, visitorId }: VisitorProps) {
  const incognito = currentVisit?.incognito ? true : false
  const loadingCard = (
    <>
      <div className={styles.id}>
        <label className={styles.label}>your ID</label>
        <Skeleton className={styles.idSkeleton} />
      </div>
      <div className={styles.info}>
        <ul className={styles.infoList}>
          <li>
            <label className={styles.label}>IP</label>
            <Skeleton width={144} height={26} />
          </li>
          <li>
            <label className={styles.label}>incognito</label>
            <Skeleton width={83} height={26} />
          </li>
          <li>
            <label className={styles.label}>browser</label>
            <Skeleton width={180} height={52} />
          </li>
        </ul>
      </div>
    </>
  )

  const loadedCard = (
    <>
      <div className={styles.id}>
        <label className={styles.label}>your ID</label>
        <p className={styles.idValue}>{visitorId}</p>
      </div>
      <div className={styles.info}>
        <ul className={styles.infoList}>
          <li>
            <label className={styles.label}>IP</label>
            <p className={styles.infoValue}>{currentVisit?.ip}</p>
          </li>
          <li>
            <label className={styles.label}>incognito</label>
            <p className={styles.infoValue}>{incognito ? 'Yes' : 'No'}</p>
          </li>
          <li>
            <label className={styles.label}>browser</label>
            <p
              className={styles.infoValue}
            >{`${currentVisit?.browserDetails.browserName} on ${currentVisit?.browserDetails.os}`}</p>
          </li>
        </ul>
      </div>
    </>
  )
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>This is your visitorID</h1>
          <p className={styles.description}>
            A unique identifier associated with your specific browser and device. Websites can start collecting
            visitorIDs by installing our JavaScript agent.
          </p>
          <a href={DOC_URL.documentationUrl} className={styles.link} target='_blank' rel='noreferrer'>
            See documentation →
          </a>
        </section>
        <section className={styles.idSection}>
          <div className={classNames(styles.card, { [styles.incognito]: incognito })}>
            {isLoading ? loadingCard : loadedCard}
          </div>
          <footer className={styles.footer}>
            {incognito
              ? 'You are in private browsing. Your visitorID is the same.'
              : 'Try revisiting on VPN or incognito mode. Your visitorID will be the same.'}
          </footer>
        </section>
      </Container>
    </Section>
  )
}
