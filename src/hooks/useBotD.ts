import { useEffect, useState } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { SuccessResponse } from '../types/botResponse'
import { BASE_URL } from '../constants/content'
import { getErrorMessage } from '../helpers/error'
import { getConfig } from '../helpers/fpjs'
import axios from 'axios'
import { generateRandomString } from '../helpers/common'
import { IS_PRODUCTION, FPJS_SECRET_TOKEN, BOTD_VERIFY_AGENT_ENDPOINT } from '../constants/env'

export const useBotD = () => {
  const [visitorData, setVisitorData] = useState<SuccessResponse>()
  const [requestId, setRequestId] = useState<string>()

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
        setRequestId(data?.requestId)
        const randomPath = generateRandomString(5)
        try {
          let result
          if (IS_PRODUCTION) {
            result = await axios.post(
              `${BASE_URL}/${randomPath}/`,
              {
                requestId: data.requestId,
              },
              {
                headers: {
                  'x-vercel-function': 'event',
                },
              }
            )
          } else {
            result = await axios.get(`${BOTD_VERIFY_AGENT_ENDPOINT}/events/${data.requestId}`, {
              headers: {
                'Auth-API-Key': FPJS_SECRET_TOKEN,
              },
            })
          }

          if (result.data.products.botd.error) {
            throw new Error(result.data.products.botd.error.message)
          }
          if (!result.data.products.botd.data) {
            throw new Error('BotD field is empty')
          }
          setVisitorData(result.data)
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
  return { visitorData, requestId, isLoading, hasError, error, refresh }
}
