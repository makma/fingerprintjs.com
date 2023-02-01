import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'
import { ReactComponent as AicpaSVG } from './images/AicpaSVG.svg'
import { ReactComponent as CcpaSVG } from './images/CcpaSVG.svg'
import { ReactComponent as GdprSVG } from './images/GdprSVG.svg'

import styles from './CertificationsSection.module.scss'

export default function CertificationsSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container}>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>Compliance & Certifications</h1>
          <p className={styles.description}>
            We continuously monitor and are up-to-date on all enterprise-grade certifications such as GDPR, CCPA, and
            SOC2 Type II.
          </p>
        </section>
        <section className={styles.imageSection}>
          <Logo icon={<GdprSVG />} title='GDPR Compliant' />
          <Logo icon={<CcpaSVG />} title='CCPA Compliant' />
          <Logo icon={<AicpaSVG />} title='SOC 2 Type II' />
        </section>
      </Container>
    </Section>
  )
}

interface LogoProps {
  icon: React.ReactNode
  title: string
}
function Logo({ icon, title }: LogoProps) {
  return (
    <div className={styles.logo}>
      <span className={styles.logoIcon}>{icon}</span>
      <p className={styles.logoTitle}>{title}</p>
    </div>
  )
}
