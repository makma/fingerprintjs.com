import React from 'react'
import styles from './GetStartedSection.module.scss'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { URL } from '../../../constants/content'

import { ReactComponent as EbaySVG } from '../../../../static/img/company-logos/ebay.svg'
import { ReactComponent as TargetSVG } from '../../../../static/img/company-logos/target.svg'
import { ReactComponent as UsBankSVG } from '../../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as BookingSVG } from '../../../../static/img/company-logos/booking.svg'
import { ReactComponent as AgodaSVG } from '../../../../static/img/company-logos/agoda.svg'
import { ReactComponent as CoinBaseSVG } from '../../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'
import { ReactComponent as YahooSVG } from '../../../../static/img/company-logos/yahoo.svg'

import Button from '../../common/Button'

export default function GetStartedSection() {
  return (
    <Section className={styles.root}>
      <Container size='small' className={styles.heroContainer}>
        <h1 className={styles.title}>8% of the top 10,000 websites use FingerprintJS </h1>
        <h2 className={styles.subTitle}>Get Started For Free Today</h2>
        <Button size='big' href={URL.dashboardLoginUrl} className={styles.button}>
          Start 30 Day Free Trial
        </Button>
      </Container>
      <Container size='large' className={styles.clientsContainer}>
        <div className={styles.content}>
          <CheckoutSVG className={styles.logo} />
          <YahooSVG className={styles.logo} />
          <EbaySVG className={styles.logo} />
          <CoinBaseSVG className={styles.logo} />
          <AgodaSVG className={styles.logo} />
          <UsBankSVG className={styles.logo} />
          <BookingSVG className={styles.logo} />
          <TargetSVG className={styles.logo} />
        </div>
      </Container>
    </Section>
  )
}
