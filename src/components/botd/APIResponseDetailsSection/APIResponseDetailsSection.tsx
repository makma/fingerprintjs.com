import React from 'react'
import Container from '../../common/Container'
import CodeWindow from '../../common/CodeWindowWithSelector'
import Tippy from '@tippyjs/react'
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
          <CodeWindow
            singleCode={`{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "incognito": true,
      "ip": "61.127.217.15",
      "ipLocation": { ... },
      "browserDetails": { ... }
    }
  ]
}`}
            language='html'
          />
          <Tippy
            placement='right'
            theme='checkmark'
            maxWidth={450}
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
            content={
              <p>
                <strong>Browser spoofing</strong> detection is helpful to know when headless browsers used to abuse your
                website pretend to be regular iPhones or Android devices.
              </p>
            }
          >
            <InfoSvg tabIndex={0} className={styles.infoIcon} />
          </Tippy>
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
