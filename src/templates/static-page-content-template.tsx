import React from 'react'
import InlineCta, { InlineCtaProps } from '../components/widgets/InlineCta'
import Hero, { HeroProps } from '../components/widgets/Hero'
import { LayoutTemplate } from '../components/Layout'
import AlternatingImagesText, { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import CardSection, { CardSectionProps } from '../components/widgets/CardSection'
import Container from '../components/common/Container'
import Section from '../components/common/Section'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import RelatedArticles from '../components/RelatedArticles/RelatedArticles'
import { PostProps } from '../components/Post/Post'

import styles from './static-page-content.module.scss'

export interface StaticPageContentTemplateProps {
  invertContent: boolean
  inlineCta: InlineCtaProps
  cardSection: CardSectionProps
  blocks: BlockWithImage[]
  hero: HeroProps
  content: PostProps
  relatedArticlesTitle: string
  breadcrumbs?: Array<Breadcrumb>
  isEditing?: boolean | null
}

export default function StaticPageContentTemplate({
  invertContent = false,
  inlineCta,
  cardSection,
  blocks,
  hero,
  content,
  relatedArticlesTitle,
  breadcrumbs,
  isEditing = false,
}: StaticPageContentTemplateProps) {
  return (
    <LayoutTemplate>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Hero {...hero} className={styles.widget} />
        {invertContent ? (
          <>
            {blocks.length > 0 && <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />}
            <CardSection {...cardSection} className={styles.widget} />
          </>
        ) : (
          <>
            <CardSection {...cardSection} className={styles.widget} />
            {blocks.length > 0 && <AlternatingImagesText title={''} blocks={blocks} className={styles.widget} />}
          </>
        )}
        <InlineCta {...inlineCta} />
        {!isEditing && (
          <Container size='large'>
            <RelatedArticles
              article={content}
              count={4}
              title={relatedArticlesTitle}
              titleIsCentered={true}
              limitPostLines={true}
            />
          </Container>
        )}
      </Section>
    </LayoutTemplate>
  )
}
