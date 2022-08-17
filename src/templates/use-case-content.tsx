import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { GeneratedPageContext } from '../helpers/types'
import PreviewProviders from '../cms/PreviewProviders'
import { DangerouslyRenderHtmlContent } from '../components/Content/Content'
import { mapToUseCase } from '../components/useCases/UseCase/UseCase'

import { SEO } from '../components/SEO/SEO'
import UseCaseContentTemplate, { BottomLink, CodeBlock } from './use-case-content-template'

interface UseCaseContentProps {
  data: Queries.UseCaseContentQuery
  pageContext: GeneratedPageContext
}
export default function UseCaseContent({ data }: UseCaseContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.funnel === undefined ||
    data.markdownRemark?.frontmatter?.category === undefined ||
    data.markdownRemark?.frontmatter?.industry === undefined ||
    data.markdownRemark?.frontmatter?.useCaseCode === undefined ||
    data.markdownRemark?.frontmatter?.bottomLinks === undefined ||
    data.markdownRemark?.html === undefined
  ) {
    return null
  }

  const useCase = mapToUseCase(data.markdownRemark)
  const funnel = data.markdownRemark.frontmatter.funnel as string[]
  const category = data.markdownRemark.frontmatter.category as string[]
  const industry = data.markdownRemark.frontmatter.industry as string[]
  const title = data.markdownRemark.frontmatter.title as string
  const description = data.markdownRemark.frontmatter.description as string
  const codeBlockObject = mapToCodeblock(data.markdownRemark.frontmatter.useCaseCode)
  const body = data.markdownRemark.html
  const bottomLinks = mapToBottomLinks(data.markdownRemark.frontmatter.bottomLinks)
  return (
    <UseCaseContentTemplate
      contentComponent={DangerouslyRenderHtmlContent}
      useCase={useCase}
      funnel={funnel}
      category={category}
      industry={industry}
      title={title}
      description={description}
      codeBlock={codeBlockObject}
      body={body}
      bottomLinks={bottomLinks}
    />
  )
}

export const pageQuery = graphql`
  query UseCaseContent($id: String!) {
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
        useCaseCode {
          iframeUrl
          button1 {
            url
            buttonText
          }
          button2 {
            url
            buttonText
          }
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
export function UseCaseContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const funnel = entry.getIn(['data', 'funnel'])
  const category = entry.getIn(['data', 'category'])
  const industry = entry.getIn(['data', 'industry'])
  const title = entry.getIn(['data', 'title'])
  const description = entry.getIn(['data', 'description'])
  const codeSection = entry.getIn(['data', 'useCaseCode'])?.toJS() as QueryCodeBlock
  const bottomLinks = entry.getIn(['data', 'bottomLinks'])?.toJS() as BottomLink[]

  return (
    <PreviewProviders>
      <UseCaseContentTemplate
        funnel={funnel}
        category={category}
        industry={industry}
        title={title}
        description={description}
        codeBlock={mapToCodeblock(codeSection)}
        body={widgetFor('body') ?? <></>}
        bottomLinks={bottomLinks}
      />
    </PreviewProviders>
  )
}

type QueryCodeBlock = NonNullable<
  NonNullable<Queries.UseCaseContentQuery['markdownRemark']>['frontmatter']
>['useCaseCode']
function mapToCodeblock(queryCodeBlock?: QueryCodeBlock): CodeBlock {
  return {
    iframeUrl: queryCodeBlock?.iframeUrl ?? null,
    button1: queryCodeBlock?.button1?.url
      ? {
          url: queryCodeBlock?.button1?.url,
          text: queryCodeBlock?.button1?.buttonText ?? null,
        }
      : null,
    button2: queryCodeBlock?.button2?.url
      ? { url: queryCodeBlock?.button2?.url, text: queryCodeBlock?.button2?.buttonText ?? null }
      : null,
  } as CodeBlock
}

type QueryBottomLink = NonNullable<
  NonNullable<Queries.UseCaseContentQuery['markdownRemark']>['frontmatter']
>['bottomLinks']
function mapToBottomLinks(queryBottomLink?: QueryBottomLink): BottomLink[] {
  return (
    queryBottomLink?.map((bottomLink) => {
      return {
        url: bottomLink?.url ?? '',
        text: bottomLink?.text ?? '',
      }
    }) ?? []
  )
}

export function Head(props: HeadProps<Queries.UseCaseContentQuery>) {
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
    />
  )
}
