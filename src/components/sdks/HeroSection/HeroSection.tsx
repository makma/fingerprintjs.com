import React from 'react'

import Section from '../../common/Section'
import Container from '../../common/Container'

import { ReactComponent as AndroidSVG } from './logos/Android.svg'
import { ReactComponent as NextSVG } from './logos/Next.svg'
import { ReactComponent as VueSVG } from './logos/Vue.svg'
import { ReactComponent as JsSVG } from './logos/JS.svg'
import { ReactComponent as FlutterSVG } from './logos/Flutter.svg'

import { ReactComponent as NodeSVG } from './logos/Node.svg'
import { ReactComponent as PythonSVG } from './logos/Python.svg'
import { ReactComponent as SvelteSVG } from './logos/Svelte.svg'
import { ReactComponent as AppleSVG } from './logos/Apple.svg'
import { ReactComponent as OpenApiSVG } from './logos/OpenApi.svg'

import { ReactComponent as AngularSVG } from './logos/Angular.svg'
import { ReactComponent as ChromeSVG } from './logos/Chrome.svg'
import { ReactComponent as ReactSVG } from './logos/React.svg'
import { ReactComponent as GoSVG } from './logos/Go.svg'
import { ReactComponent as PreactSVG } from './logos/Preact.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Section className={styles.root}>
      <Container className={styles.container} size='large'>
        <section className={styles.descriptionSection}>
          <h1 className={styles.title}>SDKs and Libraries</h1>
          <p className={styles.description}>
            Fingerprint offers SDKs for the most popular client and server-side frameworks, making it easy for you to
            implement our code, whatever your tech stack looks like.
          </p>
        </section>
        <section className={styles.imageSection}>
          <div className={styles.sdkLogos}>
            <div className={styles.logos}>
              <div className={styles.logosRow}>
                <Logo logo={<AndroidSVG />} />
                <Logo logo={<NextSVG />} />
                <Logo logo={<VueSVG />} />
                <Logo logo={<JsSVG />} />
                <Logo logo={<FlutterSVG />} />
                <Logo logo={<AndroidSVG />} />
                <Logo logo={<NextSVG />} />
                <Logo logo={<VueSVG />} />
                <Logo logo={<JsSVG />} />
                <Logo logo={<FlutterSVG />} />
                <Logo logo={<AndroidSVG />} />
                <Logo logo={<NextSVG />} />
                <Logo logo={<VueSVG />} />
                <Logo logo={<JsSVG />} />
              </div>
            </div>
            <div className={styles.logos}>
              <div className={styles.logosRowCenter}>
                <Logo logo={<NodeSVG />} />
                <Logo logo={<PythonSVG />} />
                <Logo logo={<SvelteSVG />} />
                <Logo logo={<AppleSVG />} />
                <Logo logo={<OpenApiSVG />} />
                <Logo logo={<NodeSVG />} />
                <Logo logo={<PythonSVG />} />
                <Logo logo={<SvelteSVG />} />
                <Logo logo={<AppleSVG />} />
                <Logo logo={<OpenApiSVG />} />
                <Logo logo={<NodeSVG />} />
                <Logo logo={<PythonSVG />} />
                <Logo logo={<SvelteSVG />} />
                <Logo logo={<AppleSVG />} />
              </div>
            </div>
            <div className={styles.logos}>
              <div className={styles.logosRow}>
                <Logo logo={<ReactSVG />} />
                <Logo logo={<ChromeSVG />} />
                <Logo logo={<AngularSVG />} />
                <Logo logo={<GoSVG />} />
                <Logo logo={<PreactSVG />} />
                <Logo logo={<ReactSVG />} />
                <Logo logo={<ChromeSVG />} />
                <Logo logo={<AngularSVG />} />
                <Logo logo={<GoSVG />} />
                <Logo logo={<PreactSVG />} />
                <Logo logo={<ReactSVG />} />
                <Logo logo={<ChromeSVG />} />
                <Logo logo={<AngularSVG />} />
                <Logo logo={<GoSVG />} />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </Section>
  )
}

interface LogoProps {
  logo: React.ReactNode
}
function Logo({ logo }: LogoProps) {
  return (
    <div className={styles.logoWrapper}>
      <span className={styles.logo}>{logo}</span>
    </div>
  )
}
