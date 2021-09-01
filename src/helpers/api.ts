import { FPJS_API_TOKEN, FPJS_VISITORS_ENDPOINT } from '../constants/env'

const apiToken = FPJS_API_TOKEN
const endpoint = FPJS_VISITORS_ENDPOINT

export async function loadFpjsHistory(visitorId: string) {
  const response = await fetch(`${endpoint}${visitorId}?token=${apiToken}&limit=20`)
  return await response.json()
}
