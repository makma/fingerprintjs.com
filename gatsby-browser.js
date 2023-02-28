import './src/styles/vendors/normalize.scss'
import './src/styles/vendors/tippy.scss'
import './src/styles/vendors/swiper.scss'
import './src/styles/vendors/code-theme.scss'
import './src/styles/global-styles.scss'
import './src/styles/custom-properties.scss'

import React from 'react'
import AppProviders from './src/AppProviders'
import { PAGES_RELOAD_CHATBOT } from './src/constants/content'
import { consolePromotionMessage } from './src/helpers/consolePromotionMessage'
import { URL } from './src/constants/content'

export const wrapPageElement = ({ element }) => <AppProviders>{element}</AppProviders>
export const onRouteUpdate = ({ location, prevLocation }) => {
  const prevPage = prevLocation ? PAGES_RELOAD_CHATBOT.includes(prevLocation.pathname) : false
  const shouldResetWidget = PAGES_RELOAD_CHATBOT.includes(location.pathname) || prevPage

  if (shouldResetWidget && window.HubSpotConversations) {
    const status = window.HubSpotConversations.widget.status()

    if (status.loaded) {
      window.HubSpotConversations.clear({ resetWidget: true })
    }
  }
}

export const onInitialClientRender = () => {
  consolePromotionMessage(`Like breaking things to see how they work? Join us: ${URL.careersConsoleLogUrl}`)
}
