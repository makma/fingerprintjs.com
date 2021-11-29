import React from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'
import { ReactComponent as GithubIconSvg } from './GithubSVG.svg'

import styles from './HeroSection.module.scss'

export default function HeroSection() {
  return (
    <Container className={styles.container} size='large'>
      <Section className={styles.descriptionSection}>
        <h1 className={styles.title}>free open beta</h1>
        <h2 className={styles.subtitle}>Open source JavaScript bot detection library</h2>
        <p className={styles.description}>
          The BotD library accurately identifies bots in real time, all while providing full transparency into what data
          is collected. Add to your website with a few lines of JavaScript, no complicated integrations required.
        </p>
        <div className={styles.buttons}>
          <Button href={URL.signupUrl} variant='primary' size='big' className={styles.button}>
            Get started for free
          </Button>
          <a className={styles.buttonOutlined} href={URL.githubRepoUrl}>
            <div className={styles.label}>
              <GithubIconSvg className={styles.icon} />
              <span>Github</span>
            </div>
          </a>
        </div>
      </Section>
      <Section className={styles.botDSection}>
        <div className={styles.botD}>
          <h2 className={styles.title}>Am I a bot?</h2>
          <h2 className={styles.subTitle}>You are not a bot</h2>
        </div>
      </Section>
    </Container>
  )
}
