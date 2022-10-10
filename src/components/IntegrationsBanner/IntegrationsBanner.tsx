import React from 'react'
import styles from './IntegrationsBanner.module.scss'
import Button from '../common/Button'
import classNames from 'classnames'

export interface IntegrationsBannerProps {
  title: string
  children: React.ReactNode | string
  ctaText: string
  ctaHref: string
  openNewTab: boolean
  variant?: 'primary' | 'blue'
}

export default function IntegrationsBanner({
  title,
  children,
  ctaText,
  ctaHref,
  openNewTab,
  variant = 'primary',
}: IntegrationsBannerProps) {
  return (
    <section className={classNames(styles.banner, { [styles.blue]: variant === 'blue' })}>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.description}>{children}</p>
      <Button href={ctaHref} className={styles.button} size={'big'} openNewTab={openNewTab} variant={variant}>
        {ctaText}
      </Button>
    </section>
  )
}
