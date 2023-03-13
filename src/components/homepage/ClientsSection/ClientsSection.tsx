import React, { useState, useEffect } from 'react'
import Section from '../../common/Section'

import { ReactComponent as CoinBaseSVG } from '../../../../static/img/company-logos/coinbase.svg'
import { ReactComponent as UsBankSVG } from '../../../../static/img/company-logos/us-bank.svg'
import { ReactComponent as AmeritradeSVG } from '../../../../static/img/company-logos/ameritrade.svg'
import { ReactComponent as WesternUnionSVG } from '../../../../static/img/company-logos/western-union.svg'
import { ReactComponent as BookingSVG } from '../../../../static/img/company-logos/booking.svg'
import { ReactComponent as AgodaSVG } from '../../../../static/img/company-logos/agoda.svg'
import { ReactComponent as HomeCreditSVG } from '../../../../static/img/company-logos/home-credit.svg'
import { ReactComponent as RockstarSVG } from '../../../../static/img/company-logos/rockstar.svg'
import { ReactComponent as YahooSVG } from '../../../../static/img/company-logos/yahoo.svg'
import { ReactComponent as TargetSVG } from '../../../../static/img/company-logos/target.svg'
import { ReactComponent as Upstar } from '../../../../static/img/company-logos/upstar.svg'
import { ReactComponent as CheckoutSVG } from '../../../../static/img/company-logos/checkout.svg'
import { ReactComponent as TripleWhaleSVG } from '../../../../static/img/company-logos/triple-whale.svg'
import { ReactComponent as DropboxSVG } from '../../../../static/img/company-logos/dropbox.svg'

import { ReactComponent as Zee5SVG } from '../../../../static/img/company-logos/apac/zee5.svg'
import { ReactComponent as NaukriSVG } from '../../../../static/img/company-logos/apac/naukri.svg'
import { ReactComponent as JungleSVG } from '../../../../static/img/company-logos/apac/jungle.svg'
import { ReactComponent as UniSVG } from '../../../../static/img/company-logos/apac/uni.svg'
import { ReactComponent as HappyfreshSVG } from '../../../../static/img/company-logos/apac/happyfresh.svg'
import { ReactComponent as DanaSVG } from '../../../../static/img/company-logos/apac/dana.svg'
import { ReactComponent as XenditSVG } from '../../../../static/img/company-logos/apac/xendit.svg'
import { ReactComponent as PaisaSVG } from '../../../../static/img/company-logos/apac/5paisa.svg'
import { ReactComponent as ApnaSVG } from '../../../../static/img/company-logos/apac/apna.svg'

import { ReactComponent as KlarnaSVG } from '../../../../static/img/company-logos/emea/klarna.svg'
import { ReactComponent as VirginSVG } from '../../../../static/img/company-logos/emea/virgin.svg'
import { ReactComponent as SinchSVG } from '../../../../static/img/company-logos/emea/sinch.svg'
import { ReactComponent as TurkishAirlinesSVG } from '../../../../static/img/company-logos/emea/turkishAirlines.svg'
import { ReactComponent as CartierSVG } from '../../../../static/img/company-logos/emea/cartier.svg'
import { ReactComponent as QiwiSVG } from '../../../../static/img/company-logos/emea/qiwi.svg'
import { ReactComponent as WorldCoin } from '../../../../static/img/company-logos/emea/worldcoin.svg'

import styles from './ClientsSection.module.scss'
import { repeatElement } from '../../../helpers/repeatElement'
import classNames from 'classnames'
import { Region } from '../../../helpers/region'
import { useUserLocation } from '../../../hooks/useUserLocation'
import { AnimatePresence, motion } from 'framer-motion'

export default function ClientsSection() {
  const { countryRegion, userCountry } = useUserLocation()

  const [regionLogos, setRegionLogos] = useState<JSX.Element>()

  useEffect(() => {
    const amerLogos = (
      <>
        <UsBankSVG className={classNames(styles.logo, styles.usBank)} />
        <AmeritradeSVG className={classNames(styles.logo, styles.ameritrade)} />
        <WesternUnionSVG className={classNames(styles.logo, styles.western)} />
        <BookingSVG className={classNames(styles.logo, styles.booking)} />
        <AgodaSVG className={classNames(styles.logo, styles.agoda)} />
        <DropboxSVG className={classNames(styles.logo, styles.dropbox)} />
        <CoinBaseSVG className={classNames(styles.logo, styles.coinbase)} />
        <HomeCreditSVG className={classNames(styles.logo, styles.homeCredit)} />
        <RockstarSVG className={classNames(styles.logo, styles.rockstar)} />
        <YahooSVG className={classNames(styles.logo, styles.yahoo)} />
        <TargetSVG className={classNames(styles.logo, styles.target)} />
        <Upstar className={classNames(styles.logo, styles.upstar)} />
        <CheckoutSVG className={classNames(styles.logo, styles.checkout)} />
        <TripleWhaleSVG className={classNames(styles.logo, styles.tripleWhale)} />
      </>
    )
    const apacLogos = (
      <>
        <Zee5SVG className={styles.zee5} />
        <NaukriSVG className={styles.naukri} />
        <JungleSVG className={styles.jungle} />
        <UniSVG className={styles.uni} />
        <HappyfreshSVG className={styles.happyfresh} />
        <DanaSVG className={styles.dana} />
        <XenditSVG className={styles.xendit} />
        <PaisaSVG className={styles.paisa} />
        <ApnaSVG className={styles.apna} />
        <WesternUnionSVG className={classNames(styles.logo, styles.western)} />
        <UsBankSVG className={classNames(styles.logo, styles.usBank)} />
        <RockstarSVG className={classNames(styles.logo, styles.rockstar)} />
        <AgodaSVG className={classNames(styles.logo, styles.agoda)} />
        <HomeCreditSVG className={classNames(styles.logo, styles.homeCredit)} />
        <TargetSVG className={classNames(styles.logo, styles.target)} />
        <CheckoutSVG className={classNames(styles.logo, styles.checkout)} />
      </>
    )
    const emeaLogos = (
      <>
        <KlarnaSVG className={styles.klarna} />
        <VirginSVG className={styles.virgin} />
        <SinchSVG className={styles.sinch} />
        <CheckoutSVG className={classNames(styles.logo, styles.checkout)} />
        <DropboxSVG className={classNames(styles.logo, styles.dropbox)} />
        <TurkishAirlinesSVG className={styles.turkish} />
        <CartierSVG className={styles.cartier} />
        <BookingSVG className={classNames(styles.logo, styles.booking)} />
        <QiwiSVG className={styles.qiwi} />
        <WorldCoin className={styles.worldCoin} />
      </>
    )
    if (userCountry) {
      switch (countryRegion) {
        case Region.APAC:
          setRegionLogos(apacLogos)
          break
        case Region.EMEA:
          setRegionLogos(emeaLogos)
          break
        default:
          setRegionLogos(amerLogos)
          break
      }
    }
  }, [countryRegion, userCountry])

  return (
    <Section className={styles.root}>
      <div className={styles.marquee}>
        <AnimatePresence>
          {regionLogos && (
            <>
              <motion.div
                className={styles.logos}
                initial={{ opacity: 0, height: 49 }}
                animate={{ opacity: 1, height: 49 }}
                transition={{ duration: 0.4 }}
              >
                {repeatElement(2, (i: number) => (
                  <React.Fragment key={`top-${i}`}>{regionLogos}</React.Fragment>
                ))}
              </motion.div>
              <motion.div
                className={styles.logos}
                initial={{ opacity: 0, height: 49 }}
                animate={{ opacity: 1, height: 49 }}
                transition={{ duration: 0.4 }}
              >
                {repeatElement(2, (i: number) => (
                  <React.Fragment key={`bottom-${i}`}>{regionLogos}</React.Fragment>
                ))}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </Section>
  )
}
