import { HelmetProvider } from 'react-helmet-async'
import { ClientContext } from 'graphql-hooks'
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import './app.css'
import './assets/fonts/Basier-Circle-regular-webfont/stylesheet.css'
import './assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import './assets/fonts/Basier-Square-regular-webfont/stylesheet.css'
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

const matomoCounterConfiguration = createInstance({
  urlBase: config.MATOMO_URL,
  siteId: config.MATOMO_SITE_ID,
  disabled: config.IS_DEV,
})

export const App: React.VFC = () => {
  useEthereumNetwork()

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <MatomoProvider value={matomoCounterConfiguration}>
          <ClientContext.Provider value={client}>
            <HelmetProvider>
              <DialogProvider>
                <ToastProvider maxItems={6}>
                  <AuthProvider>
                    <Router />
                    <Cookie />
                  </AuthProvider>
                </ToastProvider>
              </DialogProvider>
            </HelmetProvider>
          </ClientContext.Provider>
        </MatomoProvider>
      </ErrorBoundary>
    </ThemeProvider>
  )
}
