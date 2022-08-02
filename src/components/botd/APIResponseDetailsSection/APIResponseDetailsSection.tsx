import React from 'react'
import Container from '../../common/Container'
import CodeWindowWithSelector, { CodeTooltip } from '../../common/CodeWindowWithSelector'
import { SuccessResponse } from '../../../types/botResponse'

import styles from './APIResponseDetailsSection.module.scss'

interface APIResponseDetailsSectionProps {
  visitorData?: SuccessResponse
}

export default function APIResponseDetailsSection({ visitorData }: APIResponseDetailsSectionProps) {
  const characterLength = 8.4

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
    "requestId": "${visitorData?.requestId ?? '1659120428936.yCYJSI'}",
    "products": {
        "botd": {
            "data": {
                "bot": {
                    "result": "${visitorData?.products.botd.data.bot.result ?? 'notDetected'}"
                },
                "ip": "${visitorData?.products.botd.data.ip ?? '186.XXX.XXX.XXX'}"
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
                key='requestId'
                className={styles.requestId}
                left={visitorData?.requestId ? 222 + visitorData.requestId.length * characterLength : 390}
              >
                <p>
                  <strong>Request ID</strong> is used to verify bot detection requests on the server.
                </p>
              </CodeTooltip>,
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
                    ? 260 + visitorData?.products.botd.data.ip.length * characterLength
                    : 384
                }
              >
                <p>
                  <strong>Client IP address.</strong>
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
