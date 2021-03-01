import React from 'react'

import styles from './YoutubeEmbed.module.scss'

interface YoutubeEmbedProps {
  embedId: string
}
export default function YoutubeEmbed({ embedId }: YoutubeEmbedProps) {
  return (
    <div className={styles.videoResponsive}>
      <iframe
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </div>
  )
}
