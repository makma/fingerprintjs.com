import React, { useEffect } from 'react'
import Container from '../../common/Container'
import Section from '../../common/Section'
import { CodeTooltip } from '../../common/CodeWindowWithSelector'
import styles from './MadeForDevelopers.module.scss'
import classNames from 'classnames'
import Prism from 'prismjs'

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../../../helpers/fpjs'

export default function MadeForDevelopers() {
  const characterLength = 8.41
  const { data, isLoading } = useVisitorData(getConfig)

  useEffect(() => {
    Prism.highlightAll()
  }, [isLoading])

  const proCode = `{
  "visitorId": ${isLoading ? 'loading...' : `"${data?.visitorId}"`},
  "visits": [
    {
      "incognito": ${isLoading ? 'loading...' : data?.incognito},
      "ip": ${isLoading ? 'loading...' : `"${data?.ip}"`},
      "ipLocation": { ... },
      "browserDetails": { ... },
    }
  ]
}`
  return (
    <Section className={styles.root}>
      <Container size='large'>
        <div className={styles.titleSection}>
          <h2 className={styles.title}>Made for developers</h2>
          <p className={styles.description}>
            Build the most accurate device and browser identifier into your fraud prevention or user experience
            workflows easily.
          </p>
        </div>
        <div className={styles.container}>
          <section className={styles.content}>
            <div className={styles.header}>
              <div className={styles.button} />
              <div className={styles.button} />
              <div className={styles.button} />
            </div>
            <pre>
              <code key={`proTooltip`} className={classNames({ 'line-numbers': true }, `language-js`)}>
                {proCode}
              </code>

              <div className={styles.tooltipSection}>
                <CodeTooltip
                  key='visitorId'
                  className={styles.visitorId}
                  theme='github'
                  maxWidth={240}
                  left={data?.visitorId ? 255 + data?.visitorId.length * characterLength : 315}
                >
                  <p>
                    A permanent <strong>visitorID</strong> that can be used to identify visitors trying to change their
                    identity via proxies or other techniques.
                  </p>
                </CodeTooltip>

                <CodeTooltip key='visits' className={styles.visits} theme='github' maxWidth={240}>
                  <p>
                    A <strong>history of visits</strong> for this visitorID. Annotate each visit with a custom metadata
                    tag to have a full trail of individual user activity.
                  </p>
                </CodeTooltip>

                <CodeTooltip key='incognito' className={styles.incognito} theme='github' maxWidth={240}>
                  <p>
                    A true or false value that shows whether a visitor is using <strong>incognito</strong> mode.
                  </p>
                </CodeTooltip>

                <CodeTooltip key='ip' className={styles.ip} theme='github' maxWidth={240}>
                  <p>
                    <strong>IP address</strong> of the visit.
                  </p>
                </CodeTooltip>

                <CodeTooltip key='ipLocation' className={styles.ipLocation} theme='github' maxWidth={240}>
                  <p>
                    Provides the <strong>location</strong> of a visitor on a city level based on IP address of the
                    visit.
                  </p>
                </CodeTooltip>

                <CodeTooltip key='browserDetails' className={styles.browserDetails} theme='github' maxWidth={240}>
                  <p>
                    Other <strong>details</strong> such as the name and version of the browser and operating system of
                    the visit.
                  </p>
                </CodeTooltip>
              </div>
            </pre>
          </section>
          <section className={styles.featuresSection}>
            <div className={styles.cards}>
              <Card
                title='Built on FingerprintJS, proven open-source library'
                description='Since 2012, Fingerprint has been used to identify billions of users. Our Pro solution was developed based on feedback to provide unparalleled accuracy, ease of use, and security.'
              />
              <Card
                title='Server-side visitor history API'
                description='Access suspicious visitor activity and geolocation at lightspeed. Integrate our API into your server-side business rules or signup process.'
              />
              <Card
                title='Webhooks for flexible workflows'
                description='Receive instant notifications delivered securely to your backend systems, ideal for building scalable and asynchronous processes.'
              />
            </div>
          </section>
        </div>
      </Container>
    </Section>
  )
}

interface CardProps {
  title: string
  description: string
}
function Card({ title, description }: CardProps) {
  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  )
}
