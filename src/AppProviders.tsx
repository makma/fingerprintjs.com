import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { GithubProvider } from './context/GithubContext'
import { BotdProvider } from './context/BotdContext'
import { HistoryListener } from './context/HistoryListener'
import { FPJS_PUBLIC_TOKEN, FPJS_REGION, FPJS_SCRIPT_URL_PATTERN } from './constants/env'

export type Props = {
  children: React.ReactNode
}

export default function AppProviders({ children }: Props) {
  return (
    <AppLighthouseProvider>
      <BotdProvider>
        <FormProvider>
          <GithubProvider>
            <HistoryListener>
              <React.StrictMode>{children}</React.StrictMode>
            </HistoryListener>
          </GithubProvider>
        </FormProvider>
      </BotdProvider>
    </AppLighthouseProvider>
  )
}

function AppLighthouseProvider({ children }: { children: React.ReactNode }) {
  const isBot = navigator.userAgent.indexOf('Chrome-Lighthouse') > -1 || navigator.userAgent.indexOf('PageSpeed') > -1
  const publicApiKey = FPJS_PUBLIC_TOKEN
  const region = FPJS_REGION as FingerprintJS.Region
  const scriptUrlPattern = FPJS_SCRIPT_URL_PATTERN

  if (!isBot) {
    return (
      <FpjsProvider
        loadOptions={{
          apiKey: publicApiKey ?? '',
          region,
          scriptUrlPattern,
        }}
      >
        {children}
      </FpjsProvider>
    )
  } else {
    return <>{children}</>
  }
}
