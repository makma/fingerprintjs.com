import React from 'react'
import CodeWindowWithSelector from '../common/CodeWindowWithSelector'
import Container from '../common/Container'
import Section from '../common/Section'
import ToolsTextBlock from '../common/ToolsTextBlock'
import styles from './MadeForDevelopersSection.module.scss'

export default function MadeForDevelopersSection() {
  return (
    <Section className={styles.developerFriendly}>
      <Container size='large' className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>Made for developers</h2>
          <div className={styles.tools}>
            <ToolsTextBlock
              title={'Built on FingerprintJS, proven open-source library'}
              text={
                'Since 2012, Fingerprint has been used to identify billions of users. Our Pro solution was developed based on feedback to provide unparalleled accuracy, ease of use, and security.'
              }
            />
            <ToolsTextBlock
              title={'Use our Pro agent for serious accuracy'}
              text={
                'Get to 99.5% identification accuracy with the Custom subdomain and additional identification methods beyond fingerprinting.'
              }
            />
          </div>
        </header>
        <div className={styles.content}>
          <CodeWindowWithSelector
            codeBlocks={[
              {
                code: `import FP from '@fingerprintjs/fingerprintjs-pro';

FP.load({ apiKey })
  .then(fp => fp.get({ extendedResult: true }))
  .then(res => {
    console.log(res.visitorId);
    console.log(res.incognito);
  });`,
                language: 'javascript',
                type: '',
              },
            ]}
          />
        </div>
      </Container>
    </Section>
  )
}
