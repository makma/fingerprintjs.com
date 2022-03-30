import React from 'react'
import { getImage, GatsbyImage, GatsbyImageProps, IGatsbyImageData } from 'gatsby-plugin-image'
export type ImageInfo = GatsbyImageProps & {
  childImageSharp?: IGatsbyImageData
  image?: string | { childImageSharp: IGatsbyImageData }
  extension?: string
  publicURL?: string
}

interface Props {
  className: string
  imageStyle?: React.CSSProperties
  imageInfo?: ImageInfo | string
  titleTag?: string
  altTag?: string
}

const PreviewCompatibleImage = ({ className, imageStyle, imageInfo, titleTag, altTag }: Props) => {
  if (!imageInfo) {
    return <p>PreviewCompatibleImage can not be rendered (no imageInfo)</p>
  }

  const style = imageStyle ?? { borderRadius: '5px' }

  if (typeof imageInfo === 'string') {
    return <img className={className} style={style} src={imageInfo} alt='' />
  }

  const { alt = altTag ?? '', title = titleTag, childImageSharp, image, extension, publicURL } = imageInfo

  if (!!image && typeof image != 'string') {
    return <GatsbyImage image={image} className={className} style={style} alt={alt} />
  }

  if (childImageSharp) {
    const image = getImage(childImageSharp)
    return image ? (
      <GatsbyImage
        image={image}
        className={className}
        style={style}
        alt={alt}
        title={title}
        imgStyle={{
          objectFit: 'contain',
        }}
      />
    ) : null
  }

  if (!!image && typeof image === 'string') {
    return <img className={className} style={style} src={image} alt={alt} title={title} />
  }

  if (!childImageSharp && (extension === 'svg' || extension === 'gif')) {
    return <img className={className} src={publicURL} alt={alt} title={title} />
  }

  return null
}

export default PreviewCompatibleImage
