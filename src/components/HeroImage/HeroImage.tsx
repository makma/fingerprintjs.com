import React from 'react'
import PreviewCompatibleImage, { ImageInfo } from '../common/PreviewCompatibleImage/PreviewCompatibleImage'

import styles from './HeroImage.module.scss'

export interface HeroImageComponentProps {
  image: ImageInfo
  imageAlt?: string
  imageTitle?: string
}

export default function HeroImageComponent({ image, imageAlt, imageTitle }: HeroImageComponentProps) {
  return (
    <div className={styles.root}>
      <PreviewCompatibleImage imageInfo={image} altTag={imageAlt} titleTag={imageTitle} className={styles.image} />
    </div>
  )
}
