import { BotdResponse } from '@fpjs-incubator/botd-agent'

export type SuccessResponse = Extract<BotdResponse, { bot }>
