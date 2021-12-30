import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { BASE_URL } from '../constants/content'
import { GeneratedPageContext } from '../helpers/types'
import { withTrailingSlash } from '../helpers/url'
import PreviewProviders from '../cms/PreviewProviders'
import { DangerouslyRenderHtmlContent } from '../components/Content/Content'
import { mapToSolution } from '../components/solutions/Solution/Solution'

import SolutionContentTemplate, { BottomLink } from './solution-content-template'

interface SolutionContentProps {
  data: GatsbyTypes.SolutionContentQuery
  pageContext: GeneratedPageContext
}
export default function SolutionContent({ data }: SolutionContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.funnel === undefined ||
    data.markdownRemark?.frontmatter?.category === undefined ||
    data.markdownRemark?.frontmatter?.industry === undefined ||
    data.markdownRemark?.frontmatter?.solutionCode === undefined ||
    data.markdownRemark?.html === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const solution = mapToSolution(data.markdownRemark)

  const funnel = data.markdownRemark.frontmatter.funnel as string[]
  const category = data.markdownRemark.frontmatter.category as string[]
  const industry = data.markdownRemark.frontmatter.industry as string[]
  const title = data.markdownRemark.frontmatter.title as string
  const description = data.markdownRemark.frontmatter.description as string
  const iframeUrl = data.markdownRemark.frontmatter.solutionCode.iframeUrl as string
  const shareUrl = data.markdownRemark.frontmatter.solutionCode.shareUrl as string
  const docsUrl = data.markdownRemark.frontmatter.solutionCode.docsUrl as string
  const body = data.markdownRemark.html
  const bottomLinks = data.markdownRemark.frontmatter.bottomLinks as BottomLink[]

  return (
    <SolutionContentTemplate
      contentComponent={DangerouslyRenderHtmlContent}
      metadata={metadata}
      solution={solution}
      funnel={funnel}
      category={category}
      industry={industry}
      title={title}
      description={description}
      iframeUrl={iframeUrl}
      shareUrl={shareUrl}
      docsUrl={docsUrl}
      body={body}
      bottomLinks={bottomLinks}
    />
  )
}

export const pageQuery = graphql`
  query SolutionContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
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
        description
        publishDate
        funnel
        category
        industry
        solutionCode {
          iframeUrl
          shareUrl
          docsUrl
        }
        bottomLinks {
          text
          url
        }
      }
    }
  }
`

// The following function needs to be exported for use in the CMS, added lint disable to avoid limited exports page warning
// eslint-disable-next-line
export function SolutionContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const funnel = entry.getIn(['data', 'funnel'])
  const category = entry.getIn(['data', 'category'])
  const industry = entry.getIn(['data', 'industry'])
  const title = entry.getIn(['data', 'title'])
  const description = entry.getIn(['data', 'description'])
  const codeSection = entry.getIn(['data', 'solutionCode'])?.toObject()
  const bottomLinks = entry.getIn(['data', 'bottomLinks'])?.toJS() as BottomLink[]

  return (
    <PreviewProviders>
      <SolutionContentTemplate
        metadata={mapToMetadata(metadata)}
        funnel={funnel}
        category={category}
        industry={industry}
        title={title}
        description={description}
        iframeUrl={codeSection?.iframeUrl ?? ''}
        shareUrl={codeSection?.shareUrl ?? ''}
        docsUrl={codeSection?.docsUrl ?? ''}
        body={widgetFor('body') ?? <></>}
        bottomLinks={bottomLinks}
      />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.SolutionContentQuery['markdownRemark']>['frontmatter']
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
