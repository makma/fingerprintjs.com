import React from 'react'

import { LayoutTemplate } from '../../components/Layout'
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import Collapsible from '../../components/common/Collapsible'
import Button from '../../components/common/Button'
import { PATH, URL } from '../../constants/content'
import PriceCalculator from '../../components/PriceCalculator'

import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './Pricing.module.scss'

interface PricingPageProps {
  pageContext: GeneratedPageContext
}
export default function PricingPage({ pageContext }: PricingPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Pricing - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeaderSection />
      <CalculatorSection />
      <FAQSection />
      <ContactSalesSection />
    </LayoutTemplate>
  )
}

function HeaderSection() {
  return (
    <Section className={styles.headerSection}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerDescription}>Transparent pricing for developers and businesses</p>
      </Container>
    </Section>
  )
}

function CalculatorSection() {
  return (
    <Section className={styles.calculator}>
      <Container size='large'>
        <PriceCalculator />
      </Container>
    </Section>
  )
}

function FAQSection() {
  return (
    <Section className={styles.faqSection}>
      <Container size='large' className={styles.faqContainer}>
        <FAQBlock faq={faq} />
      </Container>
    </Section>
  )
}

interface FAQBlockProps {
  faq: { question: string; answer: React.ReactNode }[]
}

export function FAQBlock({ faq }: FAQBlockProps) {
  return (
    <div>
      <header className={styles.faqHeader}>
        <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
      </header>
      <div>
        <Collapsible plusIcon sections={faq.map((entry) => ({ title: entry.question, content: entry.answer }))} />
      </div>
    </div>
  )
}
//TODO: The list of questions and answers is still in development
const faq = [
  {
    question: 'How does billing for FingerprintJS Pro work?',
    answer: (
      <>
        Customers are billed on a monthly basis based on API requests made over the billing period. The minimum paid
        plan is $100/mo for 100,000 API requests - any additional requests will be charged at a rate of $1 per 1,000
        requests.
        <br />
        <br />
        Developers and small sites can access FingerprintJS Pro for free forever for a maximum of 20,000 API requests
        per month.
      </>
    ),
  },
  {
    question: 'Do you offer annual billing and discounts?',
    answer: (
      <>
        Yes we do offer annual billing and discounts. Please{' '}
        <a href={PATH.contactSales} className={styles.link}>
          contact sales{' '}
        </a>
        for details on annual pricing.
      </>
    ),
  },
  {
    question: 'I am a developer. Can I use FingerprintJS Pro for free?',
    answer: (
      <>
        Yes - developers and small sites can use FingerprintJS Pro for free forever, with up to 20,000 API requests per
        month.
      </>
    ),
  },
  {
    question: 'How does the unlimited 10 day free trial work?',
    answer: (
      <>
        New signups can try FingerprintJS Pro for free with no API request limits for 10 days. After the trial period
        ends, the account can be upgraded to a paid plan or will be downgraded to a free plan with a 20,000 API request
        limit.
      </>
    ),
  },
  {
    question: 'How does the $0 free plan differ from a paid Pro plan?',
    answer: (
      <>
        The only difference between our free plan and paid Pro plan is that customers can only use up to 20,000 API
        requests per month on the free plan. There are no differences in features, functionality or accuracy between the
        free and paid plan.
      </>
    ),
  },
  {
    question: 'How many identifications do I need?',
    answer: (
      <>
        FingerprintJS Pro works best if the JavaScript agent is installed and runs an identification for every visitor
        on every page of your website. To estimate the number of identifications this installation would use, you can
        look at your website’s total number of monthly pageviews using a client- or server-side website analytics
        service (e.g. Google Analytics, Segment, Netlify Analytics).
        <br />
        <br />
        If you decide to install FingerprintJS Pro only on several key pages (e.g. signup, login, or prepayment), then
        you use pageviews for those specific pages as an estimate for identifications.
        <br />
        <br />
        Finally, if you plan to configure FingerprintJS Pro to only identify visitors when they first land on your site,
        you can use monthly user sessions to estimate identifications needed.
        <br />
        <br />
        For assistance in estimating the number of identifications needed for your use-case, please{' '}
        <a href={PATH.contactSales} className={styles.link}>
          contact sales.
        </a>
      </>
    ),
  },
  {
    question: 'What is FingerprintJS Pro’s uptime?',
    answer: (
      <>
        FingerprintJS guarantees at least a 99.9% uptime. You can check our current status, view previous incidents and
        subscribe to updates on our{' '}
        <a href={URL.statusUrl} className={styles.link}>
          status page.
        </a>
      </>
    ),
  },
  {
    question: 'Is FingerprintJS Pro GDPR compliant?',
    answer: (
      <>
        Yes - FingerprintJS is GDPR compliant.
        <br />
        <br />
        Our technology is intended to be used for fraud detection only - for this use case, no user consent is required.
        Any use outside of fraud detection would need to comply with GDPR user consent rules.
        <br />
        <br />
        We never automatically track traffic - our customers can configure under what conditions visitors are tracked,
        and we never do cross-domain tracking.
      </>
    ),
  },
  {
    question: 'Where is FingerprintJS Pro’s data stored?',
    answer: (
      <>
        When you create your account you can choose between Global/US data storage (Richmond, VA) and data EU storage
        (Frankfurt Germany).
        <br />
        <br />
        We can set up servers in additional locations for enterprise customers. To learn more, please{' '}
        <a href={PATH.contactSales} className={styles.link}>
          contact sales.
        </a>
      </>
    ),
  },
  {
    question: 'Is FingerprintJS SOC 2 compliant?',
    answer: (
      <>
        Yes - FingerprintJS is{' '}
        <a href='https://fingerprintjs.com/blog/soc-2-type-1/' className={styles.link}>
          SOC 2 compliant.
        </a>
        <br />
        <br />
        If you would like to see our SOC 2 Type 1 report, please{' '}
        <a href={PATH.contactSales} className={styles.link}>
          contact sales.
        </a>
      </>
    ),
  },
]

function ContactSalesSection() {
  return (
    <Section className={styles.contactSection}>
      <Container className={styles.contactContainer}>
        <h1 className={styles.contactTitle}>Not sure which plan is right for you?</h1>
        <Button href={PATH.contactSales} variant='primary' size='big' className={styles.contactButton}>
          Contact Sales
        </Button>
      </Container>
    </Section>
  )
}
