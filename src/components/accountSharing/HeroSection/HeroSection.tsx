import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { PATH } from '../../../constants/content'

import { ReactComponent as HeroSVG } from './heroSVG.svg'
import { ReactComponent as HeroMobileSVG } from './HeroMobileSVG.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.imageSectionMobile}>
          <HeroMobileSVG className={styles.heroImage} />
        </section>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>ACCOUNT SHARING PREVENTION</h1>
          <h2 className={styles.subtitle}>
            Unlock subscription
            <br />
            revenue from your
            <br />
            existing users
          </h2>
          <p className={styles.description}>
            Easily detect account sharing users and convert them into happy customers while keeping customer
            satisfaction high
          </p>
          <div className={styles.buttonsSection}>
            <Button href={PATH.contactSales} variant='orangeGradient' size='big' className={styles.button}>
              Talk to Sales
            </Button>
            <Button
              href={`${PATH.demoUrl}#get-demo`}
              variant='orangeGradientOutline'
              size='big'
              className={styles.button}
            >
              Get Custom Demo
            </Button>
          </div>
        </section>
        <section className={styles.imageSection}>
          <HeroSVG className={styles.heroImage} />
        </section>
      </Container>
    </Section>
  )
}
