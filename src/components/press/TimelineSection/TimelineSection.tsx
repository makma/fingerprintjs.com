import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './TimelineSection.module.scss'

import { ReactComponent as CoinbaseSVG } from './CoinbaseSVG.svg'
import { ReactComponent as DropboxSVG } from './DropboxSVG.svg'
import { ReactComponent as TargetSVG } from './TargetSVG.svg'
import { ReactComponent as YahooSVG } from './YahooSVG.svg'

import { ReactComponent as DotSVG } from './DotSVG.svg'
import { ReactComponent as LastDotSVG } from './LastDotSVG.svg'

export default function TimelineSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <div className={styles.descriptionSection}>
          <h2 className={styles.title}>Backstory and Timeline</h2>
          <p className={styles.description}>
            Fingerprint began as an open-source project called FingerprintJS in 2012. Our CTO/Co-founder, Valentin
            Vasilyev, managed the GitHub browser fingerprinting library until developing it into a SaaS product known as
            FingerprintJS Pro in 2019. Since then, Fingerprint has raised over $40 million in three rounds of funding
            and expanded its product offerings to include bot detection and the world’s most accurate device
            identification.
          </p>
          <p className={styles.description}>
            <strong className={styles.strong}>Our Investors include:</strong> Craft Ventures (previously invested in{' '}
            <a target='_blank' rel='noreferrer' href='https://www.tesla.com/'>
              Tesla,
            </a>{' '}
            <a target='_blank' rel='noreferrer' href='https://facebook.com/'>
              Facebook,
            </a>{' '}
            <a target='_blank' rel='noreferrer' href='https://www.airbnb.com/'>
              Airbnb
            </a>
            ), Nexus VP (previously invested in{' '}
            <a target='_blank' rel='noreferrer' href='https://www.postman.com/'>
              Postman,
            </a>{' '}
            <a target='_blank' rel='noreferrer' href='https://hasura.io/'>
              Hasura
            </a>
            ) and Uncorrelated Ventures (previously invested in{' '}
            <a target='_blank' rel='noreferrer' href='https://redis.io/'>
              Redis,
            </a>{' '}
            <a target='_blank' rel='noreferrer' href='https://rollbar.com/'>
              Rollbar
            </a>{' '}
            &{' '}
            <a target='_blank' rel='noreferrer' href='https://gradle.org/'>
              Gradle
            </a>
            )
          </p>
          <div className={styles.logosSection}>
            <strong className={styles.strong}>Our Customers include:</strong>
            <div className={styles.logos}>
              <CoinbaseSVG className={styles.coinbase} />
              <DropboxSVG className={styles.dropbox} />
              <TargetSVG className={styles.target} />
              <YahooSVG className={styles.yahoo} />
            </div>
          </div>
        </div>
        <div>
          <div className={styles.timelineSection}>
            <span className={styles.year1}>2012</span>
            <Border row={1} />
            <span className={styles.milestone1}>FingerprintJS as an open source project</span>

            <span className={styles.year2}>2019</span>
            <Border row={2} />
            <span className={styles.milestone2}>Our SaaS product launches as FingerprintJS Pro</span>

            <span className={styles.year3}>2020</span>
            <Border row={3} />
            <span className={styles.milestone3}>Dan Pinto (CEO/Co-Founder) joins & $4M Seed Round</span>

            <span className={styles.year4}>2021</span>
            <Border row={4} />
            <span className={styles.milestone4}>$8M Series A funding in February</span>

            <span className={styles.year5}>2021</span>
            <Border row={5} />
            <span className={styles.milestone5}>$32M Series B funding in November</span>

            <span className={styles.year6}>2021</span>
            <Border row={6} lastDot />
            <span className={styles.milestone6}>
              FingerprintJS becomes Fingerprint.
              <br />
              Fingerprint Pro becomes SOC 2 Type II certified.
            </span>
          </div>
        </div>
      </Container>
    </Section>
  )
}

interface BorderProps {
  row: number
  lastDot?: boolean
}
function Border({ row, lastDot }: BorderProps) {
  return (
    <div className={styles.border}>
      <div className={styles.borderWrapper}>
        <div className={styles[`borderLine${row}`]} />
      </div>
      {lastDot ? <LastDotSVG className={styles[`dot${row}`]} /> : <DotSVG className={styles[`dot${row}`]} />}
    </div>
  )
}
