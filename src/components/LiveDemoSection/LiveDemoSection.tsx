import React from 'react'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import Section from '../common/Section'
import FpjsWidget from '../FpjsWidget'

import styles from './LiveDemoSection.module.scss'

export default function LiveDemoSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.root} backgroundImageFluid={mainBackground}>
      <h1 className={styles.header}>Technical Demo</h1>
      <FpjsWidget />
    </Section>
  )
}
