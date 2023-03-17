import { FPJS_MGMT_API_HOST, GREENHOUSE_COMPANY_ID } from '../constants/env'
import { BASE_URL } from '../constants/content'
import axios from 'axios'
import { generateRandomString } from './common'

export async function loadFpjsHistory(visitorId: string) {
  const randomPath = generateRandomString(4)

  const response = await axios.post(
    `${BASE_URL}/${randomPath}/`,
    {
      visitorId: visitorId,
    },
    {
      headers: {
        'x-vercel-function': 'visits',
      },
    }
  )
  return response.data
}

export enum IpRegion {
  APAC = 'APAC',
  EMEA = 'EMEA',
  AMERICAS = 'Americas',
}
interface TrackParams {
  visitorId?: string
  ipRegion?: 'APAC' | 'EMEA' | 'Americas'
}
interface CreateNewLeadParams extends TrackParams {
  formName: string
  email: string
  url: string
  jobTitle: string
  description: string
  landingPage: string
  previousPage: string
  utmParams: Record<string, string>
  sessionId: string
}

export async function createNewLead({
  formName,
  email,
  url,
  jobTitle,
  description,
  landingPage,
  previousPage,
  utmParams,
  sessionId,
  visitorId,
  ipRegion,
}: CreateNewLeadParams) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: formName,
      email,
      url,
      description,
      jobTitle,
      utm_info: utmParams,
      landingPage,
      previousPage,
      sessionId,
      visitorId,
      ipRegion,
    }),
  })
}

interface SubscribeToNewsletterParams extends TrackParams {
  email: string
  utmParams: Record<string, string>
}
export async function subscribeToNewsletter({ email, utmParams, visitorId, ipRegion }: SubscribeToNewsletterParams) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/newsletter`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      utm_info: utmParams,
      visitorId,
      ipRegion,
    }),
  })
}

interface RequestBotdKeysParams extends TrackParams {
  email: string
  sessionId: string
  utmParams: Record<string, string>
}

export async function requestBotdKeys({ email, sessionId, utmParams, visitorId, ipRegion }: RequestBotdKeysParams) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/request_botd_keys`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      sessionId,
      utm_info: utmParams,
      visitorId,
      ipRegion,
    }),
  })
}

export async function getListingsFromGreenhouse() {
  const response = await fetch(`https://api.greenhouse.io/v1/boards/${GREENHOUSE_COMPANY_ID}/jobs?content=true`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }
  const jobsJson = await response.json()

  if (!jobsJson.jobs) {
    throw new Error(`couldn't retrieve jobs from Greenhouse`)
  }

  return jobsJson
}

export async function getJobInfoFromGreenhouse(jobId: string) {
  const response = await fetch(`https://api.greenhouse.io/v1/boards/${GREENHOUSE_COMPANY_ID}/jobs/${jobId}`)

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`
    throw new Error(message)
  }
  const jobJson = await response.json()

  if (!jobJson.id) {
    throw new Error(`couldn't retrieve job information from Greenhouse`)
  }

  return jobJson
}

interface ContactSupportParams extends TrackParams {
  email: string
  description: string
  utmParams: Record<string, string>
  sessionId: string
}

export async function contactSupport({
  email,
  description,
  utmParams,
  sessionId,
  visitorId,
  ipRegion,
}: ContactSupportParams) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/support`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      description,
      utm_info: utmParams,
      sessionId,
      visitorId,
      ipRegion,
    }),
  })
}

interface ContactPressParams extends TrackParams {
  email: string
  message: string
  utmParams: Record<string, string>
  sessionId: string
}

export async function contactPress({ email, message, utmParams, sessionId, visitorId, ipRegion }: ContactPressParams) {
  return fetch(`${FPJS_MGMT_API_HOST}/hubspot/press`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      message,
      utm_info: utmParams,
      sessionId,
      visitorId,
      ipRegion,
    }),
  })
}
