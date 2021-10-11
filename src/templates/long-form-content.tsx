import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { BASE_URL } from '../constants/content'
import { GeneratedPageContext } from '../helpers/types'
import { withTrailingSlash } from '../helpers/url'
import { DangerouslyRenderHtmlContent } from '../components/Content/Content'
import { mapToPost } from '../components/Post/Post'
import PreviewProviders from '../cms/PreviewProviders'
import { Author } from '../components/Author/Author'
import { CustomizableCTAProps } from '../components/CustomizableCTA/CustomizableCTA'
import { HeroImageComponentProps } from '../components/HeroImage/HeroImage'

import { ActionBarProps } from '../components/ActionBar/ActionBar'
import { ImageInfo } from '../components/common/PreviewCompatibleImage/PreviewCompatibleImage'
import LongFormContentTemplate from './long-form-content-template'

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
  const tags = data.markdownRemark.frontmatter.tags as string[]

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
      tags={tags}
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
                gatsbyImageData(placeholder: BLURRED, width: 48, height: 48, quality: 100, layout: FIXED)
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
          socialImage {
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
              gatsbyImageData(placeholder: BLURRED, quality: 100, layout: FULL_WIDTH)
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

// The following function is necessary to export it to use it in the CMS, added lint disable to avoid limited exports page warning
// eslint-disable-next-line
export function LongFormContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const heroImage = entry.getIn(['data', 'heroImage'])?.toJS() as QueryHeroImage
  const actionBar = entry.getIn(['data'])?.toJS() as QueryActionBar
  const customCTA = entry.getIn(['data', 'customCTA'])?.toJS() as QueryCustomCTA
  const tags = entry.getIn(['data', 'tags'])

  return (
    <PreviewProviders>
      <LongFormContentTemplate
        metadata={mapToMetadata(metadata)}
        heroImage={mapToHeroImage(heroImage)}
        post={mapToPost({ frontmatter: entry.get('data').toObject() })}
        body={widgetFor('body') ?? <></>}
        actionBar={mapToAction(actionBar)}
        customCTA={mapToCustomCta(customCTA, true)}
        tags={tags}
      />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.LongFormContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  const imageUrl = queryMetadata?.socialImage?.publicURL ?? queryMetadata?.image?.publicURL

  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
    image: `${BASE_URL}${imageUrl}` ?? '',
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
