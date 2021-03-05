import React from 'react'

import styles from './YoutubeVideo.module.scss'

interface YoutubeVideoProps {
  embedId: string
  iframeTitle: string
  iframeWidth: number
  iframeHeight: number
}
export default function YoutubeVideo({ embedId, iframeTitle, iframeWidth, iframeHeight }: YoutubeVideoProps) {
  return (
    <div className={styles.videoResponsive}>
      <iframe
        width={iframeWidth}
        height={iframeHeight}
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title={iframeTitle}
      />
    </div>
  )
}
