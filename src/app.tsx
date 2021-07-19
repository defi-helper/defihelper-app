import { useNetwork } from './wallets/wallet-networks'
import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { ToastProvider } from './toasts'
import { UserProvider } from './users'

export const App: React.VFC = () => {
  useNetwork()

  return (
    <DialogProvider>
      <ToastProvider maxItems={6}>
        <UserProvider>
          <Router />
        </UserProvider>
      </ToastProvider>
    </DialogProvider>
  )
}
