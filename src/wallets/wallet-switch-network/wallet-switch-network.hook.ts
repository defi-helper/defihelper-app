import { useRef, useEffect } from 'react'
import { useAsyncFn, useMedia } from 'react-use'

import { config } from '~/config'
import { toastsService } from '~/toasts'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type WalletSwitchNetworkProps = {
  network?: string | number
}

export const useWalletSwitchNetwork = (
  fn: (...args: unknown[]) => unknown,
  network: string | number = config.DEFAULT_CHAIN_ID
) => {
  const isMobile = !useMedia('(hover: hover)')
  const activeWallet = walletNetworkModel.useWalletNetwork()

  const onClick = useRef(fn)
  const called = useRef(false)
  const canCall = useRef(false)

  onClick.current = fn

  const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(async () => {
    if (isMobile)
      return toastsService.error(
        'Switching networks on mobile device is not supported. Please change your network manually.'
      )

    return switchNetwork(String(network)).then(() => {
      canCall.current = true
    })
  }, [network, isMobile])

  const correctNetwork = activeWallet?.chainId === network

  useEffect(() => {
    if (
      switchNetworkState.loading ||
      called.current ||
      !canCall.current ||
      !correctNetwork ||
      !onClick.current
    )
      return

    onClick.current?.()
    called.current = true
  }, [switchNetworkState.loading, correctNetwork])

  return [switchNetworkState, handleSwitchNetwork] as const
}
