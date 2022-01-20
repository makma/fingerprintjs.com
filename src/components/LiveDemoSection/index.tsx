import React from 'react'
import FpjsWidget from '../FpjsWidget'
import GetStartedForm from '../GetStartedForm'
import Container from '../common/Container'
import Section from '../common/Section'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import { ReactComponent as InfoSvg } from '../../img/info.svg'
import Tippy from '@tippyjs/react'

import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section
      className={styles.liveSection}
      backgroundImage={mainBackground}
      cssBackgroundPosition='35vw 40%'
      cssBackgroundRepeat='no-repeat'
      cssBackgroundSize='1400px auto'
    >
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>The highest accuracy device identification for mobile and web</h1>
          <p className={styles.description}>
            Stop fraud, spam, and account takeover with
            <em>
              {' '}
              99.5% accurate
              <Tippy content='Leading device identification competitors offer 40-60% accuracy.'>
                <InfoSvg tabIndex={0} />
              </Tippy>{' '}
            </em>
            device fingerprinting as a service.
          </p>
          <GetStartedForm className={styles.form} />
        </header>
        <div className={styles.content}>
          <FpjsWidget />
        </div>
      </Container>
    </Section>
  )
}
