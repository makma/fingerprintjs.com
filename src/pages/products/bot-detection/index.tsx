import React from 'react'
import { LayoutTemplate } from '../../../components/Layout'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../../helpers/types'
import Container from '../../../components/common/Container'
import RelatedArticles from '../../../components/RelatedArticles/RelatedArticles'

import HeroSection from '../../../components/botd/HeroSection/HeroSection'
import GenerateKeySection from '../../../components/botd/GenerateKeySection/GenerateKeySection'
import APIResponseDetailsSection from '../../../components/botd/APIResponseDetailsSection/APIResponseDetailsSection'
import DocumentationSection from '../../../components/botd/DocumentationSection/DocumentationSection'
import IntegrationSection from '../../../components/botd/IntegrationSection/IntegrationSection'
import FeaturesSection from '../../../components/botd/FeaturesSection/FeaturesSection'
import FaqSection from '../../../components/botd/FaqSection/FaqSection'
import JoinCommunitySection from '../../../components/JoinCommunitySection/JoinCommunitySection'

import { URL } from '../../../constants/content'

import { HeadProps } from 'gatsby'
import { SEO } from '../../../components/SEO/SEO'

import { useBotD } from '../../../hooks/useBotD'

import styles from './botd.module.scss'

interface AccountSharingProps {
  pageContext: GeneratedPageContext
}
export default function Botd({ pageContext }: AccountSharingProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { visitorData, isLoading, hasError, refresh } = useBotD()
  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection visitorData={visitorData} isLoading={isLoading} hasError={hasError} refresh={refresh} />
      <GenerateKeySection />
      <APIResponseDetailsSection visitorData={visitorData} />
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
