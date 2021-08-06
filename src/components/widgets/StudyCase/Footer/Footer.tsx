import React from 'react'
import InlineCtaComponent from '../../../../components/widgets/InlineCta'

import { URL, PATH } from '../../../../constants/content'

export interface FooterProps {
  ctaTitle: string
  ctaSubtitle: string
}
export default function Footer({ ctaTitle, ctaSubtitle }: FooterProps) {
  return (
    <section>
      <InlineCtaComponent
        title={ctaTitle}
        primaryAction={{
          label: 'Get Started Today',
          name: 'Start Free Trial',
          action: URL.signupUrl,
        }}
        secondaryAction={{
          label: 'Talk to us',
          name: 'Contact Sales',
          action: PATH.contactSales,
        }}
        subtitle={ctaSubtitle}
        size='large'
      />
    </section>
  )
}
