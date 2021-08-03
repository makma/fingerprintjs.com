import React from 'react'
import classNames from 'classnames'
import BackgroundImage, { IBackgroundImageProps } from 'gatsby-background-image'

import styles from './Section.module.scss'

export interface SectionProps {
  children: React.ReactNode
  className?: string | string[]
  backgroundImageFluid?: IBackgroundImageProps['fluid']
  backgroundImageFixed?: IBackgroundImageProps['fixed']
  cssBackgroundSize?: string
  cssBackgroundPosition?: string
  cssBackgroundRepeat?: string
  cssBackgroundColor?: string
}
export default function Section({
  children,
  className,
  backgroundImageFluid,
  backgroundImageFixed,
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
  return backgroundImageFluid || backgroundImageFixed ? (
    <BackgroundImage
      className={classNames(styles.section, className)}
      Tag='section'
      fluid={backgroundImageFluid}
      fixed={backgroundImageFixed}
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
