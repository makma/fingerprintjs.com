import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'

import { ReactComponent as ChooseAnswerSVG } from './ChooseAnswerSVG.svg'
import { ReactComponent as ChooseAnswerMobileSVG } from './ChooseAnswerMobileSVG.svg'

import styles from './ReadStudyCaseSection.module.scss'

export default function ReadStudyCaseSection() {
  return (
    <Section className={styles.root}>
      <section className={styles.imageSectionMobile}>
        <ChooseAnswerMobileSVG />
      </section>
      <Container size='large' className={styles.container}>
        <div className={styles.section}>
          <section className={styles.imageSection}>
            <ChooseAnswerSVG />
          </section>
          <section className={styles.descriptionSection}>
            <h1 className={styles.title}>How One Edtech Company Unearthed $4M+ in new revenue</h1>
            <p className={styles.description}>
              Our client was struggling to prevent account sharing despite having a dedicated anti-fraud team
            </p>
            <Button href='/case-studies/edtech/' variant='outline' size='big' className={styles.button}>
              Read the case study
            </Button>
          </section>
        </div>
      </Container>
    </Section>
  )
}
