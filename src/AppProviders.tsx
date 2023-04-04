import React from 'react'
import { FormProvider } from './hooks/useForm'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'
import * as FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { CacheLocation } from '@fingerprintjs/fingerprintjs-pro-spa'
import { GithubProvider } from './context/GithubContext'
import { BotdProvider } from './context/BotdContext'
import { HistoryListener } from './context/HistoryListener'
import { FPJS_PUBLIC_TOKEN, FPJS_REGION, FPJS_SCRIPT_URL_PATTERN, ROLLBAR_ACCESS_TOKEN, GIT_SHA } from './constants/env'
import { isBrowser } from './helpers/detector'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

export type Props = {
  children: React.ReactNode
}

const rollbarConfig = {
  accessToken: ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
  checkIgnore: function (_isUncaught, _args, payload) {
    const error = payload.body.trace.exception.message
    // Due to the fact that these errors are not actionable at the moment (impossible to know where they come from) in order to consume less quotas we will filter them until they are more actionable
    // https://github.com/facebook/react/issues/26224
    if (error && error.includes('Minified React error')) {
      return true
    }
    return false
  },
  payload: {
    environment: 'production',
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: GIT_SHA,
      },
    },
  },
}

export default function AppProviders({ children }: Props) {
  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
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
      </ErrorBoundary>
    </RollbarProvider>
  )
}

function AppLighthouseProvider({ children }: { children: React.ReactNode }) {
  const isBot = isBrowser()
    ? navigator.userAgent.indexOf('Chrome-Lighthouse') > -1 || navigator.userAgent.indexOf('PageSpeed') > -1
    : true
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
        cacheLocation={CacheLocation.NoCache}
      >
        {children}
      </FpjsProvider>
    )
  } else {
    return <>{children}</>
  }
}
