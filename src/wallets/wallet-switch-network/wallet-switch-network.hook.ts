import { useRef, useEffect } from 'react'
import { useAsyncFn } from 'react-use'

import { config } from '~/config'
import { switchNetwork } from '~/wallets/common'
import { walletNetworkModel } from '~/wallets/wallet-networks'

export type WalletSwitchNetworkProps = {
  network?: string | number
}

export const useWalletSwitchNetwork = (
  fn: (...args: unknown[]) => unknown,
  network: string | number = config.DEFAULT_CHAIN_ID
) => {
  const activeWallet = walletNetworkModel.useWalletNetwork()

  const onClick = useRef(fn)
  const called = useRef(false)
  const canCall = useRef(false)

  onClick.current = fn

  const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(
    async () =>
      switchNetwork(String(network)).then(() => {
        canCall.current = true
      }),
    [network]
  )

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
