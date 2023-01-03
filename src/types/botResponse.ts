export interface SuccessResponse {
  requestId: string
  products: {
    botd: {
      data: {
        bot: {
          result: DetectStatus
          type?: string
        }
        meta: { yourTag: number }
        ip: string
        time: string
        url: string
        userAgent: string
        requestId: string
      }
      error?: {
        code: string
        message: string
      }
    }
  }
}

type DetectStatus = 'good' | 'bad' | 'notDetected'
