import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'
import Container from '../../components/common/Container'
import RelatedArticles from '../../components/RelatedArticles/RelatedArticles'
import { PostProps } from '../../components/Post/Post'

import HeroSection from '../../components/botd/HeroSection/HeroSection'
import GenerateKeySection from '../../components/botd/GenerateKeySection/GenerateKeySection'
import APIResponseDetailsSection from '../../components/botd/APIResponseDetailsSection/APIResponseDetailsSection'
import DocumentationSection from '../../components/botd/DocumentationSection/DocumentationSection'
import IntegrationSection from '../../components/botd/IntegrationSection/IntegrationSection'
import FeaturesSection from '../../components/botd/FeaturesSection/FeaturesSection'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

import styles from './botd.module.scss'

interface AccountSharingProps {
  pageContext: GeneratedPageContext
}
export default function Botd({ pageContext }: AccountSharingProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'TOpen Source JavaScript Bot Detection Library - BotDODO',
    description:
      'Identify bots in real time with our developer-friendly library. Detect automation tools, search bots, virtual machines and browser spoofing.',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const content: PostProps = {
    title: '',
    description: '',
    publishDate: '',
    path: '/',
    tags: ['bot attacks'],
  }
  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <GenerateKeySection />
      <APIResponseDetailsSection />
      <DocumentationSection />
      <IntegrationSection />
      <FeaturesSection />
      <Container size='large' className={styles.relatedArticles}>
        <RelatedArticles article={content} count={4} title='BotD related articles' titleIsCentered limitPostLines />
      </Container>
    </LayoutTemplate>
  )
}
