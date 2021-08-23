import { graphql } from 'gatsby'
import React from 'react'
import { LayoutTemplate } from '../components/Layout'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import { BASE_URL } from '../constants/content'
import Breadcrumbs, { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../helpers/types'
import { withTrailingSlash } from '../helpers/url'
import { Content, DangerouslyRenderHtmlContent } from '../components/Content/Content'
import RelatedArticles from '../components/RelatedArticles/RelatedArticles'
import { mapToPost, PostProps } from '../components/Post/Post'
import PreviewProviders from '../cms/PreviewProviders'
import AuthorComponent, { Author } from '../components/Author/Author'
import CustomizableCTA, { CustomizableCTAProps } from '../components/CustomizableCTA/CustomizableCTA'
import HeroImageComponent, { HeroImageComponentProps } from '../components/HeroImage/HeroImage'

import ActionBar, { ActionBarProps } from '../components/ActionBar/ActionBar'
import { ImageInfo } from '../components/common/PreviewCompatibleImage/PreviewCompatibleImage'

import styles from './long-form-content.module.scss'

interface LongFormContentProps {
  data: GatsbyTypes.LongFormContentQuery
  pageContext: GeneratedPageContext
}
export default function LongFormContent({ data, pageContext }: LongFormContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.metadata?.description === undefined ||
    data.markdownRemark?.frontmatter?.publishDate === undefined ||
    data.markdownRemark?.frontmatter?.tags === undefined ||
    data.markdownRemark?.html === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const post = mapToPost(data.markdownRemark)
  const heroImage = mapToHeroImage(data.markdownRemark.frontmatter.heroImage)
  const authors = mapToAuthors(data.markdownRemark.fields?.authors)
  const body = data.markdownRemark.html
  const publishDate = data.markdownRemark.frontmatter.publishDate
  const actionBar = mapToAction(data.markdownRemark.frontmatter)
  const customCTA = mapToCustomCta(data.markdownRemark.frontmatter.customCTA)

  return (
    <LongFormContentTemplate
      contentComponent={DangerouslyRenderHtmlContent}
      metadata={metadata}
      heroImage={heroImage}
      post={post}
      body={body}
      breadcrumbs={pageContext.breadcrumb.crumbs}
      authors={authors}
      publishDate={publishDate}
      actionBar={actionBar}
      customCTA={customCTA}
    />
  )
}

export const pageQuery = graphql`
  query LongFormContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        authors {
          frontmatter {
            title
            role
            photo {
              childImageSharp {
                fixed(width: 48, quality: 100) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
      frontmatter {
        metadata {
          title
          description
          url
          image {
            publicURL
          }
        }
        title
        tags
        featured
        publishDate
        heroImage {
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          imageAlt
          imageTitle
        }
        customCTA {
          title
          description
          ctaText
          ctaUrl
          openCtaNewTab
        }
      }
    }
  }
`

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
}
export function LongFormContentTemplate({
  metadata,
  heroImage,
  post,
  body,
  contentComponent,
  breadcrumbs,
  authors = [],
  actionBar,
  customCTA,
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
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.actionBar}>
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
            {heroImage.image && <HeroImageComponent {...heroImage} />}
            <ContentComponent content={body} className={styles.content} />
          </article>
          {customCTA.subHeader && (
            <aside className={styles.cta}>
              <CustomizableCTA className={styles.card} {...customCTA} />
            </aside>
          )}
        </Container>

        <Container size='large'>
          <RelatedArticles article={post} count={4} limitPostLines={true} />
        </Container>
      </Section>
    </LayoutTemplate>
  )
}

export function LongFormContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const heroImage = entry.getIn(['data', 'heroImage'])?.toJS() as QueryHeroImage
  const actionBar = entry.getIn(['data'])?.toJS() as QueryActionBar
  const customCTA = entry.getIn(['data', 'customCTA'])?.toJS() as QueryCustomCTA

  return (
    <PreviewProviders>
      <LongFormContentTemplate
        metadata={mapToMetadata(metadata)}
        heroImage={mapToHeroImage(heroImage)}
        post={mapToPost({ frontmatter: entry.get('data').toObject() })}
        body={widgetFor('body') ?? <></>}
        actionBar={mapToAction(actionBar)}
        customCTA={mapToCustomCta(customCTA, true)}
      />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
    image: `${BASE_URL}${queryMetadata?.image?.publicURL}` ?? '',
  } as GatsbyTypes.SiteSiteMetadata
}

type QueryAuthors = NonNullable<NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['fields']>['authors']
function mapToAuthors(queryAuthors?: QueryAuthors): Author[] {
  return (
    queryAuthors?.map((author) => {
      return {
        name: author?.frontmatter?.title ?? '',
        role: author?.frontmatter?.role ?? '',
        photo: author?.frontmatter?.photo as ImageInfo,
      }
    }) ?? []
  )
}

type QueryActionBar = NonNullable<NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']>
function mapToAction(queryAction: QueryActionBar): ActionBarProps {
  return {
    siteUrl: queryAction?.metadata?.url ?? '',
    publishDate: queryAction?.publishDate ?? '',
    description: queryAction?.metadata?.description ?? '',
    tags: queryAction?.tags ?? '',
  } as ActionBarProps
}

type QueryHeroImage = NonNullable<
  NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']
>['heroImage']
function mapToHeroImage(queryHeroImage: QueryHeroImage): HeroImageComponentProps {
  return {
    image: queryHeroImage?.image as ImageInfo,
    imageAlt: queryHeroImage?.imageAlt,
    imageTitle: queryHeroImage?.imageTitle,
  } as HeroImageComponentProps
}

type QueryCustomCTA = NonNullable<
  NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']
>['customCTA']
function mapToCustomCta(queryCustomCTA: QueryCustomCTA, preview = false): CustomizableCTAProps {
  return {
    subHeader: queryCustomCTA?.title,
    children: queryCustomCTA?.description,
    ctaHref: queryCustomCTA?.ctaUrl,
    ctaText: queryCustomCTA?.ctaText,
    hideWhenScroll: !preview,
    openCtaNewTab: queryCustomCTA?.openCtaNewTab,
  } as CustomizableCTAProps
}
