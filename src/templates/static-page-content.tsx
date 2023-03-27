import { graphql, HeadProps } from 'gatsby'
import React from 'react'
import { DangerouslyRenderHtmlContent, MarkdownContent } from '../components/Content/Content'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'
import { InlineCtaProps } from '../components/widgets/InlineCta'
import { HeroProps } from '../components/widgets/Hero'
import { ArrayElement, GeneratedPageContext } from '../helpers/types'
import { BlockWithImage } from '../components/widgets/AlternatingImagesText'
import { CardSectionProps } from '../components/widgets/CardSection'
import { Card } from '../components/widgets/CardGrid'

import { mapToPost } from '../components/Post/Post'
import PreviewProviders from '../cms/PreviewProviders'
import StaticPageContentTemplate from './static-page-content-template'
import { SEO } from '../components/SEO/SEO'

// Each widget has different styles and the MarkdownContent component is not aware of that, so we need to pass a widget class to MarkdownContent.
// TODO [VL] When we have consistent typography, we can create variants for the markdown component instead of overriding styles for each widget.
import ctaStyles from '../components/widgets/InlineCta/InlineCta.module.scss'
import cardStyles from '../components/widgets/CardGrid/CardGrid.module.scss'
import blockStyles from '../components/widgets/AlternatingImagesText/AlternatingImagesText.module.scss'

interface StaticPageContentProps {
  data: Queries.StaticPageContentQuery
  pageContext: GeneratedPageContext
}
export default function StaticPageContent({ data, pageContext }: StaticPageContentProps) {
  if (
    data.markdownRemark?.frontmatter === undefined ||
    data.markdownRemark?.frontmatter?.metadata === undefined ||
    data.markdownRemark?.frontmatter?.invertContent === undefined ||
    data.markdownRemark?.frontmatter?.inlineCta === undefined ||
    data.markdownRemark?.frontmatter?.cardSection === undefined ||
    data.markdownRemark?.frontmatter?.blocks === undefined ||
    data.markdownRemark?.frontmatter?.hero === undefined ||
    data.markdownRemark?.frontmatter?.relatedTitle === undefined
  ) {
    return null
  }

  const invertContent = data.markdownRemark.frontmatter.invertContent
  const inlineCta = mapToInlineCta(data.markdownRemark.frontmatter.inlineCta)
  const cardSection = mapToCardSection(data.markdownRemark.frontmatter.cardSection)
  const blocks = mapToBlocks(data.markdownRemark.frontmatter.blocks as QueryBlock[])
  const hero = mapToHero(data.markdownRemark.frontmatter.hero)
  const content = mapToPost(data.markdownRemark)
  const relatedArticlesTitle = data.markdownRemark.frontmatter.relatedTitle

  return (
    <StaticPageContentTemplate
      invertContent={invertContent}
      inlineCta={inlineCta}
      cardSection={cardSection}
      blocks={blocks}
      hero={hero}
      content={content}
      relatedArticlesTitle={relatedArticlesTitle}
      breadcrumbs={pageContext.breadcrumb.crumbs}
    />
  )
}

export const pageQuery = graphql`
  query StaticPageContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        metadata {
          title
          description
          url
          image {
            publicURL
          }
        }
        invertContent
        hero {
          title
          description
          ctaText
          ctaHref
          openCtaNewTab
          ctaText2
          ctaHref2
          openCtaNewTab2
        }
        cardSection {
          title
          subtitle
          cards {
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
        }
        blocks {
          content
          subheader
          image {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, quality: 100, layout: FULL_WIDTH)
            }
          }
          imageAlt
          imageTitle
          isImageAfterText
          ctaText
          ctaUrl
          isCtaButton
        }
        inlineCta {
          title
          subtitle
          buttonText
          buttonHref
        }
        relatedTitle
        tags
      }
    }
  }
`

// The following function is necessary to export it to use it in the CMS, added lint disable to avoid limited exports page warning
// eslint-disable-next-line
export function StaticPageContentPreview({ entry }: PreviewTemplateComponentProps) {
  const invertContent = entry.getIn(['data', 'invertContent'])

  let cardSection = entry.getIn(['data', 'cardSection'])?.toObject()
  if (cardSection?.cards) {
    cardSection.cards = entry.getIn(['data', 'cardSection', 'cards'])?.toJS()
  }
  cardSection = cardSection as QueryCardSection

  const blocks = entry.getIn(['data', 'blocks'])?.toJS() as QueryBlock[]

  const inlineCta = entry.getIn(['data', 'inlineCta'])?.toObject() as QueryInlineCta

  const hero = entry.getIn(['data', 'hero'])?.toObject() as QueryHero

  const relatedArticlesTitle = entry.getIn(['data', 'relatedTitle'])

  return (
    <PreviewProviders>
      <StaticPageContentTemplate
        invertContent={invertContent}
        inlineCta={mapToInlineCta(inlineCta, true)}
        cardSection={mapToCardSection(cardSection, true)}
        blocks={mapToBlocks(blocks, true)}
        hero={mapToHero(hero)}
        content={mapToPost({ frontmatter: entry.get('data').toObject() })}
        relatedArticlesTitle={relatedArticlesTitle}
        isEditing
      />
    </PreviewProviders>
  )
}

type QueryHero = NonNullable<NonNullable<Queries.StaticPageContentQuery['markdownRemark']>['frontmatter']>['hero']
function mapToHero(queryHero: QueryHero): HeroProps {
  return {
    title: queryHero?.title ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description:
      queryHero?.description ??
      'Vestibulum ut mi eleifend, auctor ligula ut, feugiat nunc. Donec molestie ipsum at sagittis elementum.',
    ctaText: queryHero?.ctaText ?? 'Lorem ipsum',
    ctaHref: queryHero?.ctaHref ?? '/',
    openCtaNewTab: queryHero?.openCtaNewTab ?? false,
    ctaText2: queryHero?.ctaText2 ?? 'Lorem ipsum',
    ctaHref2: queryHero?.ctaHref2 ?? '/',
    openCtaNewTab2: queryHero?.openCtaNewTab2 ?? false,
  } as HeroProps
}

type QueryCardSection = NonNullable<
  NonNullable<Queries.StaticPageContentQuery['markdownRemark']>['frontmatter']
>['cardSection']
function mapToCardSection(queryCardSection: QueryCardSection, preview = false): CardSectionProps {
  return {
    title: queryCardSection?.title ?? 'Vivamus at ex a mi bibendum sollicitudin sit amet laoreet mi.',
    subtitle: queryCardSection?.subtitle ?? '',
    cards:
      queryCardSection?.cards?.map(
        (card, index) =>
          ({
            icon: card?.icon,
            iconAlt: card?.iconAlt,
            iconTitle: card?.iconTitle,
            title: card?.title ?? `Nunc rhoncus et eros non lobortis. #${index}`,
            content: preview ? (
              <MarkdownContent
                markdown={
                  card?.content ??
                  'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
                }
                className={cardStyles.content}
              />
            ) : (
              <DangerouslyRenderHtmlContent content={card?.content ?? ''} className={cardStyles.content} />
            ),
          } as Card)
      ) ?? [],
  } as CardSectionProps
}

type QueryBlock = ArrayElement<
  NonNullable<NonNullable<Queries.StaticPageContentQuery['markdownRemark']>['frontmatter']>['blocks']
>
function mapToBlocks(queryBlocks: QueryBlock[], preview = false): BlockWithImage[] {
  return (
    queryBlocks?.map(
      (block, index) =>
        ({
          content: preview ? (
            <MarkdownContent
              markdown={
                block?.content ??
                'Sed ut fermentum dolor. Vivamus pulvinar nisi leo, in accumsan diam pretium id. Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. Ut sollicitudin nunc non dui placerat facilisis. Duis neque turpis, dictum sit amet sagittis ut, finibus ac eros. Cras pulvinar laoreet diam vel lacinia.'
              }
              className={blockStyles.content}
            />
          ) : (
            <DangerouslyRenderHtmlContent content={block?.content ?? ''} className={blockStyles.content} />
          ),
          image: block?.image,
          imageAlt: block?.imageAlt,
          imageTitle: block?.imageTitle,
          subTitle:
            block?.subheader ?? `Vestibulum aliquam posuere enim, sed finibus sapien fringilla pharetra. #${index}`,
          isImageAfterText: block?.isImageAfterText ?? false,
          ctaText: block?.ctaText ?? 'Lorem ipsum',
          ctaUrl: block?.ctaUrl ?? '/',
          isCtaButton: block?.isCtaButton ?? false,
        } as BlockWithImage)
    ) ?? []
  )
}

type QueryInlineCta = NonNullable<
  NonNullable<Queries.StaticPageContentQuery['markdownRemark']>['frontmatter']
>['inlineCta']
function mapToInlineCta(queryInlineCta: QueryInlineCta, preview = false): InlineCtaProps {
  return {
    title: queryInlineCta?.title ?? 'Quisque arcu urna, tempor aliquet mi eget.',
    subtitle: preview ? (
      <MarkdownContent
        markdown={
          queryInlineCta?.subtitle ??
          'Curabitur sollicitudin id mi ac ultrices. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas in ex turpis.'
        }
        className={ctaStyles.content}
      />
    ) : (
      <DangerouslyRenderHtmlContent content={queryInlineCta?.subtitle ?? ''} className={ctaStyles.content} />
    ),
    primaryAction: { name: queryInlineCta?.buttonText ?? 'Lorem ipsum', action: queryInlineCta?.buttonHref ?? '/' },
  } as InlineCtaProps
}

export function Head(props: HeadProps<Queries.StaticPageContentQuery>) {
  return (
    <SEO
      pathname={props.location.pathname}
      title={props.data.markdownRemark?.frontmatter?.metadata?.title ?? ''}
      description={props.data.markdownRemark?.frontmatter?.metadata?.description ?? ''}
      image={props.data.markdownRemark?.frontmatter?.metadata?.image?.publicURL ?? ''}
    />
  )
}
