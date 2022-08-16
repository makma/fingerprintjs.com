import React, { useEffect } from 'react'
import Footer from '../Footer'
import Header from '../Header'

import { useConsolePromotionMessage } from '../../hooks/useConsolePromotionMessage'
import { URL } from '../../constants/content'
import { enableAnalytics } from '../../helpers/gtm'
import { useUserLocation } from '../../hooks/useUserLocation'
import { amplitudeLogEvent } from '../../helpers/amplitude'
import { useStaticQuery, graphql, Script } from 'gatsby'
import { useLocation } from '@reach/router'
import { defaultDataLayer } from '../../constants/content'
import { GTM_TOKEN } from '../../constants/env'

interface LayoutProps {
  children: React.ReactNode
}
export function Layout({ children }: LayoutProps) {
  const data = useStaticQuery(graphql`
    query NotificationQuery {
      notificationBarYaml {
        arrowText
        barBody
        showNotBar
        url
        backgroundColor
      }
    }
  `)

  return data.notificationBarYaml?.showNotBar ? (
    <LayoutTemplate notificationBar={data.notificationBarYaml}>{children}</LayoutTemplate>
  ) : (
    <LayoutTemplate>{children}</LayoutTemplate>
  )
}

interface LayoutTemplateProps extends LayoutProps {
  notificationBar?: {
    arrowText?: string
    barBody?: string
    url?: string
    backgroundColor?: string
  }
}

// We need this to not use static GraphQL queries in order use it in CMS preview (it runs it in browser directly)
export function LayoutTemplate({ children, notificationBar }: LayoutTemplateProps) {
  const { isEuUser, userCountry } = useUserLocation()
  const { pathname } = useLocation()

  useEffect(() => {
    if (isEuUser === false || userCountry === 'GB') {
      enableAnalytics()
    }
  }, [isEuUser, userCountry])

  useEffect(() => {
    amplitudeLogEvent('view marketing page', { route: pathname })
  }, [pathname])

  useConsolePromotionMessage(`Like breaking things to see how they work? Join us: ${URL.careersConsoleLogUrl}`)

  return (
    // add rel=preconnect resources to gatsby-ssr.js
    <>
      <Script>{`dataLayer = ${JSON.stringify(defaultDataLayer)};`}</Script>
      <Script id='gtm-init'>
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${GTM_TOKEN}');`}
      </Script>
      <Header notificationBar={notificationBar} />
      {children}
      <Footer />
    </>
  )
}
