import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as ArrowSVG } from './ArrowSVG.svg'

import classNames from 'classnames'
import styles from './PressReleasesSection.module.scss'

export default function PressReleasesSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.heroContainer} size='large'>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>Press and Brand Resources</h1>
        </div>
      </Container>
      <div className={styles.backgroundLayer} />
      <Container className={styles.pressContainer} size='large'>
        <h2 className={styles.pressTitle}>Press Releases</h2>
        <div className={styles.pressCards}>
          <Card
            title='Fingerprint Achieves SOC 2 Type II Certification'
            company='BusinessWire'
            hrefUrl='https://www.businesswire.com/news/home/20221108005314/en/Fingerprint-Achieves-SOC-2-Type-II-Certification'
            box
          />
          <Card
            title='FingerprintJS raises $8 million to expand its enterprise identification API'
            company='VentureBeat'
            hrefUrl='https://venturebeat.com/business/fingerprintjs-raises-8-million-to-expand-its-enterprise-identification-api/'
            box
          />
          <Card
            title='Commercializing the open-source FingerprintJS browser fingerprinting tech nabs Chicago entrepreneur $4M'
            company='TechCrunch'
            hrefUrl='https://techcrunch.com/2020/10/13/commercializing-the-open-source-fingerprintjs-browser-fingerprinting-tech-nabs-chicago-entrepreneur-4m/'
            box
          />
          <Card
            title='FingerprintJS Raises $32M to Empower Developers to Combat Online Fraud'
            company='PRNewswire'
            hrefUrl='https://www.prnewswire.com/news-releases/fingerprintjs-raises-32m-to-empower-developers-to-combat-online-fraud-301415570.html'
            box
          />
        </div>
        <h2 className={styles.newsTitle}>In the News</h2>
        <div className={styles.newsCards}>
          <Card
            title='Safari 15 bug leaks your iPhone and Mac browsing activity as you work'
            company='MacWorld'
            hrefUrl='https://www.macworld.com/article/605562/safari-15-bug-expose-browsing-activity-personal-data.html'
          />
          <Card
            title='The Quiet Way Advertisers Are Tracking Your Browsing'
            company='WIRED'
            hrefUrl='https://www.wired.com/story/browser-fingerprinting-tracking-explained/'
          />
          <Card
            title="'Scheme Flooding' Allows Websites to Track Users Across Browsers"
            company='ThreatPost'
            hrefUrl='https://threatpost.com/scheme-flooding-website-tracking/166185/'
          />
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  title: string
  company: string
  hrefUrl: string
  box?: boolean
}
function Card({ title, company, hrefUrl, box }: CardProps) {
  return (
    <div className={classNames(styles.card, { [styles.box]: box })}>
      <hgroup>
        <h6 className={styles.cardTitle}>{title}</h6>
        <p className={styles.company}>{company}</p>
      </hgroup>
      <a target='_blank' rel='noreferrer' className={styles.link} href={hrefUrl}>
        <span>Read Article</span>
        <ArrowSVG className={styles.arrow} />
      </a>
    </div>
  )
}
