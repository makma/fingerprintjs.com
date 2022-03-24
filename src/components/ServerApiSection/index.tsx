import React from 'react'
import { ReactComponent as ToolsSvg } from './tools.svg'
import { ReactComponent as IntegrationsSvg } from './integration.svg'
import Container from '../common/Container'
import Section from '../common/Section'
import ToolsTextBlock from '../common/ToolsTextBlock'
import CodeWindowWithSelector, { CodeTooltip } from '../common/CodeWindowWithSelector'
import styles from './ServerApiSection.module.scss'

export default function ServerApiSection() {
  return (
    <Section className={styles.flexibleApi}>
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Server API & Webhooks</h2>
          <div className={styles.tools}>
            <ToolsTextBlock
              icon={<ToolsSvg />}
              title={'Server-side visitor history API'}
              text={`Access suspicious visitor activity and geolocation at lightspeed.
              Integrate our API into your server-side business rules or signup process.`}
            />
            <ToolsTextBlock
              icon={<IntegrationsSvg />}
              title={'Webhooks for flexible workflows'}
              text={
                'Receive instant notifications delivered securely to your backend systems, ideal for building scalable and asynchronous processes.'
              }
            />
          </div>
        </header>
        <div className={styles.content}>
          <CodeWindowWithSelector
            codeBlocks={[
              {
                code: `{
  "visitorId": "Ibk1527CUFmcnjLwIs4A9",
  "visits": [
    {
      "incognito": true,
      "ip": "61.127.217.15",
      "ipLocation": { ... },
      "browserDetails": { ... }
    }
  ]
}`,
                language: 'javascript',
                type: '',
              },
            ]}
            tooltips={[
              <CodeTooltip key='visitorId' className={styles.visitorId}>
                <p>
                  A permanent <strong>visitorID</strong> that can be used to identify visitors trying to change their
                  identity via proxies or other techniques.
                </p>
              </CodeTooltip>,
              <CodeTooltip key='incognito' className={styles.incognito}>
                <p>
                  A true or false value that shows whether a visitor is using <strong>incognito</strong> mode.
                </p>
              </CodeTooltip>,
              <CodeTooltip key='ip' className={styles.ip}>
                <p>
                  <strong>IP address</strong> of the visit.
                </p>
              </CodeTooltip>,
              <CodeTooltip key='ipLocation' className={styles.ipLocation}>
                <p>
                  Provides the <strong>location</strong> of a visitor on a city level based on IP address of the visit.
                </p>
              </CodeTooltip>,
              <CodeTooltip key='browserDetails' className={styles.browserDetails}>
                <p>
                  Other <strong>details</strong> such as the name and version of the browser and operating system of the
                  visit.
                </p>
              </CodeTooltip>,
            ]}
          />
        </div>
      </Container>
    </Section>
  )
}
