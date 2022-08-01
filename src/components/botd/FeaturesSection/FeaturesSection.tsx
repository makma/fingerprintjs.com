import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as BrowserSVG } from './BrowserSVG.svg'
import { ReactComponent as AutomationSVG } from './AutomationSVG.svg'
import { ReactComponent as SearchSVG } from './SearchSVG.svg'
import { ReactComponent as VmSVG } from './VmSVG.svg'

import styles from './FeaturesSection.module.scss'

export default function FeaturesSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.titleContainer}>
        <h2 className={styles.title}>Use BotD to detect:</h2>
      </Container>
      <Container size='large' className={styles.cardsContainer}>
        <Card
          icon={<BrowserSVG />}
          title='Browser spoofing'
          description='Identify users spoofing their hardware signals, browser features or user-agent to collect better data, improve AB testing outcomes, and pinpoint potential threats.'
        />
        <Card
          icon={<AutomationSVG />}
          title='Automation tools'
          description='Detect automatic access of your site by commonly used technologies like selenium, puppeteer, playwright, and more.'
        />
        <Card
          icon={<SearchSVG />}
          title='Search bots'
          description='Identify search bots so you can let them crawl your web app unhindered, keeping your SEO rankings high across Google, Bing, Yahoo, Yandex and more.'
        />
        <Card
          icon={<VmSVG />}
          title='Virtual machines'
          description='Identify the software being used to access your web app via a virtual machine, including VMware, Parallels, VirtualBox and more.'
        />
      </Container>
    </Section>
  )
}

interface CardProps {
  icon: React.ReactNode
  title: string
  description: string
}
function Card({ icon, title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconWrapper}>
        <span className={styles.cardIcon}>{icon}</span>
      </div>
      <h1 className={styles.cardTitle}>{title}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
