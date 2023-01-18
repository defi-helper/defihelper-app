import { isValidElement, cloneElement } from 'react'

import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletSwitchNetwork } from './wallet-switch-network.hook'

export type WalletSwitchNetworkProps = {
  network?: string | number
}

export const WalletSwitchNetwork: React.FC<WalletSwitchNetworkProps> = (
  props
) => {
  const { network, children, ...restOfProps } = props
  const activeWallet = walletNetworkModel.useWalletNetwork()

  if (!isValidElement(children)) throw new Error('children is not valid')

  const [switchNetworkState, handleSwitchNetwork] = useWalletSwitchNetwork(
    children.props.onClick,
    network
  )

  const correctNetwork = Boolean(
    activeWallet?.chainId && activeWallet.chainId === network
  )

  return cloneElement(children, {
    ...restOfProps,
    ...children.props,
    onClick: correctNetwork ? children.props.onClick : handleSwitchNetwork,
    loading:
      'loading' in children.props
        ? switchNetworkState.loading
        : children.props.loading,
    type: correctNetwork ? children.props.type : 'button',
  })
}
