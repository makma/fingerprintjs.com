import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import classNames from 'classnames'
import { getRelativeUrl } from '../../../helpers/url'
import TagList from '../../TagList/TagList'
import { graphql, Link } from 'gatsby'

import styles from './UseCase.module.scss'
import { createDateTimeFormatter, displayDateFormatter } from '../../../helpers/format'

export interface UseCaseProps {
  title: string
  description: string
  publishDate: string
  path: string
  funnel: string[]
  category: string[]
  industry: string[]
  tags?: string[]
  image?: Queries.File
  imageAlt?: string
  imageTitle?: string
  className?: string
}
export default function UseCase({
  title,
  description,
  image,
  imageAlt,
  imageTitle,
  path,
  funnel,
  category,
  industry,
  className,
}: UseCaseProps) {
  const imageFluid = image?.childImageSharp?.gatsbyImageData
  const tags = [...funnel, ...category, ...industry]
  return (
    <Link to={getRelativeUrl(path)} className={classNames(className, styles.useCase)}>
      {imageFluid && (
        <div className={styles.wrapper}>
          <GatsbyImage
            image={imageFluid}
            className={styles.image}
            alt={imageAlt ? imageAlt : title}
            title={imageTitle}
          />
        </div>
      )}
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
        <TagList tags={tags} format='title' />
      </div>
    </Link>
  )
}

// TODO [VL] Write a proper type for this. It's not as straight forward because it has to accept a lot of different generated gatsby types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToUseCase(data: any, editing?: boolean): UseCaseProps {
  if ((!data.frontmatter || !data.frontmatter.metadata) && !editing) {
    throw new Error('Use Cases should always have frontmatter and metadata.')
  }
  const dateFormatter = createDateTimeFormatter()

  if (editing) {
    const useCase: UseCaseProps = {
      title: '',
      description: '',
      publishDate: dateFormatter.format(Date.now()),
      path: '/',
      funnel: [],
      category: [],
      industry: [],
      tags: [],
    }

    if (data.frontmatter) {
      const {
        publishDate = dateFormatter.format(Date.now()),
        title = '',
        metadata,
        funnel,
        category,
        industry,
      } = data.frontmatter
      useCase.publishDate = publishDate
      useCase.title = title
      useCase.funnel = funnel
      useCase.category = category
      useCase.industry = industry
      useCase.tags = [...funnel, ...category, ...industry]

      if (metadata) {
        const { description = '', image, url } = metadata
        useCase.description = description
        useCase.image = image as Queries.File
        useCase.path = url
      }
    }

    return useCase
  }

  const { publishDate = Date.now(), title = '', metadata, funnel, category, industry } = data.frontmatter
  const { description = '', image, imageAlt, imageTitle, url } = metadata

  return {
    title,
    description,
    publishDate: displayDateFormatter(new Date(publishDate)),
    image: image as Queries.File,
    imageAlt,
    imageTitle,
    path: url,
    funnel,
    category,
    industry,
    tags: [...funnel, ...category, ...industry],
  } as UseCaseProps
}

export const query = graphql`
  fragment UseCaseData on MarkdownRemarkConnection {
    edges {
      node {
        id
        fields {
          slug
        }
        frontmatter {
          metadata {
            title
            description
            image {
              childImageSharp {
                gatsbyImageData(width: 512, quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
              }
            }
            imageAlt
            imageTitle
            url
          }
          title
          publishDate
          funnel
          category
          industry
        }
      }
    }
  }
`
