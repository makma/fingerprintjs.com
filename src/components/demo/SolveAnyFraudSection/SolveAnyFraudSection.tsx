import React from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import CodeWindow from '../../common/CodeWindow'
import styles from './SolveAnyFraudSection.module.scss'
import { Link } from 'gatsby'

export default function SolveAnyFraudSection() {
  return (
    <Section className={styles.codeApi}>
      <Container size='large' className={styles.container}>
        <section className={styles.content}>
          <CodeWindow
            code={`curl https://api.fpjs.io/visitors/:visitId \\
  -H 'Authorization: Bearer eyJ0eXAiOiJKV1...'`}
          />
          <CodeWindow
            code={`{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "incognito": true,
      "ip": "61.127.217.15",
      "ipLocation": { ... },
      "browserDetails": { ... }
    }
  ]
}`}
            hasControls={false}
            language='markup'
          />
        </section>
        <section className={styles.solveAnyFraud}>
          <h2 className={styles.title}>Solve any fraud use case</h2>
          <p className={styles.description}>
            Our 99.5% accurate visitorID gives websites a flexible tool to solve their toughest fraud challenges.
          </p>

          <div className={styles.caseStudies}>
            <p className={styles.label}>Read our customer case studies:</p>
            <div className={styles.cards}>
              <CaseStudy text='Credit card fraud' url='/case-studies/credit-card-fraud/' />
              <CaseStudy text='Promo abuse' url='/case-studies/promo-abuse/' />
              <CaseStudy text='Account sharing' url='/case-studies/edtech/' />
              <CaseStudy text='Review fraud' url='/case-studies/review-fraud/' />
            </div>
          </div>
        </section>
      </Container>
    </Section>
  )
}

interface CardProps {
  text: string
  url: string
}
function CaseStudy({ text, url }: CardProps) {
  return (
    <Link className={styles.link} key={url} to={url} target='_blank' rel='noreferrer'>
      {text} →
    </Link>
  )
}
