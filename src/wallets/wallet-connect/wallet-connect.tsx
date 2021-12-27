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

  return (
    <>
      {!wallet || wallet?.blockchain !== props.blockchain
        ? cloneElement(props.fallback, {
            ...props.fallback.props,
            onClick: handleConnect.bind(null, props.blockchain),
          })
        : props.children}
    </>
  )
}
