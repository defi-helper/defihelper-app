import { isValidElement, cloneElement } from 'react'

import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletConnect } from './wallet-connect.hook'

export type WalletConnectProps = {
  fallback: React.ReactNode
  blockchain?: string
}

export const WalletConnect: React.FC<WalletConnectProps> = (props) => {
  if (!isValidElement(props.fallback)) throw new Error('fallback is not valid')

  const wallet = walletNetworkModel.useWalletNetwork()

  const handleConnect = useWalletConnect()

  const fallback = cloneElement(props.fallback, {
    ...props.fallback.props,
    onClick: handleConnect.bind(null, props.blockchain),
  })

  if (!wallet) return fallback

  if (props.blockchain && wallet.blockchain !== props.blockchain)
    return fallback

  return <>{props.children}</>
}
