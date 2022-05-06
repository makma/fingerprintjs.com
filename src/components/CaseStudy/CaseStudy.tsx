import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import classNames from 'classnames'
import { getRelativeUrl } from '../../helpers/url'
import { graphql, Link } from 'gatsby'

import styles from './CaseStudy.module.scss'

export interface CaseStudyProps {
  title: string
  description: string
  image?: GatsbyTypes.File
  path: string
  className?: string
}
export default function CaseStudy({ title, description, image, path, className }: CaseStudyProps) {
  const imageFluid = image?.childImageSharp?.gatsbyImageData

  return (
    <Link to={getRelativeUrl(path)} className={classNames(className, styles.caseStudy)}>
      {imageFluid && (
        <div className={styles.wrapper}>
          <GatsbyImage image={imageFluid} className={styles.image} alt='Use Case Image' title='Use Case Image' />
        </div>
      )}
      <div className={styles.content}>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  )
}

// TODO [VL] Write a proper type for this. It's not as straight forward because it has to accept a lot of different generated gatsby types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapToCaseStudy(data: any, editing?: boolean): CaseStudyProps {
  if ((!data.frontmatter || !data.frontmatter.metadata) && !editing) {
    throw new Error('Solutions should always have frontmatter and metadata.')
  }

  if (editing) {
    const caseStudy: CaseStudyProps = {
      title: '',
      description: '',
      path: '/',
    }

    if (data.frontmatter) {
      const { title = '', metadata } = data.frontmatter
      caseStudy.title = title

      if (metadata) {
        const { description = '', url } = metadata
        caseStudy.description = description
        caseStudy.path = url
      }
    }

    return caseStudy
  }

  const { title = '', metadata } = data.frontmatter
  const { socialCard } = data
  const { description = '', url } = metadata

  return {
    title,
    description,
    path: url,
    image: socialCard as GatsbyTypes.File,
  } as CaseStudyProps
}

export const query = graphql`
  fragment CaseStudyData on MarkdownRemarkConnection {
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
            url
          }
          title
        }
        socialCard {
          childImageSharp {
            gatsbyImageData(quality: 100, layout: CONSTRAINED, aspectRatio: 2)
          }
          extension
          publicURL
        }
      }
    }
  }
`
