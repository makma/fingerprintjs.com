import type { VercelRequest, VercelResponse } from '@vercel/node'
import { config, renderBody } from './_lib/oauth2'
import { AuthorizationCode } from 'simple-oauth2'

const callback = async (req: VercelRequest, res: VercelResponse) => {
  const code = req.query.code as string
  const { host } = req.headers

  const client = new AuthorizationCode(config)

  try {
    // we recreate the client we used to make the request
    const accessToken = await client.getToken({
      code,
      redirect_uri: `https://${host}/api/callback`,
    })
    // create our token object
    const { token } = client.createToken(accessToken)
    res.status(200).send(
      renderBody('success', {
        token: token.access_token,
        provider: 'github',
      })
    )
  } catch (e) {
    res.status(200).send(renderBody('error', e as Record<string, unknown>))
  }
}
export default callback
