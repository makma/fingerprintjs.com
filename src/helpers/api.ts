import { FPJS_API_TOKEN, FPJS_VISITORS_ENDPOINT, FPJS_LEAD_URL } from '../constants/env'

const apiToken = FPJS_API_TOKEN
const endpoint = FPJS_VISITORS_ENDPOINT

export async function loadFpjsHistory(visitorId: string) {
  const response = await fetch(`${endpoint}${visitorId}?token=${apiToken}&limit=20`)
  return await response.json()
}

export async function createNewLead(
  leadName: string,
  email: string,
  url: string,
  description: string,
  utmInfo: Record<string, string>
) {
  return fetch(FPJS_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: leadName,
      email,
      url,
      description,
      utm_info: utmInfo,
    }),
  })
}
