import { graphql } from 'gatsby'
import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { Content, DangerouslyRenderHtmlContent, MarkdownContent } from '../components/Content/Content'
import Header, { HeaderProps } from '../components/widgets/StudyCase/Header/Header'
import Summary, { SummaryProps, Result, OverviewBullet } from '../components/widgets/StudyCase/Summary/Summary'
import Footer, { FooterProps } from '../components/widgets/StudyCase/Footer/Footer'
import { LayoutTemplate } from '../components/Layout'
import { GeneratedPageContext } from '../helpers/types'
import Section from '../components/common/Section'
import Container from '../components/common/Container'
import BreadcrumbsSEO from '../components/Breadcrumbs/BreadcrumbsSEO'
import { withTrailingSlash } from '../helpers/url'
import { Breadcrumb } from '../components/Breadcrumbs/Breadcrumbs'
import PreviewProviders from '../cms/PreviewProviders'

import styles from './case-study-content.module.scss'

import headerStyles from '../components/widgets/StudyCase/Header/Header.module.scss'

interface CaseStudyContentProps {
  data: GatsbyTypes.CaseStudyContentQuery
  pageContext: GeneratedPageContext
}

export default function CaseStudyContent({ data, pageContext }: CaseStudyContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.header === undefined ||
    data.markdownRemark?.html === undefined ||
    data.markdownRemark?.frontmatter?.summary === undefined ||
    data.markdownRemark?.frontmatter?.footer === undefined
  ) {
    return null
  }

  const metadata = mapToMetadata(data.markdownRemark.frontmatter.metadata)
  const header = mapToHeader(data.markdownRemark.frontmatter.header)
  const summary = mapToSummary(data.markdownRemark.frontmatter.summary)
  const body = data.markdownRemark.html
  const footer = mapToFooter(data.markdownRemark.frontmatter.footer)

  return (
    <CaseStudyContentTemplate
      metadata={metadata}
      header={header}
      summary={summary}
      contentComponent={DangerouslyRenderHtmlContent}
      body={body}
      footer={footer}
      breadcrumbs={pageContext.breadcrumb.crumbs}
    />
  )
}

export const pageQuery = graphql`
  query CaseStudyContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        metadata {
          title
          description
          url
        }
        header {
          subLabel
          subTitle
          content
          pdf {
            publicURL
          }
        }
        summary {
          results {
            icon {
              childImageSharp {
                gatsbyImageData(placeholder: BLURRED, width: 28, quality: 100, layout: FIXED)
              }
              extension
              publicURL
            }
            iconAlt
            iconTitle
            title
            content
          }
          overviewSection {
            description
            bullets {
              value
              description
            }
          }
        }
        footer {
          ctaTitle
          ctaSubtitle
        }
      }
    }
  }
`

interface CaseStudyTemplateProps {
  metadata: GatsbyTypes.SiteSiteMetadata
  header: HeaderProps
  summary: SummaryProps
  body: string | React.ReactNode
  contentComponent?: React.FunctionComponent<{ content: string | React.ReactNode; className?: string }>
  footer: FooterProps
  breadcrumbs?: Array<Breadcrumb>
}
function CaseStudyContentTemplate({
  metadata,
  header,
  summary,
  body,
  contentComponent,
  footer,
  breadcrumbs,
}: CaseStudyTemplateProps) {
  const ContentComponent = contentComponent ?? Content

  return (
    <LayoutTemplate siteMetadata={metadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <Section className={styles.section}>
        <Header {...header} />
        <Summary {...summary} />
        <Section className={styles.section}>
          <Container size='large' className={styles.container}>
            <ContentComponent content={body} className={styles.body} />
          </Container>
        </Section>
      </Section>
      <Footer {...footer} />
    </LayoutTemplate>
  )
}

// The following function is necessary to export it to use it in the CMS, added lint disable to avoid limited exports page warning
// eslint-disable-next-line
export function CaseStudyContentPreview({ entry, widgetFor }: PreviewTemplateComponentProps) {
  const metadata = entry.getIn(['data', 'metadata'])?.toObject() as QueryMetadata
  const header = entry.getIn(['data', 'header'])?.toObject() as QueryHeader
  const summary = entry.getIn(['data', 'summary'])?.toJS() as QuerySummary
  const footer = entry.getIn(['data', 'footer'])?.toObject() as QueryFooter

  return (
    <PreviewProviders>
      <CaseStudyContentTemplate
        metadata={mapToMetadata(metadata)}
        header={mapToHeader(header, true)}
        summary={mapToSummary(summary, true)}
        body={widgetFor('body') ?? <></>}
        footer={mapToFooter(footer)}
      />
    </PreviewProviders>
  )
}

type QueryMetadata = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['metadata']
function mapToMetadata(queryMetadata: QueryMetadata): GatsbyTypes.SiteSiteMetadata {
  return {
    title: queryMetadata?.title ?? '',
    description: queryMetadata?.description ?? '',
    siteUrl: withTrailingSlash(queryMetadata?.url ?? ''),
  } as GatsbyTypes.SiteSiteMetadata
}

type QueryHeader = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['header']
function mapToHeader(queryHeader: QueryHeader, preview = false): HeaderProps {
  return {
    subLabel: queryHeader?.subLabel ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    subTitle:
      queryHeader?.subTitle ??
      'Vestibulum ut mi eleifend, auctor ligula ut, feugiat nunc. Donec molestie ipsum at sagittis elementum.',
    description: preview ? (
      <MarkdownContent
        markdown={
          queryHeader?.content ??
          'Curabitur sollicitudin id mi ac ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.'
        }
        className={headerStyles.content}
      />
    ) : (
      <DangerouslyRenderHtmlContent content={queryHeader?.content ?? ''} className={headerStyles.content} />
    ),
    pdfLink: queryHeader?.pdf?.publicURL ?? '/',
  } as HeaderProps
}

type QuerySummary = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['summary']
function mapToSummary(querySummary: QuerySummary, preview = false): SummaryProps {
  return {
    results:
      querySummary?.results?.map(
        (result) =>
          ({
            icon: result?.icon,
            iconAlt: result?.iconAlt,
            iconTitle: result?.iconTitle,
            title: result?.title ?? `Nunc rhoncus et eros non lobortis.`,
            children: preview ? (
              <MarkdownContent
                markdown={
                  result?.content ??
                  'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
                }
              />
            ) : (
              <DangerouslyRenderHtmlContent content={result?.content ?? ''} />
            ),
          } as Result)
      ) ?? [],
    description:
      querySummary?.overviewSection?.description ?? 'Vivamus at ex a mi bibendum sollicitudin sit amet laoreet mi.',
    bullets:
      querySummary?.overviewSection?.bullets?.map(
        (bullet) =>
          ({
            value: bullet?.value ?? `Vivamus`,
            description: bullet?.description ?? `Lobortis`,
          } as OverviewBullet)
      ) ?? [],
  } as SummaryProps
}

type QueryFooter = NonNullable<
  NonNullable<GatsbyTypes.CaseStudyContentQuery['markdownRemark']>['frontmatter']
>['footer']
function mapToFooter(queryFooter: QueryFooter): FooterProps {
  return {
    ctaTitle: queryFooter?.ctaTitle ?? '',
    ctaSubtitle: queryFooter?.ctaSubtitle ?? '',
  } as FooterProps
}
