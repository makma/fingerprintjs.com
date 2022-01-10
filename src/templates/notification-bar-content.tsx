import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

import PreviewProviders from '../cms/PreviewProviders'
import HeaderBar from '../components/HeaderBar/HeaderBar'
import { MarkdownContent } from '../components/Content/Content'

export function NotificationBarContentPreview({ entry }: PreviewTemplateComponentProps) {
  const notificationBody = entry.getIn(['data', 'barBody'])
  const url = entry.getIn(['data', 'url'])
  const arrowText = entry.getIn(['data', 'arrowText'])
  const BackgroundColor = entry.getIn(['data', 'backgroundColor'])

  return (
    <PreviewProviders>
      <HeaderBar linkUrl={url} arrowText={arrowText} backgroundColor={BackgroundColor}>
        {<MarkdownContent markdown={notificationBody} />}
      </HeaderBar>
    </PreviewProviders>
  )
}
