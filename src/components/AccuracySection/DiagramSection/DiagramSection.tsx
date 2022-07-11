import React, { useState, useEffect } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import styles from './DiagramSection.module.scss'
import classNames from 'classnames'
import { withPrefix } from 'gatsby'
import { Helmet } from 'react-helmet'

import { ReactComponent as TickSVG } from './img/TickSVG.svg'
import { ReactComponent as CrossSVG } from './img/CrossSVG.svg'
import After from '-!svg-react-loader!../../../../static/img/diagram-section/after.inline.svg'
import AccuracyText from '-!svg-react-loader!../../../../static/img/diagram-section/accuracy.inline.svg'

enum tabOptions {
  BeforePro,
  AfterPro,
}

export default function DiagramSection() {
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
  }, [isActive, timeoutId])

  useEffect(() => {
    if (currentTab === tabOptions.AfterPro) {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const background = document.getElementById('backgroundafter') as any
      const text = document.getElementById('ebJ3ZqH7pWA1') as any
      /* eslint-enable @typescript-eslint/no-explicit-any  */

      const playerBack = background ? background.svgatorPlayer : {}
      const playerText = text ? text.svgatorPlayer : {}
      if (playerBack.play && playerText.play) {
        playerBack.stop()
        playerText.stop()

        setTimeout(() => {
          playerBack.play()
          playerText.play()
        }, 750)
      }
    }
  }, [currentTab])

  return (
    <>
      <Helmet>
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/background.svg')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/after.inline.svg')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/blank.svg')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundTabletBefore.svg')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundTabletAfter.png')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundMobileBefore.svg')} />
        <link rel='preload' as='image' href={withPrefix('/img/diagram-section/backgroundMobileAfter.png')} />
      </Helmet>

      <Section className={styles.root}>
        <Container size='large' className={styles.container}>
          <Tabs currentTab={currentTab} setCurrentTab={handleSwitch} className={styles.mobileTabs} />
          <div className={styles.card}>
            <Tabs currentTab={currentTab} setCurrentTab={handleSwitch} className={styles.tabs} />
            <span
              className={classNames(styles.accuracyDescription, {
                [styles.afterAccuracyDescription]: currentTab === tabOptions.AfterPro,
              })}
            >
              {currentTab === tabOptions.BeforePro
                ? 'Low accuracy identification makes it impossible to separate trusted from suspicious traffic.'
                : 'With accurate visitorID history, you can challenge untrusted traffic while personalizing experiences for trusted visitors.'}
              {currentTab === tabOptions.AfterPro && <AccuracyText className={styles.accuracyTextAnimated} />}
            </span>
            <div
              className={classNames(styles.diagram, {
                [styles.afterBackground]: currentTab === tabOptions.AfterPro,
              })}
            >
              <After
                className={classNames(styles.afterSvgAnimated, {
                  [styles.isVisible]: currentTab === tabOptions.AfterPro,
                })}
              />

              {currentTab === tabOptions.BeforePro && (
                <span className={styles.otherServices}>
                  Other services <strong>can only accurately identify 60%</strong> of returning visitors
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
        </Container>
      </Section>
    </>
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
          [styles.showButton]: currentTab === tabOptions.AfterPro,
        })}
        onClick={() => setCurrentTab(tabOptions.AfterPro)}
      >
        After Pro
      </Button>
    </div>
  )
}
