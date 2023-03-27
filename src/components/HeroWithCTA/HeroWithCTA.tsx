import React from 'react'
import classNames from 'classnames'
import styles from './HeroWithCTA.module.scss'
import Section from '../common/Section'
import Container from '../common/Container'

import Button from '../common/Button'

export interface HeroWithCTAProps {
  title: string
  children: React.ReactNode
  className?: string
  ctaText1: string
  ctaHref1: string
  ctaText2?: string
  ctaHref2?: string
  variant?: 'primary' | 'secondary'
  openNewTab?: boolean
  buttonId1?: string
  buttonId2?: string
}

export default function HeroWithCTA({
  title,
  children,
  className,
  ctaText1,
  ctaHref1,
  ctaText2,
  ctaHref2,
  variant = 'primary',
  openNewTab,
  buttonId1,
  buttonId2,
}: HeroWithCTAProps) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='small' className={styles.heroContainer}>
        <h1 className={classNames(styles.title, { [styles.secondaryTitle]: variant === 'secondary' })}>{title}</h1>
        <p className={classNames(styles.description, { [styles.secondaryDescription]: variant === 'secondary' })}>
          {children}
        </p>
        <div className={styles.buttonContainer}>
          <Button
            size='big'
            href={ctaHref1}
            variant='orangeGradient'
            className={classNames(styles.button, { [styles.secondaryButton]: variant === 'secondary' })}
            openNewTab={openNewTab}
            buttonId={buttonId1}
          >
            {ctaText1}
          </Button>
          {ctaText2 && (
            <Button
              size='big'
              href={ctaHref2}
              variant='orangeGradientOutline'
              className={classNames(styles.button, { [styles.secondaryButton]: variant === 'secondary' })}
              openNewTab={openNewTab}
              buttonId={buttonId2}
            >
              {ctaText2}
            </Button>
          )}
        </div>
      </Container>
    </Section>
  )
}
