import { useEthereumNetwork } from './wallets/wallet-networks'
import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ThemeProvider } from './common/theme'
import { ToastProvider } from './toasts'
import { UserProvider } from './users'

export const App: React.VFC = () => {
  useEthereumNetwork()

  return (
    <ThemeProvider>
      <DialogProvider>
        <ToastProvider maxItems={6}>
          <UserProvider>
            <Router />
          </UserProvider>
        </ToastProvider>
      </DialogProvider>
    </ThemeProvider>
  )
}
