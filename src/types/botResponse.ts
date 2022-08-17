export interface SuccessResponse {
  requestId: string
  products: {
    botd: {
      data: {
        bot: { result: DetectStatus }
        meta: { yourTag: number }
        ip: string
        time: string
      }
      error?: {
        code: string
        message: string
      }
    }
  }
}

type DetectStatus = 'good' | 'bad' | 'notDetected'
