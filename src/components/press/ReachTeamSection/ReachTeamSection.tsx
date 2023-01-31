import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as ContactSVG } from './ContactSVG.svg'
import { ReactComponent as BotD } from '../../../img/BotdBowl.svg'
import ContactPressForm from '../../ContactPressForm/ContactPressForm'
import { PATH } from '../../../constants/content'
import styles from './ReachTeamSection.module.scss'

export default function ReachTeamSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <div className={styles.box}>
          <div className={styles.formSection}>
            <h2 className={styles.title}>Reach out to our team</h2>
            <p className={styles.subTitle}>Contact us with any questions or requests. </p>
            <ContactPressForm />
            <div className={styles.poweredBy}>
              <span>
                <BotD className={styles.botD} />
              </span>
              <span>
                Our form spam detection is powered by{' '}
                <a className={styles.link} href={PATH.botD}>
                  BotD.
                </a>
              </span>
            </div>
          </div>
          <div className={styles.imageSection}>
            <ContactSVG />
          </div>
        </div>
      </Container>
    </Section>
  )
}
