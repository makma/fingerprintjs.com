import React, { useEffect, useState, useContext } from 'react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { FPJS_PUBLIC_TOKEN, FPJS_REGION, FPJS_CDN_URL } from '../constants/env'
type FormContextType = {
  visitorData?: FingerprintJS.ExtendedGetResult
  hasFpjsError?: boolean
}

const FpjsContext = React.createContext<FormContextType>({})
const config: FingerprintJS.GetOptions<true> = {
  extendedResult: true,
  timeout: 30_000,
}

export const useVisitorData = () => useContext(FpjsContext)

export function FpjsProvider({ children }: { children: React.ReactNode }) {
  const isBot = navigator.userAgent.indexOf('Chrome-Lighthouse') > -1 || navigator.userAgent.indexOf('PageSpeed') > -1

  if (!isBot) {
    return FpjsAppProvider({ children })
  } else {
    return <>{children}</>
  }
}

function FpjsAppProvider({ children }: { children: React.ReactNode }) {
  const publicToken = FPJS_PUBLIC_TOKEN
  const region = FPJS_REGION as FingerprintJS.Region
  const cdnUrl = FPJS_CDN_URL

  const [visitorData, setVisitorData] = useState<FingerprintJS.ExtendedGetResult>()
  const [hasFpjsError, setHasFpjsError] = useState(false)

  useEffect(() => {
    async function getVisitorData() {
      try {
        const fp = await FingerprintJS.load({
          token: publicToken,
          region,
          cdnUrl,
        })
        const result = await fp.get(config)
        if (!result) {
          setHasFpjsError(true)
          return
        }
        setVisitorData(result)
      } catch (error) {
        // Adds a special name to JS agent errors so that they can be found in Rollbar easily.
        if (error instanceof Error) {
          setHasFpjsError(true)
          error.message = `${error.name}: ${error.message}`
          error.name = 'FPJSAgentError'
          throw error
        }
      }
    }

    getVisitorData()
  }, [publicToken, region, cdnUrl])

  return <FpjsContext.Provider value={{ visitorData, hasFpjsError }}>{children}</FpjsContext.Provider>
}

export default FpjsContext
