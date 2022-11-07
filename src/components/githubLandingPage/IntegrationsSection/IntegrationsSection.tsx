import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import { Link } from 'gatsby'
import { PATH, INTEGRATIONS_URL } from '../../../constants/content'

import styles from './IntegrationsSection.module.scss'

import { ReactComponent as Gtm } from './logos/Gtm.svg'
import { ReactComponent as JS } from './logos/JS.svg'
import { ReactComponent as ReactSVG } from './logos/React.svg'
import { ReactComponent as Chrome } from './logos/Chrome.svg'
import { ReactComponent as Angular } from './logos/Angular.svg'
import { ReactComponent as Group } from './logos/Group.svg'
import { ReactComponent as Flutter } from './logos/Flutter.svg'
import { ReactComponent as TS } from './logos/TS.svg'

import { ReactComponent as Apple } from './logos/Apple.svg'
import { ReactComponent as Node } from './logos/NodeJS.svg'
import { ReactComponent as Python } from './logos/Python.svg'
import { ReactComponent as Svelte } from './logos/Svelte.svg'
import { ReactComponent as Open } from './logos/Open.svg'
import { ReactComponent as Preact } from './logos/Preact.svg'
import { ReactComponent as Android } from './logos/Android.svg'
import { ReactComponent as Next } from './logos/Next.svg'
import { ReactComponent as Vue } from './logos/Vue.svg'
import { ReactComponent as Cloudflare } from './logos/Cloudflare.svg'

import { ReactComponent as Arrow } from './ArrowSVG.svg'

import { repeatElement } from '../../../helpers/repeatElement'

import classNames from 'classnames'

export default function IntegrationsSection() {
  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h2 className={styles.title}>Integrations</h2>
        <p className={styles.description}>
          Fingerprint Pro provides SDKs built with best practices for the most popular client and server side frameworks
          and 3rd party service providers.
        </p>
        <div className={styles.links}>
          <Link className={styles.link} to={PATH.sdks}>
            SDKs and Libraries
            <Arrow className={styles.arrow} />
          </Link>
          <Link className={styles.link} to={PATH.integrations}>
            Integrations
            <Arrow className={styles.arrow} />
          </Link>
        </div>
      </Container>
      <div className={styles.integrationLogos}>
        <Logos
          logos={[
            { logo: <Gtm />, link: INTEGRATIONS_URL.gtm },
            { logo: <JS />, link: INTEGRATIONS_URL.js },
            { logo: <ReactSVG />, link: INTEGRATIONS_URL.react },
            { logo: <Chrome />, link: INTEGRATIONS_URL.chrome },
            { logo: <Angular />, link: INTEGRATIONS_URL.angular },
            { logo: <Group />, link: INTEGRATIONS_URL.go },
            { logo: <Flutter />, link: INTEGRATIONS_URL.flutter },
            { logo: <TS />, link: INTEGRATIONS_URL.ts },
            { logo: <Cloudflare />, link: INTEGRATIONS_URL.cloudflare },
          ]}
          repeatElements={10}
        />
        <Logos
          logos={[
            { logo: <Apple />, link: INTEGRATIONS_URL.ios },
            { logo: <Node />, link: INTEGRATIONS_URL.node },
            { logo: <Python />, link: INTEGRATIONS_URL.python },
            { logo: <Svelte />, link: INTEGRATIONS_URL.svelte },
            { logo: <Open />, link: INTEGRATIONS_URL.openApi },
            { logo: <Preact />, link: INTEGRATIONS_URL.preact },
            { logo: <Android />, link: INTEGRATIONS_URL.android },
            { logo: <Next />, link: INTEGRATIONS_URL.next },
            { logo: <Vue />, link: INTEGRATIONS_URL.vue },
          ]}
          inverted
          repeatElements={10}
        />
      </div>
    </Section>
  )
}

interface LogoProps {
  logo: React.ReactNode
  link: string
}
function Logo({ logo, link }: LogoProps) {
  return (
    <a target='_blank' rel='noreferrer' href={link} className={styles.logoWrapper}>
      <span className={styles.logo}>{logo}</span>
    </a>
  )
}

interface LogosProps {
  logos: LogoProps[]
  inverted?: boolean
  repeatElements: number
}
function Logos({ logos, inverted, repeatElements }: LogosProps) {
  return (
    <div
      className={classNames(styles.logosRow, {
        [styles.logosRowInverted]: inverted,
      })}
    >
      {repeatElement(repeatElements, (i: number) =>
        logos.map((props, index) => <Logo {...props} key={`${i}-${index}`} />)
      )}
    </div>
  )
}
