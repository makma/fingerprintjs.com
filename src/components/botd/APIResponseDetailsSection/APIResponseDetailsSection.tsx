import React from 'react'
import Container from '../../common/Container'
import CodeWindowWithSelector, { CodeTooltip } from '../../common/CodeWindowWithSelector'
import { useBotDContext } from '../../../context/BotdContext'

import styles from './APIResponseDetailsSection.module.scss'

export default function APIResponseDetailsSection() {
  const characterLength = 8.4
  const currentTime = new Date().toISOString()
  const { visitorData } = useBotDContext()

  return (
    <Container size='large' className={styles.container}>
      <h1 className={styles.title} id='ApiResponseDetails'>
        API response details
      </h1>
      <div className={styles.root}>
        <section className={styles.snippetSection}>
          <CodeWindowWithSelector
            codeBlocks={[
              {
                code: `{
    "products": {
        "botd": {
            "data": {
                "bot": {
                    "result": "${visitorData?.products.botd.data.bot.result ?? 'notDetected'}"
                },
                "ip": "${visitorData?.products.botd.data.ip ?? '186.XXX.XXX.XXX'}",
                "time": "${visitorData?.products.botd.data.time ?? currentTime}"
            }
        }
    }
}`,
                language: 'javascript',
                type: '',
              },
            ]}
            className={styles.apiJson}
            tooltips={[
              <CodeTooltip
                key='result'
                className={styles.result}
                left={
                  visitorData?.requestId
                    ? 326 + visitorData?.products.botd.data.bot.result.length * characterLength
                    : 420
                }
              >
                <p>
                  There are three possible results: <strong>good</strong> when the bot is a search engine,{' '}
                  <strong>bad</strong> when it is an automated tool, and <strong>notDetected</strong> when it is not
                  considered a bot.
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='ip'
                className={styles.ip}
                left={
                  visitorData?.products.botd.data.ip
                    ? 264 + visitorData?.products.botd.data.ip.length * characterLength
                    : 384
                }
              >
                <p>
                  <strong>Client IP address.</strong>
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='time'
                className={styles.time}
                left={
                  visitorData?.products.botd.data.time
                    ? 274 + visitorData?.products.botd.data.time.length * characterLength
                    : 274 + currentTime.length * characterLength
                }
              >
                <p>
                  <strong>Time</strong> when bot detection checks were performed for the client.
                </p>
              </CodeTooltip>,
            ]}
          />
        </section>
        <section className={styles.details}>
          <h2 className={styles.detailsTitle}>BotD provides a singular response with three available parameters.</h2>
          <p className={styles.description}>
            <span className={styles.strong}>&quot;Good&quot;</span> if the bot is a search engine or friendly crawler,{' '}
            <span className={styles.strong}>&quot;Bad&quot;</span> if the bot is an automated tool or virtual machine,
            and <span className={styles.strong}>&quot;Not Detected&quot;</span> if the visitor is not considered a bot.
          </p>
        </section>
      </div>
    </Container>
  )
}
