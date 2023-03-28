import React, { useEffect, useState } from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'
import Container from '../../../components/common/Container'
import RelatedArticles from '../../../components/RelatedArticles/RelatedArticles'
import { useBotDContext } from '../../../context/BotdContext'
import { SEO } from '../../../components/SEO/SEO'
import { URL, BASE_URL } from '../../../constants/content'
import { getErrorMessage } from '../../../helpers/error'
import { RECAPTCHA_BOTD_PUBLIC_KEY } from '../../../constants/env'

import HeroSection from '../../../components/botd/HeroSection/HeroSection'
import GenerateKeySection from '../../../components/botd/GenerateKeySection/GenerateKeySection'
import APIResponseDetailsSection from '../../../components/botd/APIResponseDetailsSection/APIResponseDetailsSection'
import DocumentationSection from '../../../components/botd/DocumentationSection/DocumentationSection'
import IntegrationSection from '../../../components/botd/IntegrationSection/IntegrationSection'
import FeaturesSection from '../../../components/botd/FeaturesSection/FeaturesSection'
import FaqSection from '../../../components/botd/FaqSection/FaqSection'
import JoinCommunitySection from '../../../components/JoinCommunitySection/JoinCommunitySection'

import { HeadProps, Script } from 'gatsby'
import axios from 'axios'
import { useRollbar } from '@rollbar/react'

import styles from './botd.module.scss'

interface BotdProps {
  pageContext: GeneratedPageContext
}

export default function Botd({ pageContext }: BotdProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const { visitorData, requestId } = useBotDContext()
  const rollbar = useRollbar()

  useEffect(() => {
    const executeReCaptcha = async () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        try {
          const token = await window.grecaptcha.execute(RECAPTCHA_BOTD_PUBLIC_KEY, {
            action: 'botd',
          })
          await axios.post(`${BASE_URL}/api/validation/`, {
            token,
            isBot: visitorData?.products?.botd?.data?.bot?.result !== 'notDetected',
            requestId,
          })
        } catch (error) {
          rollbar.error('reCAPTCHA error', getErrorMessage(error))
        }
      }
    }

    if (scriptLoaded && visitorData) {
      window.grecaptcha.ready(executeReCaptcha)
    }
  }, [scriptLoaded, visitorData, requestId, rollbar])
  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_BOTD_PUBLIC_KEY}`}
        async
        defer
        onLoad={() => setScriptLoaded(true)}
        strategy={'idle'}
      />
      <HeroSection />
      <GenerateKeySection />
      <APIResponseDetailsSection />
      <DocumentationSection />
      <IntegrationSection />
      <FeaturesSection />
      <FaqSection />
      <JoinCommunitySection
        title='Join our growing community'
        discordLink={URL.discordServerURL}
        githubLink={URL.botDRepoUrl}
        labels={['+20K downloads', '+58M API requests']}
      >
        BotD is an open source project supported by contributing developers across the globe.
      </JoinCommunitySection>
      <Container size='large' className={styles.relatedArticles}>
        <RelatedArticles
          article={{
            tags: ['bot attacks'],
          }}
          count={4}
          title='BotD related articles'
          titleIsCentered
          limitPostLines
        />
      </Container>
    </LayoutTemplate>
  )
}

export function Head(props: HeadProps) {
  return (
    <SEO
      pathname={props.location.pathname}
      title='Open Source JavaScript Bot Detection Library - BotD'
      description='Identify bots in real time with our developer-friendly library. Detect automation tools, search bots, virtual machines and browser spoofing.'
    />
  )
}
