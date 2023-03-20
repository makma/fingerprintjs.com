import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import classNames from 'classnames'
import { getRelativeUrl } from '../../helpers/url'
import TagList from '../TagList/TagList'
import { graphql, Link } from 'gatsby'

import styles from './Post.module.scss'
import { createDateTimeFormatter, displayDateFormatter } from '../../helpers/format'

export interface PostProps {
  title: string
  description: string
  publishDate: string
  image?: Queries.File
  imageAlt?: string
  imageTitle?: string
  path: string
  featured?: boolean
  tags?: string[]
  activeTag?: string
  variant?: 'card' | 'wide'
  perRow?: 3 | 4
  limitTextLines?: boolean
  className?: string
}
export default function Post({
  title,
  description,
  image,
  imageAlt,
  imageTitle,
  publishDate,
  path,
  tags,
  activeTag,
  variant = 'card',
  perRow,
  limitTextLines,
  className,
}: PostProps) {
  const imageFluid = image?.childImageSharp?.gatsbyImageData
  const imgSrc = image?.publicURL
  const gifImage = image?.extension === 'gif'
  return (
    <div className={classNames(className, styles.post, { [styles.wide]: variant === 'wide' })}>
      {(imageFluid || gifImage) && (
        <Link
          to={getRelativeUrl(path)}
          className={classNames(styles.wrapper, {
            [styles.threePerRow]: perRow === 3,
            [styles.wideWrapper]: variant === 'wide',
          })}
        >
          {imageFluid ? (
            <GatsbyImage
              image={imageFluid}
              className={styles.image}
              alt={imageAlt ? imageAlt : title}
              title={imageTitle}
            />
          ) : (
            imgSrc && <img className={styles.image} src={imgSrc} alt={imageAlt ? imageAlt : title} title={imageTitle} />
          )}
        </Link>
      )}

      <div className={styles.content}>
        <Link to={getRelativeUrl(path)}>
          <span className={styles.publishDate}>{publishDate}</span>
          <h1 className={classNames(styles.title, { [styles.titleLimit]: limitTextLines })}>{title}</h1>
          <p className={classNames(styles.description, { [styles.descriptionLimit]: limitTextLines })}>{description}</p>
        </Link>

        {tags && (
          <TagList className={styles.tagList} tagLink='/blog/tag/' tags={tags} activeTag={activeTag} format='title' />
        )}
      </div>
    </div>
  )
}

// TODO [VL] Write a proper type for this. It's not as straight forward because it has to accept a lot of different generated gatsby types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToPost(data: any, editing?: boolean): PostProps {
  const dateFormatter = createDateTimeFormatter()

  if ((!data.frontmatter || !data.frontmatter.metadata) && !editing) {
    throw new Error('Posts should always have frontmatter and metadata.')
  }

  // We might not have all the data while editing the post on  the CMS, but we still want the preview to display what we have.
  if (editing) {
    const post: PostProps = {
      title: '',
      description: '',
      publishDate: dateFormatter.format(Date.now()),
      path: '/',
      featured: false,
      tags: [],
    }

    if (data.frontmatter) {
      const { publishDate = dateFormatter.format(Date.now()), title = '', metadata, tags, featured } = data.frontmatter
      post.publishDate = publishDate
      post.title = title
      post.tags = tags
      post.featured = featured

      if (metadata) {
        const { description = '', image, url } = metadata
        post.description = description
        post.image = image as Queries.File
        post.path = url
      }
    }

    return post
  }

  const { publishDate = Date.now(), title = '', metadata, tags, featured } = data.frontmatter
  const { description = '', image, imageAlt, imageTitle, url } = metadata

  return {
    title,
    description,
    publishDate: displayDateFormatter(new Date(publishDate)),
    image: image as Queries.File,
    imageAlt,
    imageTitle,
    path: url,
    featured,
    tags,
  } as PostProps
}

export const query = graphql`
  fragment PostData on MarkdownRemarkConnection {
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
                gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 1.7)
              }
              extension
              publicURL
            }
            imageAlt
            imageTitle
            url
          }
          title
          publishDate
          tags
          featured
        }
      }
    }
  }
`
