import { NowRequest, NowResponse } from '@now/node'
import { create, renderBody } from './_lib/oauth2'

const callback = async (req: NowRequest, res: NowResponse) => {
  const code = req.query.code as string
  const { host } = req.headers

  const oauth2 = create()

  try {
    // we recreate the client we used to make the request
    const accessToken = await oauth2.authorizationCode.getToken({
      code,
      redirect_uri: `https://${host}/api/callback`,
    })
    // create our token object
    const { token } = oauth2.accessToken.create(accessToken)

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
