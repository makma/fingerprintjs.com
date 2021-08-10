import React from 'react'
import classNames from 'classnames'

import styles from './Skeleton.module.scss'

export interface SkeletonProps {
  width: number
  height: number
  className?: string
}
export default function Skeleton({ width, height, className }: SkeletonProps) {
  const style = {
    width: `${width}px`,
    height: `${height}px`,
  }

  return <div style={style} className={classNames(styles.skeleton, className)} />
}
