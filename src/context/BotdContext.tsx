import React, { createContext, useContext } from 'react'
import { useBotD } from '../hooks/useBotD'
import { SuccessResponse } from '../types/botResponse'

const BotdContext = createContext<{
  visitorData?: SuccessResponse
  isLoading?: boolean
  hasError?: boolean
  error?: string
  refresh: () => void
}>({
  refresh: () => {
    // noop
  },
})
export const useBotDContext = () => useContext(BotdContext)

export function BotdProvider({ children }: { children: React.ReactNode }) {
  return <BotdContext.Provider value={useBotD()}>{children}</BotdContext.Provider>
}

export default BotdContext
