import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react'
import { getConfig } from '../helpers/fpjs'

export const useUserLocation = () => {
  const { data } = useVisitorData(getConfig)
  const userRegion = data?.ipLocation?.continent?.code?.toUpperCase()
  const userCountry = data?.ipLocation?.country?.code?.toUpperCase()

  const isEuUser = userRegion === 'EU'
  return { isEuUser, userRegion, userCountry }
}
