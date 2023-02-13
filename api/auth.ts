import type { VercelRequest, VercelResponse } from '@vercel/node'
import { AuthorizationCode } from 'simple-oauth2'

import crypto from 'crypto'
import { config } from './_lib/oauth2'

export const randomString = () => crypto.randomBytes(4).toString(`hex`)

const auth = (req: VercelRequest, res: VercelResponse) => {
  const { host } = req.headers

  const client = new AuthorizationCode(config)

  // simple-oauth will use our config files to generate a client we can use to request access

  const url = client.authorizeURL({
    redirect_uri: `https://${host}/api/callback`,
    scope: `repo,user`,
    state: randomString(),
  })

  // Get redirected to Github for authorization
  res.writeHead(301, { Location: url })
  res.end()
}
export default auth
