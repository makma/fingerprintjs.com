import React from 'react'
import styles from './Button.module.scss'
import classNames from 'classnames'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'clear' | 'faded'
  size?: 'small' | 'big'
  href?: string
  mobileIcon?: React.ReactNode
  children?: React.ReactNode
  label?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  download?: boolean
  openNewTab?: boolean
}

export default function Button({
  variant = 'primary',
  size,
  href,
  className = '',
  mobileIcon,
  children,
  type,
  label = '',
  onClick,
  download,
  openNewTab,
}: ButtonProps) {
  const classes = classNames(
    styles.button,
    { [styles.outlined]: variant === 'outline' },
    { [styles.clear]: variant === 'clear' },
    { [styles.faded]: variant === 'faded' },
    { [styles.small]: size === 'small' },
    { [styles.big]: size === 'big' },
    className
  )
  const newTabProps = openNewTab && { target: '_blank', rel: 'noreferrer' }

  return href ? (
    <a href={href} className={classes} onClick={onClick} aria-label={label} download={download} {...newTabProps}>
      {mobileIcon && <span className={styles.mobileOnly}>{mobileIcon}</span>}
      <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
    </a>
  ) : (
    <button type={type} className={classes} onClick={onClick} aria-label={label}>
      {mobileIcon && <span className={classNames(styles.icon, styles.mobileOnly)}>{mobileIcon}</span>}
      <span className={classNames({ [styles.desktopOnly]: mobileIcon })}>{children}</span>
    </button>
  )
}
