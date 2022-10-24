import React, { useEffect, useState, useReducer } from 'react'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'
import Tippy from '@tippyjs/react'
import Skeleton from '../../Skeleton/Skeleton'
import { scrollToElementById } from '../../../helpers/scrollToElementByID'
import { repeatElement } from '../../../helpers/repeatElement'
import classNames from 'classnames'
import { useGithub } from '../../../hooks/useGithub'
import { useBotDContext } from '../../../context/BotdContext'

import { ReactComponent as GithubIconSvg } from './svg/GithubSVG.svg'

import { ReactComponent as automationDetectedSVG } from './svg/AutomationDetectedSVG.svg'
import { ReactComponent as automationNotDetectedSVG } from './svg/AutomationNotDetectedSVG.svg'
import { ReactComponent as searchEngineDetectedSVG } from './svg/SearchEngineDetectedSVG.svg'
import { ReactComponent as searchEngineNotDetectedSVG } from './svg/SearchEngineNotDetectedSVG.svg'

import { ReactComponent as InfoSvg } from './svg/InfoTipSVG.svg'
import { ReactComponent as LoadingIconSvg } from './svg/LoadingIconSVG.svg'
import { ReactComponent as ErrorIconSvg } from './svg/ErrorIconSVG.svg'
import { ReactComponent as RefreshIconSvg } from '../../../img/RefreshSVG.svg'

import styles from './HeroSection.module.scss'

interface DetectedBots {
  isBot: boolean
  automationTool: boolean
  searchEngine: boolean
}
enum BotType {
  AutomationTool,
  SearchEngine,
}

type Action = { detected: BotType }

function botReducer(detectedBots: DetectedBots, updateDetectedBot: Action) {
  detectedBots = { ...detectedBots, isBot: true }

  switch (updateDetectedBot.detected) {
    case BotType.AutomationTool:
      return { ...detectedBots, automationTool: true }
    case BotType.SearchEngine:
      return { ...detectedBots, searchEngine: true }
  }
}

export default function HeroSection() {
  const initialState = {
    isBot: false,
    automationTool: false,
    searchEngine: false,
  }
  const [botState, dispatch] = useReducer(botReducer, initialState)
  const [isLoaded, setIsLoaded] = useState(false)

  const { visitorData, isLoading, hasError, refresh } = useBotDContext()

  useEffect(() => {
    if (visitorData) {
      if (visitorData.products.botd.data.bot.result === 'good') {
        dispatch({ detected: BotType.SearchEngine })
      }
      if (visitorData.products.botd.data.bot.result === 'bad') {
        dispatch({ detected: BotType.AutomationTool })
      }
      setIsLoaded(true)
    }
  }, [visitorData])

  const { githubData } = useGithub('BotD')

  return (
    <Container size='large' className={styles.container}>
      <section className={styles.descriptionSection}>
        <span className={styles.title}>{githubData?.stargazers_count} stars</span>
        <h2 className={styles.subTitle}>
          Introducing BotD:
          <br />
          an open source JavaScript bot detection library
        </h2>
        <p className={styles.description}>
          The BotD library accurately identifies{' '}
          <a className={styles.botsWord} onClick={() => scrollToElementById('ApiResponseDetails')}>
            bots
          </a>{' '}
          in real time, all while providing full transparency into what data is collected. Add to your website with a
          few lines of JavaScript, no complicated integrations required.
        </p>
        <div className={styles.buttons}>
          <Button
            onClick={() => scrollToElementById('generateKeySection')}
            variant='primary'
            size='big'
            className={styles.button}
          >
            Get started for free
          </Button>
          <a className={styles.buttonOutlined} href={URL.botDRepoUrl} target='_blank' rel='noreferrer'>
            <div className={styles.label}>
              <GithubIconSvg className={styles.icon} />
              <span>Github</span>
            </div>
          </a>
        </div>
      </section>
      <section className={styles.botDSection}>
        <div className={styles.botD}>
          <h2 className={styles.botTitle}>Am I a bot?</h2>
          <CardHeader isLoaded={isLoaded} {...botState} isLoading={isLoading} hasError={hasError} refresh={refresh} />
          <p className={styles.seeDetails} onClick={() => scrollToElementById('ApiResponseDetails')}>
            See details →
          </p>
          <CardsSection isLoaded={isLoaded} {...botState} hasError={hasError} isLoading={isLoading} />
        </div>
      </section>
    </Container>
  )
}

interface CardsSectionProps extends DetectedBots {
  isLoaded: boolean
  isLoading?: boolean
  hasError?: boolean
  refresh?: () => void
}
function CardsSection({ isLoaded, automationTool, searchEngine, isLoading, hasError }: CardsSectionProps) {
  if (isLoaded && !isLoading && !hasError) {
    return (
      <section className={styles.cards}>
        <Card
          iconDetected={automationDetectedSVG}
          iconNotDetected={automationNotDetectedSVG}
          title='Automation Tool'
          detected={automationTool}
          tipContent={
            <p>
              <strong>Automation tool detection</strong> is helpful when you need to know if your website is used by
              things like Puppeteer, Playwright and Selenium. These tools are used to create fake reviews, scrape your
              premium content and mass-register fake user accounts.
            </p>
          }
        />
        <Card
          iconDetected={searchEngineDetectedSVG}
          iconNotDetected={searchEngineNotDetectedSVG}
          title='Search Engine'
          detected={searchEngine}
          tipContent={
            <p>
              <strong>Search engine detection</strong> is important to know which bots should be ignored, because
              they&apos;re good and which should be protected against, because they&apos;re bad.
            </p>
          }
        />
      </section>
    )
  }
  return (
    <section className={styles.cards}>
      {repeatElement(2, (i) => (
        <LoadingCard key={i} error={hasError} />
      ))}
    </section>
  )
}

interface CardProps {
  iconDetected: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  iconNotDetected: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  tipContent: React.ReactNode
  detected?: boolean
}
function Card({
  iconDetected: IconDetected,
  iconNotDetected: IconNotDetected,
  title,
  detected,
  tipContent,
}: CardProps) {
  return (
    <div className={styles.card}>
      {detected ? (
        <div className={styles.iconContainer}>
          <IconDetected className={styles.botIcon} />
        </div>
      ) : (
        <div className={styles.iconContainer}>
          <IconNotDetected className={styles.botIcon} />
        </div>
      )}
      <div className={styles.info}>
        <div className={styles.botType}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <Tippy
            arrow
            placement='right'
            content={tipContent}
            theme='checkmark'
            maxWidth={448}
            popperOptions={{
              modifiers: [
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: ['bottom', 'left'],
                  },
                },
              ],
            }}
          >
            <InfoSvg tabIndex={0} className={styles.infoIcon} />
          </Tippy>
        </div>
        {detected ? <p className={styles.detected}>Detected</p> : <p className={styles.detected}>Not detected</p>}
      </div>
    </div>
  )
}

interface LoadingCarProps {
  error?: boolean
}

function LoadingCard({ error }: LoadingCarProps) {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        {error ? <ErrorIconSvg className={styles.botIcon} /> : <LoadingIconSvg className={styles.botIcon} />}
      </div>
      <div className={styles.info}>
        <div className={styles.botType}>
          <Skeleton height={24} width={114} className={classNames({ [styles.loadingError]: error })} />
        </div>
        <Skeleton height={24} width={136} className={classNames({ [styles.loadingError]: error })} />
      </div>
    </div>
  )
}

function CardHeader({ isLoaded, isBot, isLoading, hasError, refresh }: CardsSectionProps) {
  if (isLoaded && !isLoading && !hasError) {
    return isBot ? (
      <h2 className={styles.botSubTitle}>You are a bot</h2>
    ) : (
      <h2 className={styles.botSubTitle}>You are not a bot</h2>
    )
  }
  if (hasError && refresh) {
    return (
      <h2 className={styles.botSubTitle}>
        Bot detection failed
        <RefreshIconSvg className={styles.tryAgainIcon} onClick={() => refresh()} />
      </h2>
    )
  }
  return <h2 className={styles.botSubTitle}>Bot detection in progress...</h2>
}
