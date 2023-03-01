import React, { useEffect, useState } from 'react'
import Container from '../../common/Container'
import CodeWindowWithSelector, { CodeTooltip } from '../../common/CodeWindowWithSelector'
import { useBotDContext } from '../../../context/BotdContext'

import styles from './APIResponseDetailsSection.module.scss'

export default function APIResponseDetailsSection() {
  const characterLength = 8.4
  const { visitorData } = useBotDContext()
  const botData = visitorData?.products.botd.data

  const [codeBlock, setCodeBlock] = useState(
    `{
    "products": {
        "botd": {
            "data": {
                "bot": {
                    "result": "notDetected"
                    "type":
                },
                "ip": "186.XXX.XXX.XXX",
                "time": "loading",
                "url": "https://fingerprint.com/products/bot-detection/",
                "userAgent": "Mozilla/5.0",
                "requestId": "1672692443036.aCJ3kO"
            }
        }
    }
}`
  )

  useEffect(() => {
    if (botData) {
      setCodeBlock(`{
    "products": {
        "botd": {
            "data": {
                "bot": {
                    "result": "${botData?.bot.result ?? 'notDetected'}"
                    "type": ${botData?.bot.type ? '"' + botData.bot.type + '"' : ''}
                },
                "ip": "${botData?.ip ?? '186.XXX.XXX.XXX'}",
                "time": "${botData?.time ?? 'loading'}",
                "url": "${botData?.url ?? 'https://fingerprint.com/products/bot-detection/'}",
                "userAgent": "${botData?.userAgent ?? 'Mozilla/5.0'}",
                "requestId": "${botData?.requestId ?? '1672692443036.aCJ3kO'}"
            }
        }
    }
  }`)
    }
  }, [botData])

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
                code: codeBlock,
                language: 'javascript',
                type: '',
              },
            ]}
            className={styles.apiJson}
            tooltips={[
              <CodeTooltip
                key='result'
                className={styles.result}
                left={botData?.bot.result.length ? 326 + botData?.bot.result.length * characterLength : 420}
              >
                <p>
                  There are three possible results: <strong>good</strong> when the bot is a search engine,{' '}
                  <strong>bad</strong> when it is an automated tool, and <strong>notDetected</strong> when it is not
                  considered a bot.
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='type'
                className={styles.type}
                left={botData?.bot.type ? 309 + botData?.bot.type.length * characterLength : 284}
              >
                <p>
                  Name of the <strong>automation tool</strong> which was used for the request.
                  <br />
                  <br />
                  <i>
                    This is an optional field only present if the <strong>bot result</strong> is <strong>good</strong>{' '}
                    or <strong>bad</strong>.
                  </i>
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='ip'
                className={styles.ip}
                left={botData?.ip ? 264 + botData?.ip.length * characterLength : 390}
              >
                <p>
                  <strong>Client IP address.</strong>
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='time'
                className={styles.time}
                left={botData?.time ? 280 + botData?.time.length * characterLength : 304}
              >
                <p>
                  <strong>Time</strong> when bot detection checks were performed for the client.
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='url'
                className={styles.url}
                left={botData?.url ? 271 + botData?.url.length * characterLength : 665}
              >
                <p>
                  <strong>Url</strong> of the page where BotD was executed.
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='userAgent'
                className={styles.userAgent}
                left={botData?.userAgent ? 321 + botData?.userAgent.length * characterLength : 409}
              >
                <p>
                  <strong>Client User Agent.</strong>
                </p>
              </CodeTooltip>,
              <CodeTooltip
                key='requestId'
                className={styles.requestId}
                left={botData?.requestId ? 318 + botData?.requestId.length * characterLength : 485}
              >
                <p>
                  A <strong>request identifier</strong> that changes with every request.
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
