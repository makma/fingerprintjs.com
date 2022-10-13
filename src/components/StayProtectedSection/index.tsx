import Container from '../common/Container'
import Section from '../common/Section'
import React from 'react'
import GetStartedForm from '../GetStartedForm'
import styles from './StayProtectedSection.module.scss'
import classNames from 'classnames'

interface StayProtectedSectionProps {
  advertisingVariant?: boolean
}
export default function StayProtectedSection({ advertisingVariant }: StayProtectedSectionProps) {
  return (
    <Section className={styles.stayProtected}>
      <Container>
        <header className={styles.header}>
          <h2 className={styles.title}>
            Stay <strong>protected</strong> and <strong>one step ahead</strong> of malicious users with Fingerprint Pro
          </h2>
          <p className={styles.subtitle}>Starting today is better than starting tomorrow</p>
          <GetStartedForm
            className={classNames(styles.form, { [styles.advertisingForm]: advertisingVariant })}
            advertisingVariant={advertisingVariant}
          />
        </header>
      </Container>
    </Section>
  )
}
