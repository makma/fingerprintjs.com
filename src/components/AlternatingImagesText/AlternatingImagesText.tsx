import React from 'react'
import Container from '../common/Container'
import styles from './AlternatingImagesText.module.scss'
import classNames from 'classnames'

export interface BlockWithImage {
  image: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  title: string
  content: React.ReactNode
}

export interface AlternatingImagesTextProps {
  blocks: BlockWithImage[]
}
export default function AlternatingImagesText({ blocks }: AlternatingImagesTextProps) {
  return (
    <>
      {blocks.map(({ image: Image, title, content }, index) => (
        <Container size='large' className={styles.container} key={title}>
          <Image className={styles.image} />
          <div className={classNames(styles.text, { [styles.left]: Math.abs(index) % 2 !== 1 })}>
            <h2 className={styles.blockTitle}>{title}</h2>
            {content}
          </div>
        </Container>
      ))}
    </>
  )
}
