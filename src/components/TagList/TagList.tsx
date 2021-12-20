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
  link?: string
  tagsLimit?: number
}

export default function TagList({
  tags,
  activeTag,
  format = 'upper',
  direction = 'horizontal',
  link,
  tagsLimit,
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
    <ul className={styles.root}>
      {tags?.slice(-limit).map((tag) => (
        <li
          key={tag}
          className={classNames(
            styles.item,
            { [styles.horizontal]: direction === 'horizontal' },
            { [styles.vertical]: direction === 'vertical' }
          )}
        >
          {link ? (
            tag === activeTag ? (
              <span className={classNames(styles.tag, styles.highlight)}>{formatTag(tag)}</span>
            ) : (
              <Link to={`${link}${tag}/`} className={styles.tag}>
                {formatTag(tag)}
              </Link>
            )
          ) : (
            <span className={styles.tagNoLink}>{formatTag(tag)}</span>
          )}
        </li>
      ))}
    </ul>
  )
}
