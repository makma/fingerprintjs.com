import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'

import styles from './BannerSection.module.scss'

import { ReactComponent as ShieldSVG } from './ShieldSVG.svg'

export default function BannerSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.bannerContainer} size='large'>
        <div className={styles.sections}>
          <section className={styles.descriptionSection}>
            <h2 className={styles.title}>Start collecting visitorIDs today</h2>
            <p className={styles.description}>
              Get started for free in 10 minutes - install our Javascript snippet and begin collecting unique
              visitorIDs, geolocation data and more.
            </p>
            <Button variant='white' size='big' href={URL.signupUrl}>
              Get Started
            </Button>
          </section>
          <section className={styles.iconSection}>
            <ShieldSVG className={styles.shield} />
          </section>
        </div>
      </Container>
    </Section>
  )
}
