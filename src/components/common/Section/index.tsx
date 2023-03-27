import React from 'react'
import classNames from 'classnames'

import styles from './Section.module.scss'

export interface SectionProps {
  children: React.ReactNode
  className?: string | string[]
  elementId?: string
}
export default function Section({ children, className, elementId }: SectionProps) {
  return (
    <section id={elementId} className={classNames(styles.section, className)}>
      {children}
    </section>
  )
}
