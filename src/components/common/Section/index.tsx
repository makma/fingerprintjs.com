import React from 'react'
import classNames from 'classnames'
import BackgroundImage from 'gatsby-background-image'
import { getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import { convertToBgImage } from 'gbimage-bridge'

import styles from './Section.module.scss'

export interface SectionProps {
  children: React.ReactNode
  className?: string | string[]
  backgroundImage?: IGatsbyImageData
  cssBackgroundSize?: string
  cssBackgroundPosition?: string
  cssBackgroundRepeat?: string
  cssBackgroundColor?: string
}
export default function Section({
  children,
  className,
  backgroundImage,
  cssBackgroundSize,
  cssBackgroundPosition,
  cssBackgroundRepeat,
  cssBackgroundColor = '#fff',
}: SectionProps) {
  const backgroundStyle = {
    ...(cssBackgroundSize && { backgroundSize: cssBackgroundSize }),
    ...(cssBackgroundPosition && { backgroundPosition: cssBackgroundPosition }),
    ...(cssBackgroundRepeat && { backgroundRepeat: cssBackgroundRepeat }),
  }

  const bgImage = backgroundImage && convertToBgImage(getImage(backgroundImage))

  return backgroundImage ? (
    <BackgroundImage
      className={classNames(styles.section, className)}
      Tag='section'
      {...bgImage}
      preserveStackingContext
      backgroundColor={cssBackgroundColor}
      // Safari Technology Preview doesn't take the styles from scss
      // for some reason not determined yet ,so as a temporary fix we pass the styles as property
      style={backgroundStyle}
    >
      {children}
    </BackgroundImage>
  ) : (
    <section className={classNames(styles.section, className)}>{children}</section>
  )
}
