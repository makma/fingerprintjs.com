import type { VercelRequest, VercelResponse } from '@vercel/node'

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : `Unknown error ${error}`
}
export default async function eventsRequest(req: VercelRequest, res: VercelResponse) {
  // Get the requestId parameter from the request body
  const { requestId } = req.body

  const endpoint = process.env.GATSBY_BOTD_VERIFY_AGENT_ENDPOINT
  const key = process.env.GATSBY_FPJS_SECRET_TOKEN
  try {
    // Make a request to the events API with the requestId parameter
    const response = await fetch(`${endpoint}/events/${requestId}`, {
      method: 'GET',
      headers: {
        'Auth-API-Key': key ?? '',
      },
    })
    const data = await response.json()

    // Send the response back to the client
    res.json(data)
  } catch (e) {
    res.status(500).send(getErrorMessage(e))
  }
}
