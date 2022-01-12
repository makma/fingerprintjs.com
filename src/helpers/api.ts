import { FPJS_API_TOKEN, FPJS_VISITORS_ENDPOINT, FPJS_LEAD_URL, BOTD_TOKEN_ENDPOINT } from '../constants/env'

const apiToken = FPJS_API_TOKEN
const endpoint = FPJS_VISITORS_ENDPOINT

export async function loadFpjsHistory(visitorId: string) {
  const response = await fetch(`${endpoint}${visitorId}?token=${apiToken}&limit=20`)
  return await response.json()
}

export async function createNewLead(
  formName: string,
  email: string,
  url: string,
  description: string,
  landingPage: string,
  previousPage: string,
  utmParams: Record<string, string>
) {
  return fetch(FPJS_LEAD_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formName,
      email,
      url,
      description,
      utm_info: utmParams,
      landingPage,
      previousPage,
    }),
  })
}

export async function generateBotDToken(customerEmail: string, tag: string) {
  return fetch(BOTD_TOKEN_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify({
      customer: customerEmail,
      tag,
    }),
  })
}
