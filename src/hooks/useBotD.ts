import { useEffect, useState } from 'react'
import Botd, { BotdResponse } from '@fpjs-incubator/botd-agent'
import { BOTD_PUBLIC_TOKEN, BOTD_SECRET_TOKEN, BOTD_VERIFY_ENDPOINT } from '../constants/env'
import { getErrorMessage } from '../helpers/error'

export const useBotD = () => {
  type SuccessResponse = Extract<BotdResponse, { bot }>
  const [visitorData, setVisitorData] = useState<SuccessResponse>()
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getVisitorData() {
      setIsLoading(true)

      try {
        const botD = await Botd.load({
          publicKey: BOTD_PUBLIC_TOKEN,
        })
        const botdResp = await botD.detect()
        if ('error' in botdResp) {
          throw new Error(botdResp.error.message)
        }

        const verifyBody = JSON.stringify({
          secretKey: BOTD_SECRET_TOKEN,
          requestId: botdResp.requestId,
        })
        const response = await fetch(BOTD_VERIFY_ENDPOINT, {
          body: verifyBody,
          method: 'POST',
        })
        const result: SuccessResponse = await response.json()
        setVisitorData(result)
      } catch (error) {
        setHasError(true)
        setError(getErrorMessage(error))
      }
      setIsLoading(false)
    }

    getVisitorData()
  }, [])

  return { visitorData, isLoading, hasError, error }
}
