import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { ReactComponent as GithubIconSvg } from '../GithubButton/github_icon.svg'

import styles from './IntegrationCard.module.scss'

export interface IntegrationCardProps {
  title: string
  description: string
  docsLink: string
  cardImage: Queries.File
  githubLink?: string
  category?: 'Mobile' | 'Frontend' | 'Backend'
}
export default function IntegrationCard({ title, description, cardImage, githubLink, docsLink }: IntegrationCardProps) {
  const imageFluid = cardImage?.childImageSharp?.gatsbyImageData
  return (
    <div className={styles.integrationCard}>
      <article>
        {imageFluid && (
          <GatsbyImage
            image={imageFluid}
            className={styles.image}
            alt={`${title} card`}
            title={title}
            imgStyle={{ objectFit: `contain` }}
          />
        )}
        <div className={styles.content}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.description}>{description}</p>
        </div>
      </article>
      <footer className={styles.cardFooter}>
        {githubLink && (
          <a className={styles.button} href={githubLink} target='_blank' rel='noreferrer'>
            <span>GitHub</span>
            <GithubIconSvg className={styles.icon} />
          </a>
        )}
        <a className={styles.docsLink} href={docsLink} target='_blank' rel='noreferrer'>
          Read our docs →
        </a>
      </footer>
    </div>
  )
}
