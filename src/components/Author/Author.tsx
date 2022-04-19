import React from 'react'
import classNames from 'classnames'
import PreviewCompatibleImage, { ImageInfo } from '../common/PreviewCompatibleImage/PreviewCompatibleImage'
import { Link } from 'gatsby'
import { normalizeWord } from '../../helpers/url'

import styles from './Author.module.scss'

export interface Author {
  name: string
  role: string
  photo: ImageInfo | string
  bio?: string
}

export interface AuthorComponentProps {
  author: Author
  className?: string
}

export default function AuthorComponent({ author, className }: AuthorComponentProps) {
  return (
    <Link to={`/blog/author/${normalizeWord(author.name)}/`} className={classNames(className, styles.root)}>
      <PreviewCompatibleImage
        imageInfo={author.photo}
        altTag={`${author.name} photo`}
        titleTag={`${author.name} photo`}
        className={styles.photo}
        imageStyle={{ borderRadius: '50%' }}
      />

      <div className={styles.textContainer}>
        <span className={styles.name}>{author.name}</span>
        <span className={styles.role}>{author.role}</span>
      </div>
    </Link>
  )
}
