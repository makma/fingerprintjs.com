import { useEffect, useState } from 'react'
import Botd from '@fpjs-incubator/botd-agent'
import { BOTD_TOKEN } from '../constants/env'
import { getErrorMessage } from '../helpers/error'

export const useBotD = () => {
  // TODO the botd team will add the export of the types in the next release
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [visitorData, setVisitorData] = useState<any>()
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getVisitorData() {
      setIsLoading(true)

      try {
        const botD = await Botd.load({
          token: BOTD_TOKEN,
          mode: 'allData',
        })
        const result = await botD.detect()
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
