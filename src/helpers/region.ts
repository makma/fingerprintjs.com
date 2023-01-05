import countriesRegionJson from '../constants/countriesRegion.json'
import { IpRegion } from './api'

export enum Region {
  APAC = 'APAC',
  EMEA = 'EMEA',
  LATAM = 'LATAM',
  AMER = 'AMER',
}
export function getCountryRegion(countryCode: string) {
  const region = Object.keys(countriesRegionJson).find((key) =>
    countriesRegionJson[key].countries.includes(countryCode)
  ) as Region

  return region || Region.AMER
}

// for HubSpot forms (AMER/LATAM = Americas)
export function getIpRegion(countryRegion: Region) {
  if (countryRegion === Region.AMER || countryRegion === Region.LATAM) {
    return IpRegion.AMERICAS
  }

  return countryRegion
}
