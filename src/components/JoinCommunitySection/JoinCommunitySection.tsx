import React from 'react'
import Container from '../common/Container'
import Button from '../common/Button'

import { ReactComponent as GithubIconSvg } from './GithubSVG.svg'
import { ReactComponent as DiscordSVG } from './DiscordSVG.svg'

import styles from './JoinCommunitySection.module.scss'

export interface JoinCommunityProps {
  title: string
  children: string
  discordLink: string
  githubLink: string
  labels?: string[]
}
export default function JoinCommunitySection({ title, children, discordLink, githubLink, labels }: JoinCommunityProps) {
  return (
    <Container size='large' className={styles.container}>
      <section className={styles.joinCommunitySection}>
        {labels && (
          <div className={styles.labels}>
            {labels.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        )}
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{children} </p>
        <div className={styles.buttons}>
          <Button className={styles.label} href={discordLink} variant='white' size='big' openNewTab>
            <div className={styles.button}>
              <DiscordSVG className={styles.icon} />
              <span>Discord</span>
            </div>
          </Button>
          <Button className={styles.label} href={githubLink} variant='white' size='big' openNewTab>
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
