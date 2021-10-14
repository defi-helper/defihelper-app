import { HelmetProvider } from 'react-helmet-async'

import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ThemeProvider } from './common/theme'
import { ToastProvider } from './toasts'
import { UserProvider } from './users'
import './app.css'
import './assets/fonts/Basier-Circle-regular-webfont/stylesheet.css'
import './assets/fonts/Basier-Square-Mono-Regular-Webfont/stylesheet.css'
import './assets/fonts/Basier-Square-regular-webfont/stylesheet.css'

export const App: React.VFC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <DialogProvider>
          <ToastProvider maxItems={6}>
            <UserProvider>
              <Router />
            </UserProvider>
          </ToastProvider>
        </DialogProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
