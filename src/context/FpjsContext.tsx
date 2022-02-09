import React, { useEffect, useState, useContext } from 'react'
import { ExtendedGetResult, GetOptions, Region } from '@fingerprintjs/fingerprintjs-pro'
import {
  FPJS_PUBLIC_TOKEN,
  FPJS_ENDPOINT,
  FPJS_REGION,
  FPJS_MONITORING_CLIENT_ID,
  FPJS_MONITORING_TOKEN,
  TLS_ENDPOINT,
} from '../constants/env'
type FormContextType = {
  visitorData?: ExtendedGetResult
  hasFpjsError?: boolean
}

const FpjsContext = React.createContext<FormContextType>({})
const config: GetOptions<true> = {
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
  const endpoint = FPJS_ENDPOINT
  const region = FPJS_REGION as Region
  const monitoringClientId = FPJS_MONITORING_CLIENT_ID ?? ''
  const monitoringToken = FPJS_MONITORING_TOKEN ?? ''
  const tlsEndpoint = TLS_ENDPOINT

  const [visitorData, setVisitorData] = useState<ExtendedGetResult>()
  const [hasFpjsError, setHasFpjsError] = useState(false)

  useEffect(() => {
    async function getVisitorData() {
      try {
        const FP = await import('@fingerprintjs/fingerprintjs-pro')
        const fp = await FP.load({
          token: publicToken,
          endpoint,
          region,
          tlsEndpoint,

          // It may break after a @fingerprintjs/fingerprintjs-pro update. Please check when updating.
          debug: monitoringToken
            ? FP.makeRemoteDebugger({ clientId: monitoringClientId, token: monitoringToken })
            : undefined,
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
  }, [publicToken, endpoint, tlsEndpoint, region, monitoringClientId, monitoringToken])

  return <FpjsContext.Provider value={{ visitorData, hasFpjsError }}>{children}</FpjsContext.Provider>
}

export default FpjsContext
