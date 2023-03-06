import React, { useState, useEffect } from 'react'
import Section from '../../common/Section'
import Container from '../../common/Container'
import Button from '../../common/Button'
import { CodeTooltip } from '../../common/CodeWindowWithSelector'
import { URL } from '../../../constants/content'

import styles from './GetBeyondSection.module.scss'

import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../../../helpers/fpjs'
import classNames from 'classnames'
import Prism from 'prismjs'
import { AnimatePresence, motion } from 'framer-motion'

import FingerprintJS, { GetResult } from '@fingerprintjs/fingerprintjs'

import { ReactComponent as TickSVG } from './TickSVG.svg'

export default function GetBeyondSection() {
  const characterLength = 8.41

  const [isProSelected, setIsProSelected] = useState(false)
  const [activeTabHighlight, setActiveTabHighlight] = useState(isProSelected)
  const { data, isLoading } = useVisitorData(getConfig)
  const [visitorData, setVisitorData] = useState<GetResult>()
  const [isLoadingOSS, setIsLoadingOSS] = useState(true)

  const handleSwitch = () => {
    setIsProSelected(!isProSelected)
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [activeTabHighlight, isLoading, visitorData, isLoadingOSS])

  const ossCode = `{
  "version": ${!isLoadingOSS && visitorData ? `"${visitorData?.version}"` : 'loading...'},
  "visitorId": ${!isLoadingOSS && visitorData ? `"${visitorData?.visitorId}"` : 'loading...'},
  "confidence": {
      "score": ${!isLoadingOSS && visitorData ? `${visitorData?.confidence.score}` : '0.5'},
      "comment": "0.995 if upgrade to Pro"      
    },
  "components": { ... },
}
   `
  const tooltipsOss = [
    <CodeTooltip
      theme='github'
      maxWidth={240}
      key='visitorId'
      className={styles.visitorIdOss}
      left={visitorData?.visitorId ? 205 + visitorData?.visitorId.length * characterLength : 470}
    >
      <h3 className={styles.tooltipTitleOss}>Visitor Id</h3>
      <p className={styles.tooltipText}>
        Every visitor to your website or app is assigned a unique and permanent identifier.
      </p>
    </CodeTooltip>,
    <CodeTooltip
      theme='github'
      maxWidth={240}
      key='score'
      className={styles.scoreOss}
      left={
        visitorData?.confidence.score ? 185 + visitorData?.confidence.score.toString().length * characterLength : 210
      }
    >
      <h3 className={styles.tooltipTitleOss}>Confidence</h3>
      <p className={styles.tooltipText}>
        This value reflects the system&apos;s degree of certainty that the visitor identifier is correct - given as a
        floating-point number between 0 and 1.
      </p>
    </CodeTooltip>,
  ]

  const proCode = `{
  "visitorId": ${isLoading ? 'loading...' : `"${data?.visitorId}"`},
  "confidence": { "score": ${isLoading ? 'loading...' : data?.confidence.score} },
  "botInformation": { ... },
  "incognito": ${isLoading ? 'loading...' : data?.incognito},
  "ip": ${isLoading ? 'loading...' : `"${data?.ip}"`},
  "ipLocation": { ... },
  "firstSeenAt": { ... },
  "lastSeenAt": { ... }
}`

  const tooltipsPro = [
    <CodeTooltip
      theme='github'
      maxWidth={240}
      key='visitorIdPro'
      left={data?.visitorId ? 205 + data?.visitorId.length * characterLength : 270}
      className={styles.visitorIdPro}
    >
      <h3 className={styles.tooltipTitle}>Visitor Id</h3>
      <p className={styles.tooltipText}>
        Every visitor to your website or app is assigned a unique and permanent identifier.
      </p>
    </CodeTooltip>,
    <CodeTooltip
      theme='github'
      maxWidth={280}
      key='confidence'
      left={data?.visitorId ? 305 + data?.confidence.score.toString().length * characterLength : 382}
      className={styles.confidencePro}
    >
      <h3 className={styles.tooltipTitle}>Confidence</h3>
      <p className={styles.tooltipText}>
        This value reflects the system&apos;s degree of certainty that the visitor identifier is correct - given as a
        floating-point number between 0 and 1.
      </p>
    </CodeTooltip>,
    <CodeTooltip theme='github' maxWidth={285} key='botInformation' className={styles.botInformationPro}>
      <h3 className={styles.tooltipTitle}>bot information</h3>
      <p className={styles.tooltipText}>
        Returns whether the current visitor is human, friendly automated traffic such as a search bot, or malicious.
      </p>
    </CodeTooltip>,
    <CodeTooltip theme='github' maxWidth={240} key='ipLocation' className={styles.ipLocationPro}>
      <h3 className={styles.tooltipTitle}>ip geolocation details</h3>
      <p className={styles.tooltipText}>City, Country, Timezone, etc</p>
    </CodeTooltip>,
    <CodeTooltip theme='github' maxWidth={247} key='lastSeenAt' className={styles.lastSeenAtPro}>
      <h3 className={styles.tooltipTitle}>First/last seen at</h3>
      <p className={styles.tooltipText}>
        When the visitor identifier was seen for the first time and last time - both are returned as ISO-8601 strings
        (UTC timezone, millisecond precision)
      </p>
    </CodeTooltip>,
  ]

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }

  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.1,
      },
    },
  }
  const letter = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.15,
        staggerChildren: 0.1,
      },
    },
  }

  useEffect(() => {
    async function getVisitorData() {
      try {
        setIsLoadingOSS(true)
        const fpPromise = FingerprintJS.load()
        const fp = await fpPromise
        const result = await fp.get()
        setVisitorData(result)
        setIsLoadingOSS(false)
      } catch (error) {
        setIsLoadingOSS(false)
        if (error instanceof Error) {
          error.message = `${error.name}: ${error.message}`
          error.name = 'FPJSAgentErrorOSS'
          throw error
        }
      }
    }

    getVisitorData()
  }, [])

  return (
    <Section className={styles.root}>
      <Container size='large' className={styles.container}>
        <h1 className={styles.title}>Go beyond browser fingerprinting</h1>
        <p className={styles.description}>
          Stop fraud and improve user experience with Fingerprint Pro&apos;s visitor identifier and advanced signals.{' '}
          <strong>Free for developers.</strong>
        </p>
        <div className={styles.tabSection}>
          <span className={styles.tab}>Open Source</span>
          <div className={classNames(styles.switch, { [styles.proOn]: isProSelected })} onClick={handleSwitch}>
            <motion.div className={styles.handle} layout transition={spring} />
          </div>
          <span className={classNames(styles.tab, { [styles.tabProOn]: isProSelected })}>Fingerprint Pro</span>
        </div>
        <div className={styles.content}>
          <AnimatePresence initial={true} mode='wait' onExitComplete={() => setActiveTabHighlight(isProSelected)}>
            <motion.div
              key={isProSelected ? 'pro' : 'oss'}
              initial='hidden'
              animate='visible'
              exit={{ opacity: 0 }}
              variants={sentence}
              transition={{ duration: 0.4 }}
            >
              {isProSelected ? (
                <>
                  <div className={classNames(styles.card, styles.integrations)}>
                    <span className={styles.number}>+9</span>
                    <span>integrations</span>
                  </div>
                  <div className={classNames(styles.card, styles.accuracyPro)}>
                    <span>accuracy</span>
                    <span className={styles.percent}>99.5%</span>
                  </div>
                  <pre className='line-numbers language-js' tabIndex={0}>
                    <motion.code key={`proTooltip`} className='language-js' variants={letter}>
                      {proCode}
                    </motion.code>

                    <motion.div variants={letter} className={styles.tooltipSection}>
                      {tooltipsPro.map((tooltip) => tooltip)}
                    </motion.div>
                  </pre>
                </>
              ) : (
                <>
                  <div className={classNames(styles.card, styles.noIntegrations)}>
                    <span>no integrations available</span>
                  </div>
                  <div className={classNames(styles.card, styles.accuracyOss)}>
                    <span>accuracy</span>
                    <span className={styles.percent}>60%</span>
                  </div>
                  <pre className='line-numbers language-js' tabIndex={0}>
                    <motion.code key={`ossTooltip`} className='language-js' variants={letter}>
                      {ossCode}
                    </motion.code>

                    <motion.div variants={letter} className={styles.tooltipSection}>
                      {tooltipsOss.map((tooltip) => tooltip)}
                    </motion.div>
                  </pre>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <Button size='big' href={URL.signupUrl} className={styles.button} buttonId='create_free_account_github_hero'>
          Create Free Account
        </Button>
        <div className={styles.tips}>
          <BottomTip>Free for developers</BottomTip>
          <BottomTip>GDPR/CCPA Compliant</BottomTip>
          <BottomTip>Get Started in 10 minutes</BottomTip>
        </div>
      </Container>
    </Section>
  )
}

interface BottomTipProps {
  children: string
}
function BottomTip({ children }: BottomTipProps) {
  return (
    <span className={styles.bottomTip}>
      <TickSVG />
      {children}
    </span>
  )
}
