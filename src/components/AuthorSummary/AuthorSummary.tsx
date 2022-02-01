import React from 'react'

import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import styles from './AuthorSummary.module.scss'
import { Link } from 'gatsby'

interface AuthorSummaryProps {
  author: string
  role?: string
  photo?: IGatsbyImageData
  bio?: string
  linkBack?: boolean
}
export default function AuthorSummary({ author, photo, role, bio, linkBack }: AuthorSummaryProps) {
  return linkBack ? (
    <Link to={`/blog/author/${author.toLowerCase()}/`} className={styles.authorSummary}>
      <Content author={author} photo={photo} role={role} bio={bio} />
    </Link>
  ) : (
    <div className={styles.authorSummary}>
      <Content author={author} photo={photo} role={role} bio={bio} />
    </div>
  )
}

function Content({ author, photo, role, bio }: AuthorSummaryProps) {
  return (
    <>
      {photo && (
        <div>
          <GatsbyImage image={photo} alt={`${author} photo`} title={`${author} photo`} className={styles.photo} />
        </div>
      )}
      <div className={styles.authorInfo}>
        <h2 className={styles.aboutAuthor}>{author}</h2>
        <h3 className={styles.title}>Role</h3>
        <span className={styles.description}>{role}</span>
        {bio && (
          <>
            <h3 className={styles.bioTitle}>Bio</h3>
            {<span className={styles.description} dangerouslySetInnerHTML={{ __html: bio }} />}
          </>
        )}
      </div>
      <h3 className={styles.articlesTitle}>{`${author} Articles`}</h3>
    </>
  )
}
