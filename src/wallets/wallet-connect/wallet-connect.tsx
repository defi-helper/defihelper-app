import { useStore } from 'effector-react'
import { isValidElement, cloneElement } from 'react'

import { settingsWalletModel } from '~/settings/settings-wallets'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect, useWalletSign } from './wallet-connect.hook'

export type WalletConnectProps = {
  fallback: React.ReactNode
  blockchain?: string
  network?: string
}

export const WalletConnect: React.FC<WalletConnectProps> = (props) => {
  if (!isValidElement(props.fallback)) throw new Error('fallback is not valid')

  const activeWallet = walletNetworkModel.useWalletNetwork()
  const wallets = useStore(settingsWalletModel.$wallets)

  const handleConnect = useWalletConnect()
  const handleSign = useWalletSign()

  const fallback = cloneElement(props.fallback, {
    ...props.fallback.props,
    onClick: handleConnect.bind(null, {
      blockchain: props.blockchain,
      network: props.network,
    }),
  })

  if (!activeWallet) return fallback

  if (props.blockchain && activeWallet.blockchain !== props.blockchain) {
    return fallback
  }

  const currentWallet = wallets.find((wallet) => {
    return (
      (wallet.network === 'main'
        ? wallet.address === activeWallet?.account
        : wallet.address === activeWallet?.account?.toLowerCase()) &&
      wallet.network === activeWallet?.chainId
    )
  })

  const newFallback = cloneElement(props.fallback, {
    ...fallback.props,
    onClick: handleSign.bind(null, {
      blockchain: props.blockchain,
      network: props.network,
    }),
  })

  if (!currentWallet) return newFallback

  if (props.blockchain && currentWallet.blockchain !== props.blockchain) {
    return newFallback
  }

  return <>{props.children}</>
}
