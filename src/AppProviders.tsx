import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from './context/FpjsContext'
import { GithubProvider } from './context/GithubContext'
import { HistoryListener } from './context/HistoryListener'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  return (
    <FpjsProvider>
      <FormProvider>
        <GithubProvider>
          <HistoryListener>
            <React.StrictMode>{children}</React.StrictMode>
          </HistoryListener>
        </GithubProvider>
      </FormProvider>
    </FpjsProvider>
  )
}
