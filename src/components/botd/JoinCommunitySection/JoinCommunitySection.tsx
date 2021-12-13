import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'

import styles from './JoinCommunitySection.module.scss'

export default function JoinCommunitySection() {
  return (
    <Container className={styles.container}>
      <div className={styles.descriptionSection}>
        <h1 className={styles.title}>Join our growing community</h1>
        <p className={styles.description}>
          BotD is an open source project supported by contributing developers across the globe.
        </p>
        <Button href='/case-studies/edtech/' variant='outline' size='big' className={styles.button}>
          Discord
        </Button>
      </div>
    </Container>
  )
}
