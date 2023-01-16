import { isValidElement, cloneElement, useRef, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

import { config } from '~/config'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type WalletSwitchNetworkProps = {
  network?: string | number
}

export const WalletSwitchNetwork: React.FC<WalletSwitchNetworkProps> = (
  props
) => {
  const { network = config.DEFAULT_CHAIN_ID, children, ...restOfProps } = props
  const activeWallet = walletNetworkModel.useWalletNetwork()

  if (!isValidElement(children)) throw new Error('children is not valid')

  const onClickRef = useRef(children.props.onClick ?? (() => {}))

  useEffect(() => {
    onClickRef.current = children.props.onClick
  })

  const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(
    async () => switchNetwork(String(network)).then(onClickRef.current),
    [network]
  )

  const correctNetwork =
    activeWallet?.chainId && activeWallet.chainId === network

  return cloneElement(children, {
    ...restOfProps,
    ...children.props,
    onClick:
      correctNetwork && onClickRef.current
        ? onClickRef.current
        : handleSwitchNetwork,
    loading:
      'loading' in children.props
        ? switchNetworkState.loading
        : children.props.loading,
    type: correctNetwork ? children.props.type : 'button',
  })
}
