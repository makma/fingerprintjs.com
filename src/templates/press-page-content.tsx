import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

import PreviewProviders from '../cms/PreviewProviders'
import PressReleasesSection, { CardProps } from '../components/press/PressReleasesSection/PressReleasesSection'

export function PressPageContentPreview({ entry }: PreviewTemplateComponentProps) {
  const pressCards = {
    pressReleasesCards: entry.getIn(['data', 'pressReleases'])?.toJS() as CardProps[],
    newsCards: entry.getIn(['data', 'news'])?.toJS() as CardProps[],
  }

  return (
    <PreviewProviders>
      <PressReleasesSection {...pressCards} />
    </PreviewProviders>
  )
}
