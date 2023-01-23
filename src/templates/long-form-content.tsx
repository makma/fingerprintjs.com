import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { GeneratedPageContext } from '../helpers/types'
import { DangerouslyRenderHtmlContent } from '../components/Content/Content'
import { mapToPost } from '../components/Post/Post'
import PreviewProviders from '../cms/PreviewProviders'
import { Author } from '../components/Author/Author'
import { CustomizableCTAProps } from '../components/CustomizableCTA/CustomizableCTA'
import { HeroImageComponentProps } from '../components/HeroImage/HeroImage'

import { ActionBarProps } from '../components/ActionBar/ActionBar'
import { ImageInfo } from '../components/common/PreviewCompatibleImage/PreviewCompatibleImage'
import LongFormContentTemplate from './long-form-content-template'

import { SEO } from '../components/SEO/SEO'

interface LongFormContentProps {
  data: Queries.LongFormContentQuery
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

  const post = mapToPost(data.markdownRemark)
  const heroImage = mapToHeroImage(data.markdownRemark.frontmatter.heroImage)
  const authors = mapToAuthors(data.markdownRemark.fields?.authors)
  const body = data.markdownRemark.html
  const publishDate = data.markdownRemark.frontmatter.publishDate
  const actionBar = mapToAction(data.markdownRemark.frontmatter)
  const customCTA = mapToCustomCta(data.markdownRemark.frontmatter.customCTA)
  const tags = data.markdownRemark.frontmatter.tags as string[]
  const isHidden = data.markdownRemark.frontmatter.isHidden

  return (
    <LongFormContentTemplate
      contentComponent={DangerouslyRenderHtmlContent}
      heroImage={heroImage}
      post={post}
      body={body}
      breadcrumbs={pageContext.breadcrumb.crumbs}
      authors={authors}
      publishDate={publishDate}
      actionBar={actionBar}
      customCTA={customCTA}
      tags={tags}
      isHidden={isHidden}
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
            publicURL
            extension
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
        isHidden
      }
    }
  }
`

// The following function is necessary to export it to use it in the CMS, added lint disable to avoid limited exports page warning
// eslint-disable-next-line
export function LongFormContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const heroImage = entry.getIn(['data', 'heroImage'])?.toJS() as QueryHeroImage
  const actionBar = entry.getIn(['data'])?.toJS() as QueryActionBar
  const customCTA = entry.getIn(['data', 'customCTA'])?.toJS() as QueryCustomCTA
  const tags = entry.getIn(['data', 'tags'])

  return (
    <PreviewProviders>
      <LongFormContentTemplate
        heroImage={mapToHeroImage(heroImage)}
        post={mapToPost({ frontmatter: entry.get('data').toObject() })}
        body={widgetFor('body') ?? <></>}
        actionBar={mapToAction(actionBar)}
        customCTA={mapToCustomCta(customCTA, true)}
        tags={tags}
        isEditing
      />
    </PreviewProviders>
  )
}

type QueryAuthors = NonNullable<NonNullable<Queries.LongFormContentQuery['markdownRemark']>['fields']>['authors']
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

type QueryActionBar = NonNullable<NonNullable<Queries.LongFormContentQuery['markdownRemark']>['frontmatter']>
function mapToAction(queryAction: QueryActionBar): ActionBarProps {
  return {
    siteUrl: queryAction?.metadata?.url ?? '',
    publishDate: queryAction?.publishDate ?? '',
    description: queryAction?.metadata?.description ?? '',
    tags: queryAction?.tags ?? '',
  } as ActionBarProps
}

type QueryHeroImage = NonNullable<
  NonNullable<Queries.LongFormContentQuery['markdownRemark']>['frontmatter']
>['heroImage']
function mapToHeroImage(queryHeroImage: QueryHeroImage): HeroImageComponentProps {
  return {
    image: queryHeroImage?.image as ImageInfo,
    imageAlt: queryHeroImage?.imageAlt,
    imageTitle: queryHeroImage?.imageTitle,
  } as HeroImageComponentProps
}

type QueryCustomCTA = NonNullable<
  NonNullable<Queries.LongFormContentQuery['markdownRemark']>['frontmatter']
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

export function Head(props: HeadProps<Queries.LongFormContentQuery>) {
  return (
    <SEO
      pathname={props.location.pathname}
      title={props.data.markdownRemark?.frontmatter?.metadata?.title ?? ''}
      description={props.data.markdownRemark?.frontmatter?.metadata?.description ?? ''}
      image={
        props.data.markdownRemark?.frontmatter?.metadata?.socialImage?.publicURL ??
        props.data.markdownRemark?.frontmatter?.metadata?.image?.publicURL ??
        ''
      }
    >
      {props.data.markdownRemark?.frontmatter?.isHidden && <meta name='robots' content='noindex' />}
    </SEO>
  )
}
