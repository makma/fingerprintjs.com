import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'

import HeroAnimation from '-!svg-react-loader!./hero.inline.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Container className={styles.heroContainer} size='large'>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>A complete view of your anonymous traffic</h1>
        <p className={styles.description}>
          Fingerprint Pro&apos;s visitor identification API identifies 99.5% of returning visitors, even when they
          attempt to conceal their identity.
        </p>
        <Button
          href={`${URL.signupUrl}?&utm_source=homepage&utm_medium=website&utm_campaign=account-signup`}
          variant='orangeGradient'
          className={styles.button}
          openNewTab
        >
          Create Free Account
        </Button>
      </section>
      <section className={styles.animationSection}>
        <HeroAnimation />
      </section>
    </Container>
  )
}
