import { useEffect, useState } from 'react'
import Botd from '@fpjs-incubator/botd-agent'
import { BOTD_TOKEN } from '../constants/env'

export const useBotDResponse = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [visitorData, setVisitorData] = useState<any>()

  const clientToken = BOTD_TOKEN

  useEffect(() => {
    async function getVisitorData() {
      try {
        const botD = await Botd.load({
          token: clientToken,
          mode: 'allData',
        })
        const result = await botD.detect()
        setVisitorData(result)
      } catch (error) {
        // noop
      }
    }

    getVisitorData()
  }, [clientToken])

  return visitorData
}
