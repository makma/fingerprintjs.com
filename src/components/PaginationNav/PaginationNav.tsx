import React from 'react'
import classNames from 'classnames'
import Button from '../common/Button'

import styles from './PaginationNav.module.scss'

interface PaginationNavProps {
  currentPage: number
  numPages: number
  basePath: string
  className?: string
}
export default function PaginationNav({ currentPage, numPages, basePath, className }: PaginationNavProps) {
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage = currentPage - 1 === 1 ? basePath : `${basePath}${currentPage - 1}/`
  const nextPage = `${basePath}${currentPage + 1}/`

  return numPages > 1 ? (
    <div className={classNames(styles.root, className, { [styles.first]: isFirst }, { [styles.last]: isLast })}>
      {!isFirst && (
        <Button href={prevPage} variant='outline' size='big' className={styles.button}>
          Previous Page
        </Button>
      )}
      {!isLast && (
        <Button href={nextPage} variant='primary' size='big' className={styles.buttons}>
          Next Page
        </Button>
      )}
    </div>
  ) : null
}
