import { HelmetProvider } from 'react-helmet-async'
import { ClientContext } from 'graphql-hooks'
import { useStore } from 'effector-react'
import { useMemo } from 'react'

import './app.css'
import './assets/fonts/Basier-Circle-regular-webfont/stylesheet.css'
import './assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import './assets/fonts/Basier-Square-regular-webfont/stylesheet.css'
import { useEthereumNetwork } from './wallets/wallet-networks'
import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ThemeProvider } from './common/theme'
import { ToastProvider } from './toasts'
import { authModel, AuthProvider } from './auth'
import { getAPIClient } from './api'
import { ErrorBoundary, Sentry } from './error-boundary'

Sentry.init()

export const App: React.VFC = () => {
  useEthereumNetwork()

  const user = useStore(authModel.$user)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const client = useMemo(() => getAPIClient(), [user])

  return (
    <ErrorBoundary>
      <ClientContext.Provider value={client}>
        <HelmetProvider>
          <ThemeProvider>
            <DialogProvider>
              <ToastProvider maxItems={6}>
                <AuthProvider>
                  <Router />
                </AuthProvider>
              </ToastProvider>
            </DialogProvider>
          </ThemeProvider>
        </HelmetProvider>
      </ClientContext.Provider>
    </ErrorBoundary>
  )
}
