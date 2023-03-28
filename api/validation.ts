import { VercelRequest, VercelResponse } from '@vercel/node'
import { getErrorMessage } from './_utils/utils'

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
const ROLLBAR_ACCESS_TOKEN = process.env.ROLLBAR_ACCESS_TOKEN_BOTD

interface RollbarLog {
  environment?: string
  level: string
  platform?: string
  language?: string
  title: string
  body: { message: { [key: string]: string | number } }
}

async function verifyRecaptcha(token: string): Promise<number> {
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    }
  )

  const result = await response.json()

  return result.score
}

async function logToRollbar(log: RollbarLog): Promise<void> {
  await fetch('https://api.rollbar.com/api/1/item/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Rollbar-Access-Token': ROLLBAR_ACCESS_TOKEN ?? '',
    },
    body: JSON.stringify({
      data: {
        environment: 'production',
        platform: 'server',
        language: 'javascript',
        ...log,
      },
    }),
  })
}

export default async function validation(req: VercelRequest, res: VercelResponse) {
  // to avoid cors issues during development
  if (req.method === 'OPTIONS' && process.env.GATSBY_VERCEL_ENV !== 'production') {
    res.status(200).json({ body: 'OK' })
    return
  }
  const { token, isBot, requestId } = req.body

  if (!token || !requestId) {
    res.status(400).json({ error: 'token or requestId is missing' })
    return
  }

  try {
    const score = await verifyRecaptcha(token)
    const isRecaptchaBot = score < 0.5

    if (isRecaptchaBot && !isBot) {
      await logToRollbar({
        level: 'warning',
        title: 'reCAPTCHA detected bot but BotD not',
        body: {
          message: {
            body: 'reCAPTCHA detected bot but BotD not',
            recaptchaScore: score,
            requestId,
          },
        },
      })
    }
    if (!isRecaptchaBot && isBot) {
      await logToRollbar({
        level: 'warning',
        title: 'BotD detected bot but reCAPTCHA not',
        body: {
          message: {
            body: 'BotD detected bot but reCAPTCHA not',
            recaptchaScore: score,
            requestId,
          },
        },
      })
    }
    res.status(200).send('')
  } catch (error) {
    await logToRollbar({
      level: 'error',
      title: 'Error verifying reCAPTCHA',
      body: { message: { body: 'Error verifying reCAPTCHA', errorMessage: getErrorMessage(error) } },
    })
    res.status(500).json({ error: 'Error verifying reCAPTCHA' })
  }
}
