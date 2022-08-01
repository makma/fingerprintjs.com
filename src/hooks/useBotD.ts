import { useEffect, useState } from 'react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'

import { SuccessResponse } from '../types/botResponse'
import {
  BOTD_PUBLIC_TOKEN,
  BOTD_SECRET_TOKEN,
  BOTD_VERIFY_AGENT_ENDPOINT,
  FPJS_REGION,
  FPJS_SCRIPT_URL_PATTERN,
} from '../constants/env'
import { getErrorMessage } from '../helpers/error'

export const useBotD = (publicToken?: string, secretToken?: string) => {
  const region = FPJS_REGION as FingerprintJS.Region
  const scriptUrlPattern = FPJS_SCRIPT_URL_PATTERN

  const [visitorData, setVisitorData] = useState<SuccessResponse>()
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [reload, setReload] = useState(false)

  const publicKey = publicToken ?? BOTD_PUBLIC_TOKEN
  const secretKey = secretToken ?? BOTD_SECRET_TOKEN

  useEffect(() => {
    async function getVisitorData() {
      setHasError(false)
      setIsLoading(true)

      try {
        const fpPromise = FingerprintJS.load({
          apiKey: publicKey,
          region,
          scriptUrlPattern,
        })

        const fp = await fpPromise
        const fpResult = await fp.get()

        const response = await fetch(`${BOTD_VERIFY_AGENT_ENDPOINT}/events/${fpResult.requestId}`, {
          method: 'GET',
          headers: {
            'Auth-API-Key': secretKey,
          },
        })
        if (!response.ok) {
          throw new Error()
        }
        const result: SuccessResponse = await response.json()
        if (result.products.botd.error) {
          throw new Error(result.products.botd.error.message)
        }
        setVisitorData(result)
      } catch (error) {
        setHasError(true)
        setError(getErrorMessage(error))
      }
      setIsLoading(false)
      setReload(false)
    }

    getVisitorData()
  }, [reload, secretKey, publicKey, region, scriptUrlPattern])

  const refresh = () => {
    setReload(true)
  }
  return { visitorData, isLoading, hasError, error, refresh }
}
