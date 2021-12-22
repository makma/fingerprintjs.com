import React from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'

import { ReactComponent as GithubIconSvg } from './GithubSVG.svg'
import { ReactComponent as DiscordSVG } from './DiscordSVG.svg'

import styles from './JoinCommunitySection.module.scss'

export default function JoinCommunitySection() {
  return (
    <Container className={styles.container}>
      <section className={styles.joinCommunitySection}>
        <div className={styles.labels}>
          <span>+20K downloads</span>
          <span>+58M API requests</span>
        </div>
        <h1 className={styles.title}>Join our growing community</h1>
        <p className={styles.description}>
          BotD is an open source project supported by contributing developers across the globe.
        </p>
        <div className={styles.buttons}>
          <Button className={styles.label} href={URL.discordServerURL} variant='white' size='big' openNewTab>
            <div className={styles.button}>
              <DiscordSVG className={styles.icon} />
              <span>Discord</span>
            </div>
          </Button>
          <Button className={styles.label} href={URL.botDRepoUrl} variant='white' size='big' openNewTab>
            <div className={styles.button}>
              <GithubIconSvg className={styles.icon} />
              <span>Github</span>
            </div>
          </Button>
        </div>
      </section>
    </Container>
  )
}
