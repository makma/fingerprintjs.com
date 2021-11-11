import React from 'react'
import classNames from 'classnames'

import styles from './Grid.module.scss'

export interface GridProps {
  items: Array<React.ReactNode>
  perRow?: 'four' | 'three'
  className?: string
}
export default function Grid({ items, perRow = 'four', className }: GridProps) {
  return (
    <div className={classNames(styles.grid, className, { [styles.threePerRow]: perRow === 'three' })}>
      {items.map((item) => {
        return item
      })}
    </div>
  )
}
