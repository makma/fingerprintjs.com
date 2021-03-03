import React from 'react'
import FpjsWidget from '../FpjsWidget'
import Container from '../common/Container'
import Section from '../common/Section'
import YoutubeEmbed from '../YoutubeEmbed/YoutubeEmbed'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'

import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  const { mainBackground } = useMainBackgroundImage()
  return (
    <Section className={styles.liveDemo} backgroundImageFluid={mainBackground}>
      <Container size='large' className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Installing FingerprintJS Pro</h2>
          <YoutubeEmbed embedId='jWX9P5_jZn8' />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Technical Demo</h2>
          <FpjsWidget />
        </div>
      </Container>
    </Section>
  )
}
