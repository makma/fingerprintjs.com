import React from 'react'
import { Link } from 'gatsby'
import { kebabToTitle, kebabToUpper } from '../../helpers/case'
import classNames from 'classnames'

import styles from './TagList.module.scss'

export interface TagListProps {
  tags: string[]
  activeTag?: string
  format?: 'upper' | 'title'
  direction?: 'horizontal' | 'vertical'
  tagLink?: string
  link?: string
  tagsLimit?: number
  className?: string
}

export default function TagList({
  tags,
  activeTag,
  format = 'upper',
  direction = 'horizontal',
  tagLink,
  link,
  tagsLimit,
  className,
}: TagListProps) {
  function formatTag(tag: string) {
    switch (format) {
      case 'upper':
        return kebabToUpper(tag)
      case 'title':
        return kebabToTitle(tag)
    }
  }

  const limit = tagsLimit ? tagsLimit : tags.length

  return (
    <ul className={classNames(styles.root, className)}>
      {tags?.slice(-limit).map((tag) => (
        <li
          key={tag}
          className={classNames(
            styles.item,
            { [styles.horizontal]: direction === 'horizontal' },
            { [styles.vertical]: direction === 'vertical' }
          )}
        >
          {tagLink || link ? (
            tag === activeTag ? (
              <span className={classNames(styles.tag, styles.highlight)}>{formatTag(tag)}</span>
            ) : (
              <Link to={link ?? `${tagLink}${tag}/`} className={styles.tag} state={{ selectedTag: tag }}>
                {formatTag(tag)}
              </Link>
            )
          ) : (
            <span style={{ borderColor: '#f2f2f7' }} className={classNames(styles.tagNoLink)}>
              {formatTag(tag)}
            </span>
          )}
        </li>
      ))}
    </ul>
  )
}
