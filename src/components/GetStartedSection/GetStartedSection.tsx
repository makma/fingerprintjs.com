import React from 'react'
import { useMainBackgroundImage } from '../../hooks/useBackgroundImage'
import Section from '../common/Section'
import GetStartedForm from '../GetStartedForm'

import styles from './GetStartedSection.module.scss'

export default function LiveDemoSection() {
  const { mainBackground } = useMainBackgroundImage()

  return (
    <Section className={styles.root} backgroundImageFluid={mainBackground}>
      <GetStartedForm className={styles.form} variant='wide' />
    </Section>
  )
}
