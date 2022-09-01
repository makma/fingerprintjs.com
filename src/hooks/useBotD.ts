import { useEffect, useState } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { SuccessResponse } from '../types/botResponse'
import { FPJS_SECRET_TOKEN, BOTD_VERIFY_AGENT_ENDPOINT } from '../constants/env'
import { getErrorMessage } from '../helpers/error'
import { getConfig } from '../helpers/fpjs'

export const useBotD = () => {
  const [visitorData, setVisitorData] = useState<SuccessResponse>()
  const { getData } = useVisitorData(getConfig, { immediate: false })

  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)
  const [reload, setReload] = useState(false)

  useEffect(() => {
    async function getVisitorData() {
      setIsLoading(true)
      setHasError(false)

      const data = await getData({ ignoreCache: true })
      if (data?.requestId) {
        try {
          const response = await fetch(`${BOTD_VERIFY_AGENT_ENDPOINT}/events/${data.requestId}`, {
            method: 'GET',
            headers: {
              'Auth-API-Key': FPJS_SECRET_TOKEN,
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
      } else {
        setHasError(true)
      }
    }

    getVisitorData()
    // Adding getData to deps make double call to coreApi no homepage and demopage
    // eslint-disable-next-line
  }, [reload])

  const refresh = () => {
    setReload(true)
  }
  return { visitorData, isLoading, hasError, error, refresh }
}
