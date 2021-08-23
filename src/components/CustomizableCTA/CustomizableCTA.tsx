import React, { useState } from 'react'
import classNames from 'classnames'
import styles from './CustomizableCTA.module.scss'
import Button from '../common/Button'
import { useShowOnScroll } from '../../hooks/useShowOnScroll'

import { ReactComponent as CloseSVG } from '../../img/close.svg'

export interface CustomizableCTAProps {
  subHeader: string
  children: string
  ctaText: string
  ctaHref: string
  className?: string
  hideWhenScroll?: boolean
  openCtaNewTab?: boolean
}

export default function CustomizableCTA({
  subHeader,
  children,
  ctaText,
  ctaHref,
  className,
  hideWhenScroll = true,
  openCtaNewTab,
}: CustomizableCTAProps) {
  const [isClosed, setIsClosed] = useState(false)
  const isVisible = useShowOnScroll()

  const onClose = () => setIsClosed(true)

  return (
    <div
      className={classNames(className, styles.root, { [styles.visible]: !hideWhenScroll || (isVisible && !isClosed) })}
    >
      <div className={styles.header}>
        <h2 className={styles.subHeader}>{subHeader}</h2>
        <CloseSVG onClick={() => onClose()} className={styles.close} />
      </div>
      <p className={styles.description}>{children}</p>
      <Button href={ctaHref} className={styles.button} openNewTab={openCtaNewTab}>
        {ctaText}
      </Button>
    </div>
  )
}
