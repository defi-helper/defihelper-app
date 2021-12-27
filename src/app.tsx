import { HelmetProvider } from 'react-helmet-async'

import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ThemeProvider } from './common/theme'
import { ToastProvider } from './toasts'
import { AuthProvider } from './auth'
import './app.css'
import './assets/fonts/Basier-Circle-regular-webfont/stylesheet.css'
import './assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import './assets/fonts/Basier-Square-regular-webfont/stylesheet.css'
import { useEthereumNetwork } from './wallets/wallet-networks'

export const App: React.VFC = () => {
  useEthereumNetwork()

  return (
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
  )
}
