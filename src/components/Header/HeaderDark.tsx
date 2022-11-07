import React from 'react'
import { Link } from 'gatsby'
import { ReactComponent as LogoSvg } from './fpjsDark.svg'

import Container from '../common/Container'

import styles from './Header.module.scss'

export default function HeaderDark() {
  return (
    <header className={styles.headerDark}>
      <Container size='large' className={styles.darkRoot}>
        <Link to='/' className={styles.linkLogo} title='Logo'>
          <LogoSvg className={styles.logo} />
        </Link>
      </Container>
    </header>
  )
}
