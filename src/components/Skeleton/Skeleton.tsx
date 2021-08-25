import React from 'react'
import classNames from 'classnames'

import styles from './Skeleton.module.scss'

export interface SkeletonProps {
  width?: number
  height?: number
  square?: boolean
  className?: string
}
export default function Skeleton({ width, height, square, className }: SkeletonProps) {
  const style = {
    ...(width && { width: `${width}px` }),
    ...(height && { height: `${height}px` }),
  }

  return <div style={style} className={classNames(styles.skeleton, className, { [styles.square]: square })} />
}
