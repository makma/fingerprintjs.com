import React, { useEffect } from 'react'
import { globalHistory } from '@reach/router'
import { getUtmParams } from '../hooks/useUtmParams'
import { objectFromEntries } from '../helpers/common'
import { setCookie, getCookie } from '../helpers/cookies'
import { useUserLocation } from '../hooks/useUserLocation'

const trackingDataCookieName = 'fpjsWebsiteData'

interface HistoryProps {
  landingPage: string
  visitedPages: string[]
  previousPage: string
  utmParams: Record<string, string>
}

const historyData: HistoryProps = {
  landingPage: '',
  visitedPages: [],
  previousPage: '',
  utmParams: {},
}

const visitedPagesLimit = 20

export function HistoryListener({ children }: { children: React.ReactNode }) {
  const { isEuUser } = useUserLocation()

  // Responsible effect of storing the visit data in memory
  useEffect(() => {
    const urlParamsEntries = new URLSearchParams(globalHistory.location.search).entries()
    const utmParams = objectFromEntries(urlParamsEntries)
    historyData.utmParams = getUtmParams(utmParams, { referral_url: document.referrer })
    historyData.landingPage = globalHistory.location.pathname
    historyData.visitedPages.push(globalHistory.location.pathname)

    return globalHistory.listen(({ action }) => {
      if (action === 'PUSH') {
        const currentPage = globalHistory.location.pathname
        const previousPage = historyData.visitedPages[historyData.visitedPages.length - 1]

        //We don't want to add the current page if it is the same as the previous page to avoid duplicates
        if (previousPage === currentPage) {
          return
        }

        historyData.previousPage = previousPage
        historyData.visitedPages.push(currentPage)

        if (historyData.visitedPages.length >= visitedPagesLimit + 1) {
          historyData.visitedPages.splice(0, 1)
        }
      }
    })
  }, [])

  // Responsible effect for loading and saving data in cookies for non-EU users
  useEffect(() => {
    if (isEuUser) {
      return
    }

    const historyDataCookies = getCookie(trackingDataCookieName)
    const cookieHistory: HistoryProps = historyDataCookies && JSON.parse(historyDataCookies).historyData

    if (cookieHistory) {
      const currentPage = globalHistory.location.pathname
      const lastCookiePage = cookieHistory.visitedPages[cookieHistory.visitedPages.length - 1]

      //We don't want to add the current page if it is the same as the last page from cookies
      if (currentPage === lastCookiePage) {
        historyData.visitedPages = cookieHistory.visitedPages
      } else {
        if (cookieHistory.visitedPages.length === visitedPagesLimit) {
          cookieHistory.visitedPages.splice(0, 1)
        }
        historyData.visitedPages = cookieHistory.visitedPages.concat(historyData.visitedPages)
      }

      historyData.landingPage = cookieHistory.landingPage
    }
    setCookie(trackingDataCookieName, JSON.stringify({ historyData }), 30)

    return globalHistory.listen(({ action }) => {
      if (action === 'PUSH') {
        setCookie(trackingDataCookieName, JSON.stringify({ historyData }), 30)
      }
    })
  }, [isEuUser])

  return <>{children}</>
}

export function useViewTracking() {
  return historyData
}
