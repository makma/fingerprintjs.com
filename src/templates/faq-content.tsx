import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

import PreviewProviders from '../cms/PreviewProviders'
import { FAQBlock, Faqs } from '../components/FaqBlock/FaqBlock'

export function FaqContentPreview({ entry }: PreviewTemplateComponentProps) {
  const faqs = entry.getIn(['data', 'faqBlocks'])?.toJS() as Faqs[]

  return (
    <PreviewProviders>
      <FAQBlock faqBlocks={faqs} markdown />
    </PreviewProviders>
  )
}
