import React from 'react'

import styles from './YoutubeVideo.module.scss'

interface YoutubeVideoProps {
  embedId: string
  iframeTitle: string
}
export default function YoutubeVideo({ embedId, iframeTitle }: YoutubeVideoProps) {
  return (
    <div className={styles.videoResponsive}>
      <iframe
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={iframeTitle}
      />
    </div>
  )
}
