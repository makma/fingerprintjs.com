import { useEffect, useState } from 'react'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { SuccessResponse } from '../types/botResponse'
import { BASE_URL } from '../constants/content'
import { getErrorMessage } from '../helpers/error'
import { getConfig } from '../helpers/fpjs'
import axios from 'axios'
import { generateRandomString } from '../helpers/common'

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
        const randomPath = generateRandomString(5)
        try {
          const result = await axios.post(
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
  return { visitorData, isLoading, hasError, error, refresh }
}
