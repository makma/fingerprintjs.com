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
  childrenClassName?: string
  ctaText: string
  ctaHref: string
  variant?: 'primary' | 'outline' | 'clear' | 'faded'
}

export default function HeroWithCTA({
  title,
  children,
  childrenClassName,
  className,
  ctaText,
  ctaHref,
  variant,
}: HeroWithCTAProps) {
  return (
    <Section className={classNames(styles.root, className)}>
      <Container size='small' className={styles.heroContainer}>
        <h1 className={styles.title}>{title}</h1>
        <p className={classNames(styles.description, childrenClassName)}>{children}</p>
        <Button size='big' href={ctaHref} variant={variant} className={styles.button}>
          {ctaText}
        </Button>
      </Container>
    </Section>
  )
}
