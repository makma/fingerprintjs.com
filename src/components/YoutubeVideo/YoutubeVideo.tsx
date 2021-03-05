import React from 'react'

import styles from './YouTubeVideo.module.scss'

interface YouTubeVideoProps {
  embedId: string
  iframeTitle: string
  iframeWidth: number
  iframeHeight: number
}
export default function YouTubeVideo({ embedId, iframeTitle, iframeWidth, iframeHeight }: YouTubeVideoProps) {
  return (
    <div className={styles.root}>
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
