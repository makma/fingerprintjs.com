import { useEffect, useState } from 'react'
import Botd from '@fpjs-incubator/botd-agent'
import { BOTD_TOKEN } from '../constants/env'

export const useBotDResponse = () => {
  // TODO the botd team will add the export of the types in the next release
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [visitorData, setVisitorData] = useState<any>()
  const [hasError, setHasError] = useState(false)
  const [error, setError] = useState<string>()

  useEffect(() => {
    async function getVisitorData() {
      try {
        const botD = await Botd.load({
          token: BOTD_TOKEN,
          mode: 'allData',
        })
        const result = await botD.detect()
        setVisitorData(result)
      } catch (error) {
        setHasError(true)

        if (typeof error === 'string') {
          setError(error)
        } else if (error instanceof Error) {
          setError(error.message)
        }
      }
    }

    getVisitorData()
  }, [])

  return { visitorData, hasError, error }
}
