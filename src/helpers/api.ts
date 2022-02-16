import { FPJS_SECRET_TOKEN, FPJS_VISITORS_ENDPOINT, FPJS_MGMT_API_HOST, BOTD_TOKEN_ENDPOINT } from '../constants/env'

const secretToken = FPJS_SECRET_TOKEN
const endpoint = FPJS_VISITORS_ENDPOINT

export async function loadFpjsHistory(visitorId: string) {
  const response = await fetch(`${endpoint}${visitorId}?token=${secretToken}&limit=20`)
  return await response.json()
}

export async function createNewLead(
  formName: string,
  email: string,
  url: string,
  phone: string,
  description: string,
  landingPage: string,
  previousPage: string,
  utmParams: Record<string, string>
) {
  return fetch(`${FPJS_MGMT_API_HOST}/salesforce/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formName,
      email,
      url,
      description,
      phone,
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
