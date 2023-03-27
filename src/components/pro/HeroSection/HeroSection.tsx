import React, { useEffect, useState } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL, PATH } from '../../../constants/content'

import HeroAnimation from '-!svg-react-loader!./hero.inline.svg'
import { motion, AnimatePresence } from 'framer-motion'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  const [render, isRender] = useState(false)

  useEffect(() => {
    isRender(true)
  }, [])
  return (
    <Container className={styles.heroContainer} size='large'>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>A complete view of your anonymous traffic</h1>
        <p className={styles.description}>
          Fingerprint Pro&apos;s visitor identification API identifies 99.5% of returning visitors, even when they
          attempt to conceal their identity.
        </p>
        <div className={styles.buttonsSection}>
          <Button
            href={`${URL.signupUrl}?&utm_source=homepage&utm_medium=website&utm_campaign=account-signup`}
            variant='orangeGradient'
            className={styles.button}
            openNewTab
          >
            Create Free Account
          </Button>
          <Button href={`${PATH.demoUrl}#get-demo`} variant='orangeGradientOutline' className={styles.button}>
            Get Custom Demo
          </Button>
        </div>
      </section>
      <section className={styles.animationSection}>
        <AnimatePresence initial={true} mode='wait'>
          {render && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
              }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <HeroAnimation />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </Container>
  )
}
