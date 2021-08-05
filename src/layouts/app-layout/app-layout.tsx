import React from 'react'

import { useDialog } from '~/common/dialog'
import { WalletDetail } from '~/wallets/wallet-detail'
import { WalletList } from '~/wallets/wallet-list'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { LayoutHeader, LayoutContainer } from '../common'
import * as styles from './app-layout.css'

export type AppLayoutProps = unknown

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
      <LayoutHeader
        account={account}
        onConnect={handleOpenWalletList}
        onChangeWallet={handleChangeWallet}
      />
      <LayoutContainer>{props.children}</LayoutContainer>
    </div>
  )
}
