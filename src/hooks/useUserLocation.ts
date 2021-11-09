import { useVisitorData } from '../context/FpjsContext'

export const useUserLocation = () => {
  const { visitorData } = useVisitorData()
  const userRegion = visitorData && visitorData.ipLocation.continent?.code?.toUpperCase()
  const isEuUser = userRegion === 'EU'

  return { isEuUser, userRegion }
}
