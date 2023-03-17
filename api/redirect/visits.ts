import type { VercelRequest, VercelResponse } from '@vercel/node'
import { getErrorMessage } from '../_utils/utils'

export default async function visitsEndpoint(req: VercelRequest, res: VercelResponse) {
  // Get the visitorId parameter from the request body
  const { visitorId } = req.body

  const endpoint = process.env.GATSBY_FPJS_VISITORS_ENDPOINT
  const key = process.env.GATSBY_FPJS_SECRET_TOKEN
  try {
    // Make a request to the events API with the requestId parameter
    // 21 to show >20 on homepage
    const response = await fetch(`${endpoint}${visitorId}?api_key=${key}&limit=21`)
    const data = await response.json()

    // Send the response back to the client
    res.json(data)
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
}
