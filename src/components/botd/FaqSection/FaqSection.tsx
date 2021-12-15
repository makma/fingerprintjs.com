import React from 'react'
import Container from '../../common/Container'
import Collapsible from '../../../components/common/Collapsible'

import styles from './FaqSection.module.scss'

export default function FaqSection() {
  return (
    <Container className={styles.container}>
      <section className={styles.descriptionSection}>
        <h1 className={styles.title}>Protect your website from the harmful effects of bots</h1>
        <p className={styles.description}>
          Bots represent more than 40% of global website traffic and are responsible for the majority of cyberattacks.
          Bot attacks regularly cause data breaches, service outages and orchestrate account takeovers.
        </p>
        <p className={styles.description}>
          It is incredibly easy to spin up a bot farm that will use thousands of VMs to scan for critical information,
          perform XSS attacks and inject crypto-mining scripts, posing an existential risk to small and established
          websites alike.
        </p>
      </section>
      <section className={styles.faqSection}>
        <h3 className={styles.faqTitle}>How bots impact your site:</h3>
        <div>
          <Collapsible plusIcon sections={faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
        </div>
      </section>
    </Container>
  )
}

const faq = [
  {
    question: 'Fraud',
    answer: (
      <p className={styles.faqContent}>
        Malicious actors can easily buy login credentials and credit card numbers on the dark web, and test them on
        unsuspecting websites using bot farms. Identify automated attackers and lock them out before they can hijack
        customer accounts or make fraudulent purchases.
      </p>
    ),
  },
  {
    question: 'Cyberattacks',
    answer: (
      <p className={styles.faqContent}>
        2021 was the worst year on record for infrastructure outages caused by ransomware attacks. Beyond the headlines,
        cyberattackers are not only targeting public-facing websites, but internal portals and dashboards in order to
        hold businesses hostage. These cyberattacks require careful planning and execution, which you can predict by
        using bot monitoring on every web application that your company is using.
      </p>
    ),
  },
  {
    question: 'Fake Reviews',
    answer: (
      <p className={styles.faqContent}>
        Positive online reviews are worth their word count in gold. Stop businesses from generating fake reviews using
        bot networks, and protect the reputation of your online marketplace.
      </p>
    ),
  },
  {
    question: 'Scraping',
    answer: (
      <p className={styles.faqContent}>
        Whether it&apos;s Airbnb listings or airline prices, content scraping is a headache that&apos;s impossible to
        solve by conventional blocking techniques. You need real-time bot protection for content scrambling and data
        poisoning to stay ahead of the scrape.
      </p>
    ),
  },
]
