import React from 'react'
import FpjsWidget from '../FpjsWidget'
import Container from '../common/Container'
import Section from '../common/Section'
import YoutubeEmbed from '../YoutubeVideo/YoutubeVideo'

import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  return (
    <Section className={styles.liveDemo}>
      <Container size='large' className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>Getting Started With FingerprintJS Pro</h2>
          <YoutubeEmbed embedId='jWX9P5_jZn8' iframeTitle='Tutorial Video' />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>Technical Demo</h2>
          <FpjsWidget />
        </div>
      </Container>
    </Section>
  )
}
