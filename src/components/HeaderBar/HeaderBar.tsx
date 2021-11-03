import React from 'react'
import Container from '../common/Container'

import styles from './HeaderBar.module.scss'

export interface headerBarProps {
  children: string
  linkUrl?: string
}

export default function HeaderBar({ children, linkUrl }: headerBarProps) {
  return linkUrl ? (
    <Container className={styles.container} size='large'>
      <div className={styles.headerBar}>
        <a className={styles.link} href={linkUrl} target='_blank' rel='noreferrer'>
          <div className={styles.text}>{children}</div>
          <div className={styles.arrow}>→</div>
        </a>
      </div>
    </Container>
  ) : (
    <Container className={styles.container}>
      <span className={styles.text}>{children}</span>
    </Container>
  )
}
