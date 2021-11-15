import React from 'react'
import classNames from 'classnames'

import styles from './Grid.module.scss'

export interface GridProps {
  items: Array<React.ReactNode>
  perRow?: 3 | 4
  className?: string
}
export default function Grid({ items, perRow = 4, className }: GridProps) {
  return (
    <div className={classNames(styles.grid, className, { [styles.threePerRow]: perRow === 3 })}>
      {items.map((item) => {
        return item
      })}
    </div>
  )
}
