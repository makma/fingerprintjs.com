import React from 'react'
import Button from '../../common/Button'
import Container from '../../common/Container'
import Section from '../../common/Section'
import SubHeader from '../SubHeader'
import classNames from 'classnames'

import styles from './Hero.module.scss'

export interface HeroProps {
  title: string
  description: string
  ctaText: string
  ctaHref: string
  ctaText2?: string
  ctaHref2?: string
  openCtaNewTab?: boolean
  openCtaNewTab2?: boolean

  className?: string
}
export default function Hero({
  title,
  description,
  ctaText,
  ctaHref,
  ctaText2,
  ctaHref2,
  openCtaNewTab,
  openCtaNewTab2,
  className,
}: HeroProps) {
  return (
    <Section className={classNames(styles.section, className)}>
      <Container size='large' className={styles.container}>
        <SubHeader
          title={{ text: title, size: 'large', weight: 'primary' }}
          subtitle={{ text: description, size: 'normal' }}
          align='center'
          className={styles.subHeader}
        />
        <div className={styles.buttonContainer}>
          <Button href={ctaHref} className={styles.button} openNewTab={openCtaNewTab} variant='orangeGradient'>
            {ctaText}
          </Button>
          {ctaText2 && (
            <Button
              size='big'
              href={ctaHref2}
              variant='orangeGradientOutline'
              className={styles.secondaryButton}
              openNewTab={openCtaNewTab2}
            >
              {ctaText2}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  )
}
