import { paths } from '~/paths'
import { useDialog } from '~/common/dialog'
import { WalletDetail } from '~/wallets/wallet-detail'
import { WalletList } from '~/wallets/wallet-list'
import { WalletNetworkSwitcher } from '~/wallets/wallet-network-switcher'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { LayoutSidebar, LayoutContainer } from '../common'
import * as styles from './app-layout.css'

export type AppLayoutProps = unknown

const MENU = [
  {
    title: 'Portfolio',
    path: paths.portfolio,
    icon: 'home' as const,
  },
  {
    title: 'Protocols',
    path: paths.protocols.list,
    icon: 'home' as const,
  },
  {
    title: 'Proposals',
    path: paths.proposals.list,
    icon: 'home' as const,
  },
  {
    title: 'Notifications',
    path: paths.userEventSubscriptions.list,
    icon: 'home' as const,
  },
  {
    title: 'Governance',
    path: '/governance',
    icon: 'home' as const,
  },
  {
    title: 'Billing',
    path: paths.billing,
    icon: 'home' as const,
  },
  {
    title: 'Contacts',
    path: paths.contacts.list,
    icon: 'home' as const,
  },
]

export const AppLayout: React.FC<AppLayoutProps> = (props) => {
  const { account = null } = walletNetworkModel.useWalletNetwork()

  const [openWalletList, closeWalletList] = useDialog(WalletList)
  const [openChangeWallet] = useDialog(WalletDetail)

  const handleOpenWalletList = () =>
    openWalletList({ onClick: closeWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  const handleChangeWallet = () =>
    openChangeWallet({ onChange: handleOpenWalletList }).catch((error: Error) =>
      console.error(error.message)
    )

  return (
    <div className={styles.root}>
      <LayoutSidebar
        account={account}
        onConnect={handleOpenWalletList}
        onChangeWallet={handleChangeWallet}
        menu={MENU}
      >
        <WalletNetworkSwitcher />
      </LayoutSidebar>
      <LayoutContainer>{props.children}</LayoutContainer>
    </div>
  )
}
