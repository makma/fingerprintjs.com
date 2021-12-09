import React from 'react'
import Container from '../../common/Container'
import CodeWindowWithSelector from '../../common/CodeWindowWithSelector'
import Tippy from '@tippyjs/react'
import classNames from 'classnames'
import { ReactComponent as InfoSvg } from './InfoIconSVG.svg'

import styles from './APIResponseDetailsSection.module.scss'

export default function GenerateKeySection() {
  return (
    <Container className={styles.container}>
      <h1 className={styles.title} id='ApiResponseDetails'>
        API response details
      </h1>
      <div className={styles.root}>
        <section className={styles.snippetSection}>
          <CodeWindowWithSelector
            codeBlocks={[
              {
                code: `{
  "bot":{
      "automationTool":{
        "status":"processed",
        "probability":0
      },
      "browserSpoofing":{
        "status":"processed",
        "probability":0
      },
      "searchEngine":{
        "status":"processed",
        "probability":0
      }
  },
  "vm":{
      "status":"processed",
      "probability":0
  },
  "ip":"186.XXX.XXX.XXX",
  "requestId":"01FP8C8FQ8P189KVFP88C5FHY5",
  "tag":""
}`,
                language: 'html',
                type: '',
              },
            ]}
            className={styles.apiJson}
            tooltips={[
              <Tooltip key='automationTool' className={styles.automationTool}>
                <p>
                  <strong>Automation tool detection</strong> is helpful when you need to know if your website is used by
                  things like Puppeteer, Playwright and Selenium. These tools are used to create fake reviews, scrape
                  your premium content and mass-register fake user accounts.
                </p>
              </Tooltip>,
              <Tooltip key='browserSpoofing' className={styles.browserSpoofing}>
                <p>
                  <strong>Browser spoofing</strong> detection is helpful to know when headless browsers used to abuse
                  your website pretend to be regular iPhones or Android devices.
                </p>
              </Tooltip>,
              <Tooltip key='searchEngine' className={styles.searchEngine}>
                <p>
                  <strong>Search engine detection</strong> is important to know which bots should be ignored, because
                  they&apos;re good and which should be protected against, because they&apos;re bad.
                </p>
              </Tooltip>,

              <Tooltip key='vm' className={styles.vm}>
                <p>
                  <strong>Virtual machine detection</strong> is useful to detect click farms, automated review fraud and
                  junk content generation. It&apos;s a strong signal that improves the reliability and accuracy of the
                  previous three detectors.
                </p>
              </Tooltip>,
            ]}
          />
        </section>
        <section className={styles.details}>
          <h2 className={styles.detailsTitle}>
            BotD comes with four useful detectors: automation tools, search engine, browser spoofing and virtual machine
            detection.
          </h2>
          <p className={styles.description}>
            Each detector result comes with a probability that you can use to make granular decision about blocking or
            mitigation strategies.
          </p>
        </section>
      </div>
    </Container>
  )
}

interface TooltipProps {
  children: React.ReactNode
  className: string
  key: string
}
function Tooltip({ children, className, key }: TooltipProps) {
  return (
    <Tippy
      key={key}
      placement='right'
      theme='checkmark'
      maxWidth={460}
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
      content={children}
    >
      <InfoSvg tabIndex={0} className={classNames(className, styles.infoIcon)} />
    </Tippy>
  )
}
