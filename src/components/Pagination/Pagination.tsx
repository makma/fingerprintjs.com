import React from 'react'
import classNames from 'classnames'
import styles from './Pagination.module.scss'
import { motion } from 'framer-motion'

export interface PaginationProps {
  currentPage: number
  numberOfPages: number
  onPageChange: (newPage: number) => void
  backgroundDotColor?: string
  backgroundDotColorMobile?: string
}
export function Pagination({
  currentPage,
  numberOfPages,
  onPageChange,
  backgroundDotColor,
  backgroundDotColorMobile,
}: PaginationProps) {
  //This component was refactored by ChatGPT

  const dots = <span className={styles.dotNotClick}>...</span>

  const renderPageNumber = (pageNumber: number) => (
    <motion.span
      style={
        {
          '--backgroundDotColor': backgroundDotColor ?? '#ffffff',
          '--backgroundDotColorMobile': backgroundDotColorMobile ?? '#ffffff',
        } as React.CSSProperties
      }
      key={pageNumber}
      className={classNames(styles.dot, { [styles.selected]: currentPage === pageNumber })}
      onClick={() => onPageChange(pageNumber)}
      whileHover={{ scale: 1.1 }} // Scale up on hover
      whileTap={{ scale: 0.9 }} // Scale down on tap
      initial={{ opacity: 0, y: 20 }} // Animate from bottom and fade in
      animate={{ opacity: 1, y: 0 }} // Fade in and move up
      exit={{ opacity: 0, y: -20 }} // Fade out and move down
      transition={{ duration: 0.2 }} // Set the duration to 0.2 seconds
    >
      {pageNumber}
    </motion.span>
  )

  const getPageNumbers = () => {
    if (numberOfPages <= 7) {
      return Array.from({ length: numberOfPages }, (_, i) => i + 1)
    } else if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, dots, numberOfPages]
    } else if (currentPage >= numberOfPages - 3) {
      return [1, dots, ...Array.from({ length: 5 }, (_, i) => numberOfPages - 4 + i)]
    } else {
      return [1, dots, currentPage - 1, currentPage, currentPage + 1, dots, numberOfPages]
    }
  }

  return (
    <div className={styles.pagination}>
      <motion.span
        className={classNames(styles.prevNext, { [styles.disabled]: currentPage === 1 })}
        onClick={() => onPageChange(currentPage - 1)}
        whileHover={{ scale: 1.1 }} // Scale up on hover
        whileTap={{ scale: 0.9 }} // Scale down on tap
      >
        Prev
      </motion.span>
      {getPageNumbers().map(renderPageNumber)}
      <motion.span
        className={classNames(styles.prevNext, { [styles.disabled]: currentPage === numberOfPages })}
        onClick={() => onPageChange(currentPage + 1)}
        whileHover={{ scale: 1.1 }} // Scale up on hover
        whileTap={{ scale: 0.9 }} // Scale down on tap
      >
        Next
      </motion.span>
    </div>
  )
}
