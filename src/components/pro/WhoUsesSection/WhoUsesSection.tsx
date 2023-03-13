import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import styles from './WhoUsesSection.module.scss'

import { ReactComponent as DropboxSVG } from './DropboxSVG.svg'
import { ReactComponent as TripleWhaleSVG } from './TripleWhaleSVG.svg'
import { ReactComponent as CheckoutSVG } from './CheckoutSVG.svg'

export default function WhoUsesSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Who uses Fingerprint Pro?</h2>
        <div className={styles.cards}>
          <Card
            logo={<DropboxSVG />}
            title='High-scale websites'
            description='Prevent fraud on your signup, login and payment flows where legacy solutions fail.'
            linkHref='https://www.dropbox.com/'
          />
          <Card
            logo={<TripleWhaleSVG />}
            title='Identity, fraud and analytics software'
            description='Improve your product efficacy with high accuracy device IDs.'
            linkHref='https://www.triplewhale.com/'
          />
          <Card
            logo={<CheckoutSVG />}
            title='Expert growth teams'
            description='Better understand logged-out traffic, serve personalized content, and improve attribution.'
            linkHref='https://www.checkout.com/'
          />
        </div>
      </Container>
    </Section>
  )
}
interface CardProps {
  logo: React.ReactNode
  title: string
  description: string
  linkHref: string
}
function Card({ logo, title, description, linkHref }: CardProps) {
  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </div>
      <a href={linkHref} target='_blank' rel='noreferrer' className={styles.logo}>
        {logo}
      </a>
    </div>
  )
}
