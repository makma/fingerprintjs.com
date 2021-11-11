import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import classNames from 'classnames'
import { getRelativeUrl } from '../../../helpers/url'
import TagList from '../../TagList/TagList'
import { graphql, Link } from 'gatsby'

import styles from './Solution.module.scss'
import { dateFormatter, displayDateFormatter } from '../../../helpers/format'

export interface SolutionProps {
  title: string
  description: string
  publishDate: string
  path: string
  tags: string[]
  image?: GatsbyTypes.File
  imageAlt?: string
  imageTitle?: string
  className?: string
}
export default function Solution({
  title,
  description,
  image,
  imageAlt,
  imageTitle,
  path,
  tags,
  className,
}: SolutionProps) {
  const imageFluid = image?.childImageSharp?.gatsbyImageData
  return (
    <Link to={getRelativeUrl(path)} className={classNames(className, styles.solution)}>
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
export function mapToSolution(data: any, editing?: boolean): SolutionProps {
  if ((!data.frontmatter || !data.frontmatter.metadata) && !editing) {
    throw new Error('Solutions should always have frontmatter and metadata.')
  }

  if (editing) {
    const solution: SolutionProps = {
      title: '',
      description: '',
      publishDate: dateFormatter.format(Date.now()),
      path: '/',
      tags: [],
    }

    if (data.frontmatter) {
      const { publishDate = dateFormatter.format(Date.now()), title = '', metadata, tags } = data.frontmatter
      solution.publishDate = publishDate
      solution.title = title
      solution.tags = tags

      if (metadata) {
        const { description = '', image, url } = metadata
        solution.description = description
        solution.image = image as GatsbyTypes.File
        solution.path = url
      }
    }

    return solution
  }

  const { publishDate = Date.now(), title = '', metadata, tags } = data.frontmatter
  const { description = '', image, imageAlt, imageTitle, url } = metadata

  return {
    title,
    description,
    publishDate: displayDateFormatter.format(new Date(publishDate)),
    image: image as GatsbyTypes.File,
    imageAlt,
    imageTitle,
    path: url,
    tags,
  } as SolutionProps
}

export const query = graphql`
  fragment SolutionData on MarkdownRemarkConnection {
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
          tags
        }
      }
    }
  }
`
