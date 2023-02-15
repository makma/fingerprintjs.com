import React, { useState, useEffect } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import styles from './DiagramSection.module.scss'
import classNames from 'classnames'

import { ReactComponent as TickSVG } from './img/TickSVG.svg'
import { ReactComponent as CrossSVG } from './img/CrossSVG.svg'

enum tabOptions {
  BeforePro,
  AfterPro,
}
interface DiagramSectionProps {
  className?: string
  box?: boolean
  whiteBackground?: boolean
}
export default function DiagramSection({ className, box, whiteBackground }: DiagramSectionProps) {
  const [currentTab, setCurrentTab] = useState(tabOptions.BeforePro)
  const [isActive, setIsActive] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

  const handleSwitch = (tabOption: tabOptions) => {
    setIsActive(true)
    setCurrentTab(tabOption)
  }

  useEffect(() => {
    if (!isActive && !timeoutId) {
      const timeoutID = setTimeout(() => setCurrentTab(tabOptions.AfterPro), 7000)
      setTimeoutId(timeoutID)
    } else if (isActive && timeoutId) {
      clearTimeout(timeoutId)
    }
    return () => clearTimeout(timeoutId)
  }, [isActive, timeoutId])

  return (
    <Section className={classNames(className, styles.root, { [styles.whiteButton]: whiteBackground })}>
      <Container size='large' className={styles.container}>
        <Tabs currentTab={currentTab} setCurrentTab={handleSwitch} className={styles.mobileTabs} />
        <div className={styles.card}>
          <Tabs currentTab={currentTab} setCurrentTab={handleSwitch} className={styles.tabs} />
          <span className={styles.accuracyDescription}>
            {currentTab === tabOptions.BeforePro
              ? 'Low accuracy identification makes it impossible to separate trusted from suspicious traffic.'
              : 'With accurate visitorID history, you can challenge untrusted traffic while personalizing experiences for trusted visitors.'}
          </span>
          <div
            className={classNames(styles.diagram, {
              [styles.afterBackground]: currentTab === tabOptions.AfterPro,
            })}
          >
            {currentTab === tabOptions.BeforePro && (
              <span className={styles.otherServices}>
                Other services{' '}
                <strong>
                  can only <br /> accurately identify 60% <br />
                </strong>
                of returning visitors
              </span>
            )}
            {currentTab === tabOptions.AfterPro && (
              <>
                <span className={styles.fingerService}>
                  Fingerprint assigns a VisitorID, identifying returning visitors with <strong>99.5% accuracy</strong>
                </span>
                <span className={styles.visitor}>Visitor</span>
                <span className={styles.visitorId}>VisitorID </span>
                <span className={styles.trusted}>
                  <TickSVG />
                  Trusted
                </span>
                <span className={styles.suspicious}>
                  <CrossSVG />
                  Suspicious
                </span>
              </>
            )}
            <span className={styles.incomingFlow}>Incoming flow of unidentified clients</span>
          </div>
        </div>
        {box && (
          <span className={styles.externalBox}>
            Fingerprint uses an innovative combination of browser fingerprinting, IP/URL analysis, device analysis, and
            machine learning to accurately identify up to 99.5% of unique visitors.
          </span>
        )}
      </Container>
    </Section>
  )
}

interface TabsProps {
  currentTab: tabOptions
  setCurrentTab: (tabOption: tabOptions) => void
  className: string
}

function Tabs({ currentTab, setCurrentTab, className }: TabsProps) {
  return (
    <div className={className}>
      <Button
        variant='white'
        size='big'
        className={classNames(styles.selectButton, {
          [styles.showButton]: currentTab === tabOptions.BeforePro,
        })}
        onClick={() => setCurrentTab(tabOptions.BeforePro)}
      >
        Before Pro
      </Button>
      <Button
        variant='white'
        size='big'
        className={classNames(styles.selectButton, {
          [styles.showButtonPro]: currentTab === tabOptions.AfterPro,
        })}
        onClick={() => setCurrentTab(tabOptions.AfterPro)}
      >
        After Pro
      </Button>
    </div>
  )
}
