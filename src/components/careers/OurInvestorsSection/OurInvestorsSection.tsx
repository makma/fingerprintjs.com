import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as CraftSVG } from './logos/CraftSVG.svg'
import { ReactComponent as UncorrelatedSVG } from './logos/UncorrelatedSVG.svg'
import { ReactComponent as NexusSVG } from './logos/NexusSVG.svg'

import styles from './OurInvestorsSection.module.scss'

export default function OurInvestorsSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <div className={styles.label}>
          <p className={styles.labelText}>
            $44M
            <br />
            raised
          </p>
        </div>
        <h2 className={styles.title}>Our Investors</h2>
        <p className={styles.description}>
          We have raised $44M and are backed by Craft Ventures (previously invested in Tesla, Facebook, Airbnb), Nexus
          Venture Partners (previously invested in Postman, Hasura) and Uncorrelated Ventures (previously invested in
          Redis, Rollbar & Gradle).
        </p>
        <div className={styles.logos}>
          <span className={styles.logo}>
            <CraftSVG className={styles.craft} />
          </span>
          <span className={styles.logo}>
            <UncorrelatedSVG className={styles.uncorrelated} />
          </span>
          <span className={styles.logo}>
            <NexusSVG className={styles.nexus} />
          </span>
        </div>
      </Container>
    </Section>
  )
}
