import React from 'react'
import Container from '../common/Container'
import { Link } from 'gatsby'
import { isLocalLink } from '../../helpers/url'

import styles from './HeaderBar.module.scss'

export interface headerBarProps {
  children: React.ReactNode
  linkUrl?: string
}

export default function HeaderBar({ children, linkUrl }: headerBarProps) {
  return linkUrl ? (
    <Container className={styles.container} size='large'>
      <div className={styles.headerBar}>
        {isLocalLink(linkUrl) ? (
          <Link className={styles.link} to={linkUrl}>
            <div className={styles.text}>{children}</div>
            <div className={styles.arrow}>Learn more →</div>
          </Link>
        ) : (
          <a className={styles.link} href={linkUrl} target='_blank' rel='noreferrer'>
            <div className={styles.text}>{children}</div>
            <div className={styles.arrow}>Learn more →</div>
          </a>
        )}
      </div>
    </Container>
  ) : (
    <Container className={styles.container}>
      <span className={styles.text}>{children}</span>
    </Container>
  )
}
