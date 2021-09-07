import React, { useEffect } from 'react'
import useSiteMetadata from '../../../hooks/useSiteMetadata'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { LayoutTemplate } from '../../../components/Layout'
import { useVisitorData } from '../../../context/FpjsContext'

import { useLocation } from '@reach/router'
import { GeneratedPageContext } from '../../../helpers/types'
import BreadcrumbsSEO from '../../../components/Breadcrumbs/BreadcrumbsSEO'
import { trackLeadSubmit } from '../../../helpers/gtm'

import { PageContent } from '../index'

interface ContactSalesPageProps {
  pageContext: GeneratedPageContext
}
export default function ConfirmPage({ pageContext }: ContactSalesPageProps) {
  const breadcrumbs = pageContext.breadcrumb.crumbs

  const { pathname } = useLocation()
  let siteMetadata = useSiteMetadata()
  siteMetadata = {
    ...siteMetadata,
    title: 'Contact Sales - FingerprintJS Pro',
    siteUrl: `${siteMetadata.siteUrl}${pathname}`,
  }

  const [isLeadSubmitEnabled, setLeadSubmitEnabled] = useLocalStorage('track_lead_submit_enabled', true)
  const { visitorData } = useVisitorData()

  useEffect(() => {
    if (isLeadSubmitEnabled && visitorData) {
      setLeadSubmitEnabled(false)
      trackLeadSubmit()
    }
    // ESLint rule "react-hooks/exhaustive-deps" fail on missing dependencies isLeadSubmitEnabled
    // but we only want to run the function after visitorData is populated (so we know analytics is enabled)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitorData])

  return (
    <LayoutTemplate siteMetadata={siteMetadata}>
      {breadcrumbs && <BreadcrumbsSEO breadcrumbs={breadcrumbs} />}
      <PageContent confirmPage={true} />
    </LayoutTemplate>
  )
}
