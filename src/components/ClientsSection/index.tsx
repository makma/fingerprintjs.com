import React from 'react'
import Section from '../common/Section'
import Container from '../common/Container'
import styles from './ClientsSection.module.scss'
import classNames from 'classnames'
import { ReactComponent as EbaySVG } from '../../../static/img/company-logos/ebay.svg'
import { ReactComponent as TargetSVG } from '../../../static/img/company-logos/target.svg'
import { ReactComponent as UsBankSVG } from '../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as BookingSVG } from '../../../static/img/company-logos/booking.svg'
import { ReactComponent as DropboxSVG } from '../../../static/img/company-logos/dropbox.svg'
import { ReactComponent as AmeritradeSVG } from '../../../static/img/company-logos/ameritrade.svg'
import { ReactComponent as AgodaSVG } from '../../../static/img/company-logos/agoda.svg'
import { ReactComponent as RealtorSVG } from '../../../static/img/company-logos/realtor.svg'
import { ReactComponent as CoinBaseSVG } from '../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as UpstarSVG } from '../../../static/img/company-logos/upstar.svg'
import { ReactComponent as RockstarSVG } from '../../../static/img/company-logos/rockstar.svg'
import { ReactComponent as CheckoutSVG } from '../../../static/img/company-logos/checkout.svg'
import { ReactComponent as WesterUnionSVG } from '../../../static/img/company-logos/western-union.svg'
import { ReactComponent as YahooSVG } from '../../../static/img/company-logos/yahoo.svg'

export default function ClientsSection() {
  return (
    <Section className={styles.clients}>
      <Container size='large'>
        <header className={styles.header}>
          <h2 className={styles.title}>
            <strong>Fingerprint Pro</strong> and <strong>FingerprintJS</strong> are trusted by public companies and
            innovative startups.
          </h2>
        </header>
        <div className={styles.content}>
          <CompanyLogo icon={EbaySVG} className={styles.EbaySVG} />
          <CompanyLogo icon={TargetSVG} className={styles.TargetSVG} />
          <CompanyLogo icon={UsBankSVG} className={styles.UsBankSVG} />
          <CompanyLogo icon={DropboxSVG} className={styles.DropboxSVG} />
          <CompanyLogo icon={AmeritradeSVG} className={styles.AmeritradeSVG} />
          <CompanyLogo icon={BookingSVG} className={styles.BookingSVG} />
          <CompanyLogo icon={AgodaSVG} className={styles.AgodaSVG} />
          <CompanyLogo icon={RealtorSVG} className={styles.RealtorSVG} link='https://www.realtor.com/' />
          <CompanyLogo icon={CoinBaseSVG} className={styles.CoinBaseSVG} />
          <CompanyLogo icon={UpstarSVG} className={styles.UpstarSVG} />
          <CompanyLogo icon={RockstarSVG} className={styles.RockstarSVG} />
          <CompanyLogo icon={CheckoutSVG} className={styles.CheckoutSVG} />
          <CompanyLogo icon={WesterUnionSVG} className={styles.WesterUnionSVG} />
          <CompanyLogo icon={YahooSVG} className={styles.YahooSVG} />
        </div>
      </Container>
    </Section>
  )
}

interface CompanyLogoProps {
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  className: string
  link?: string
}
function CompanyLogo({ icon: Icon, className, link }: CompanyLogoProps) {
  return link ? (
    <a className={styles.slide} href={link} target='_blank' rel='noreferrer'>
      <Icon className={classNames(styles.logo, className)} />
    </a>
  ) : (
    <span className={styles.slide}>
      <Icon className={classNames(styles.logo, className)} />
    </span>
  )
}
