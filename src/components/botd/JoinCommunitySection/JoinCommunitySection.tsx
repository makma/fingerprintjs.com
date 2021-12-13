import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'

import { ReactComponent as ChooseAnswerSVG } from './ChooseAnswerSVG.svg'
import { ReactComponent as ChooseAnswerMobileSVG } from './ChooseAnswerMobileSVG.svg'

import styles from './JoinCommunitySection.module.scss'

export default function JoinCommunitySection() {
  return (
    <Section className={styles.root}>
      <section className={styles.imageSectionMobile}>
        <ChooseAnswerMobileSVG />
      </section>
      <Container className={styles.container}>
        <div className={styles.section}>
          <section className={styles.descriptionSection}>
            <h1 className={styles.title}>Join our growing community</h1>
            <p className={styles.description}>
              BotD is an open source project supported by contributing developers across the globe.
            </p>
            <Button href='/case-studies/edtech/' variant='outline' size='big' className={styles.button}>
              Discord
            </Button>
          </section>
          <section className={styles.imageSection}>
            <ChooseAnswerSVG />
          </section>
        </div>
      </Container>
    </Section>
  )
}
