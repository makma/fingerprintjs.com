import React from 'react'
import { PreviewTemplateComponentProps } from 'netlify-cms-core'

import PreviewProviders from '../cms/PreviewProviders'
import TeamMembersSection from '../components/careers/TeamMembersSection/TeamMembersSection'

export function TeamMembersContentPreview({ entry }: PreviewTemplateComponentProps) {
  const teamMembers = {
    totalMembers: entry.getIn(['data', 'totalMembers']) as number,
  }

  return (
    <PreviewProviders>
      <TeamMembersSection {...teamMembers} />
    </PreviewProviders>
  )
}
