import { useNetwork } from './wallets/wallet-networks'
import { Router } from './router'
import { DialogProvider } from './common/dialog'
import { NotificationsProvider } from './notifications'
import { UserProvider } from './users'

export const App: React.VFC = () => {
  useNetwork()

  return (
    <DialogProvider>
      <NotificationsProvider maxItems={6}>
        <UserProvider>
          <Router />
        </UserProvider>
      </NotificationsProvider>
    </DialogProvider>
  )
}
