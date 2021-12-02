import React from 'react'
import { LayoutTemplate } from '../../components/Layout'
import BreadcrumbsSEO from '../../components/Breadcrumbs/BreadcrumbsSEO'
import { GeneratedPageContext } from '../../helpers/types'

import HeroSection from '../../components/botd/HeroSection/HeroSection'
import GenerateKeySection from '../../components/botd/GenerateKeySection/GenerateKeySection'

import useSiteMetadata from '../../hooks/useSiteMetadata'
import { useLocation } from '@reach/router'

interface AccountSharingProps {
  pageContext: GeneratedPageContext
}
export default function Botd({ pageContext }: AccountSharingProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs
  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'TODO', //TODO
    description: 'TODO', //TODO
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <HeroSection />
      <GenerateKeySection />
    </LayoutTemplate>
  )
}
