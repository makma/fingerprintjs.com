import React, { useEffect, useReducer } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { URL } from '../../../constants/content'
import { useBotD } from '../../../hooks/useBotDResponse'
import Tippy from '@tippyjs/react'
import Skeleton from '../../Skeleton/Skeleton'
import { scrollToElementById } from '../../../helpers/scrollToElemenBytID'
import { repeatElement } from '../../../helpers/repeatElement'

import { ReactComponent as GithubIconSvg } from './svg/GithubSVG.svg'

import { ReactComponent as automationDetectedSVG } from './svg/AutomationDetectedSVG.svg'
import { ReactComponent as automationNotDetectedSVG } from './svg/AutomationNotDetectedSVG.svg'
import { ReactComponent as browserNotDetectedSVG } from './svg/BrowserNotDetectedSVG.svg'
import { ReactComponent as browserDetectedSVG } from './svg/BrowserDetectedSVG.svg'
import { ReactComponent as searchEngineDetectedSVG } from './svg/SearchEngineDetectedSVG.svg'
import { ReactComponent as searchEngineNotDetectedSVG } from './svg/SearchEngineNotDetectedSVG.svg'
import { ReactComponent as virtualMDetectedSVG } from './svg/VirtualMDetectedSVG.svg'
import { ReactComponent as virtualMNotDetectedSVG } from './svg/VirtualMNotDetectedSVG.svg'
import { ReactComponent as InfoSvg } from './svg/InfoTipSVG.svg'
import { ReactComponent as LoadingIconSvg } from './svg/LoadingIconSVG.svg'

import styles from './HeroSection.module.scss'

interface DetectedBots {
  isBot: boolean
  automationTool: boolean
  browserSpoofing: boolean
  searchEngine: boolean
  vm: boolean
}
enum BotType {
  AutomationTool,
  BrowserSpoofing,
  SearchEngine,
  Vm,
}

type Action = { detected: BotType }

function botReducer(detectedBots: DetectedBots, updateDetectedBot: Action) {
  detectedBots = { ...detectedBots, isBot: true }

  switch (updateDetectedBot.detected) {
    case BotType.AutomationTool:
      return { ...detectedBots, automationTool: true }
    case BotType.BrowserSpoofing:
      return { ...detectedBots, browserSpoofing: true }
    case BotType.SearchEngine:
      return { ...detectedBots, searchEngine: true }
    case BotType.Vm:
      return { ...detectedBots, vm: true }
  }
}

export default function HeroSection() {
  const { visitorData, isLoading } = useBotD()

  const initialState = {
    isBot: false,
    automationTool: false,
    browserSpoofing: false,
    searchEngine: false,
    vm: false,
  }
  const [botState, dispatch] = useReducer(botReducer, initialState)

  useEffect(() => {
    if (visitorData) {
      if (visitorData.bot.automationTool.probability > 0) {
        dispatch({ detected: BotType.AutomationTool })
      }
      if (visitorData.bot.browserSpoofing.probability > 0) {
        dispatch({ detected: BotType.BrowserSpoofing })
      }
      if (visitorData.bot.searchEngine.probability > 0) {
        dispatch({ detected: BotType.SearchEngine })
      }
      if (visitorData.vm.probability > 0) {
        dispatch({ detected: BotType.Vm })
      }
    }
  }, [visitorData])

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
          <Button
            onClick={() => scrollToElementById('generateKeySection')}
            variant='primary'
            size='big'
            className={styles.button}
          >
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

          {isLoading ? (
            <h2 className={styles.subTitle}>Bot detection in progress...</h2>
          ) : botState.isBot ? (
            <h2 className={styles.subTitle}>You are a bot</h2>
          ) : (
            <h2 className={styles.subTitle}>You are not a bot</h2>
          )}
          <p className={styles.seeDetails}>See details →</p>
          <CardsSection {...botState} isLoading={isLoading} />
        </div>
      </Section>
    </Container>
  )
}

interface CardsSectionProps extends DetectedBots {
  isLoading?: boolean
}
function CardsSection({ automationTool, browserSpoofing, searchEngine, vm, isLoading }: CardsSectionProps) {
  if (isLoading) {
    return (
      <section className={styles.cards}>
        {repeatElement(4, (i) => (
          <LoadingCard key={i} />
        ))}
      </section>
    )
  } else {
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
        <Card
          iconDetected={browserDetectedSVG}
          iconNotDetected={browserNotDetectedSVG}
          title='Browser Spoofing'
          detected={browserSpoofing}
          tipContent={
            <p>
              <strong>Browser spoofing</strong> detection is helpful to know when headless browsers used to abuse your
              website pretend to be regular iPhones or Android devices.
            </p>
          }
        />
        <Card
          iconDetected={virtualMDetectedSVG}
          iconNotDetected={virtualMNotDetectedSVG}
          title='Virtual Machine'
          detected={vm}
          tipContent={
            <p>
              <strong>Virtual machine detection</strong> is useful to detect click farms, automated review fraud and
              junk content generation. It&apos;s a strong signal that improves the reliability and accuracy of the
              previous three detectors.
            </p>
          }
        />
      </section>
    )
  }
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
                    fallbackPlacements: ['bottom'],
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

function LoadingCard() {
  return (
    <div className={styles.card}>
      <div className={styles.iconContainer}>
        <LoadingIconSvg className={styles.botIcon} />
      </div>
      <div className={styles.info}>
        <div className={styles.botType}>
          <Skeleton height={24} width={114} />
        </div>
        <Skeleton height={24} width={136} />
      </div>
    </div>
  )
}
