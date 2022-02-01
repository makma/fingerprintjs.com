export interface SuccessResponse {
  requestId: string
  ip: string
  tag: string
  bot: {
    automationTool: DetectNote
    searchEngine: DetectNote
    browserSpoofing: DetectNote
  }
  vm: DetectNote
}

interface DetectNote {
  status: DetectStatus
  probability: number
  type?: string
}

type DetectStatus = 'processed' | 'notEnoughData' | 'error'
