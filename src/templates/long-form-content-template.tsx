import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import Breadcrumbs, { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { Content } from '../components/Content/Content'
import RelatedArticles from '../components/RelatedArticles/RelatedArticles'
import { PostProps } from '../components/Post/Post'
import AuthorComponent, { Author } from '../components/Author/Author'
import CustomizableCTA, { CustomizableCTAProps } from '../components/CustomizableCTA/CustomizableCTA'
import HeroImageComponent, { HeroImageComponentProps } from '../components/HeroImage/HeroImage'
import TagList from '../components/TagList/TagList'
import classNames from 'classnames'

import ActionBar, { ActionBarProps } from '../components/ActionBar/ActionBar'

import styles from './long-form-content.module.scss'

export interface TemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  heroImage: HeroImageComponentProps
  post: PostProps
  body: string | React.ReactNode
  contentComponent?: React.FunctionComponent<{ content: string | React.ReactNode; className?: string }>
  breadcrumbs?: Array<Breadcrumb>
  authors?: Author[]
  publishDate?: string
  actionBar: ActionBarProps
  customCTA: CustomizableCTAProps
  tags: string[]
}

export default function LongFormContentTemplate({
  metadata,
  heroImage,
  post,
  body,
  contentComponent,
  breadcrumbs,
  authors = [],
  actionBar,
  customCTA,
  tags,
}: TemplateProps) {
  const ContentComponent = contentComponent ?? Content

  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && (
        <>
          <BreadcrumbsSEO breadcrumbs={breadcrumbs} />
          <Container size='large'>
            <Breadcrumbs breadcrumbs={breadcrumbs.slice(1)} />
          </Container>
        </>
      )}

      <Section className={styles.root}>
        <Container className={styles.container}>
          <header className={styles.header}>
            {tags && <TagList tagLink='/blog/tag/' tags={tags} format='title' tagsLimit={3} />}
            <h1 className={styles.title}>{post.title}</h1>
            <div className={classNames(styles.actionBar, styles.desktopOnly)}>
              <ActionBar {...actionBar} />
            </div>
          </header>
          {authors && (
            <div className={styles.authors}>
              {authors.map((author) => (
                <AuthorComponent key={author.name} author={author} className={styles.author} />
              ))}
            </div>
          )}
          <article className={styles.body}>
            <div className={classNames(styles.actionBar, styles.mobileOnly)}>
              <ActionBar {...actionBar} />
            </div>
            {heroImage.image && <HeroImageComponent {...heroImage} />}
            <ContentComponent content={body} className={styles.content} />
            {tags && (
              <div className={styles.footerTags}>
                <h3 className={styles.title}>All article tags</h3>
                <TagList tags={tags} format='title' />
              </div>
            )}
          </article>
          {customCTA.subHeader && (
            <aside className={styles.cta}>
              <CustomizableCTA className={styles.card} {...customCTA} />
            </aside>
          )}
        </Container>

        <Container size='large' className={styles.relatedArticles}>
          <RelatedArticles article={post} count={4} limitPostLines={true} />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}
