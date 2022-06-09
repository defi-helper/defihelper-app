import { HelmetProvider } from 'react-helmet-async'
import { ClientContext } from 'graphql-hooks'

import './app.css'
import './assets/fonts/Basier-Circle-regular-webfont/stylesheet.css'
import './assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import './assets/fonts/Basier-Square-regular-webfont/stylesheet.css'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'
import { YMInitializer } from 'react-yandex-metrika'
import { useEthereumNetwork } from './wallets/wallet-networks'
import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ThemeProvider } from './common/theme'
import { ToastProvider } from './toasts'
import { AuthProvider } from './auth'
import { getAPIClient } from './api'
import { ErrorBoundary, Sentry } from './error-boundary'
import { config } from './config'
import { Cookie } from './common/cookie'

Sentry.init()

const client = getAPIClient()

export const App: React.VFC = () => {
  useEthereumNetwork()

  const matomoCounterConfiguration = createInstance({
    urlBase: 'https://defihelper.matomo.cloud',
    siteId: 1,
    disabled: config.IS_DEV,
  })

  return (
    <ErrorBoundary>
      {!config.IS_DEV && (
        <YMInitializer
          accounts={[86006279]}
          options={{ webvisor: true }}
          version="2"
        />
      )}
      <MatomoProvider value={matomoCounterConfiguration}>
        <ClientContext.Provider value={client}>
          <HelmetProvider>
            <ThemeProvider>
              <DialogProvider>
                <ToastProvider maxItems={6}>
                  <AuthProvider>
                    <Router />
                    <Cookie />
                  </AuthProvider>
                </ToastProvider>
              </DialogProvider>
            </ThemeProvider>
          </HelmetProvider>
        </ClientContext.Provider>
      </MatomoProvider>
    </ErrorBoundary>
  )
}
