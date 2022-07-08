import { useCallback } from 'react'

import { walletNetworkModel } from '~/wallets/wallet-networks'
import { useWalletList } from '~/wallets/wallet-list'

export const useWalletConnect = () => {
  const [openWalletList] = useWalletList()

  return useCallback(
    async (params: { blockchain?: string; network?: string }) => {
      try {
        const wallet = await openWalletList({
          blockchain: params.blockchain,
          network: params.network,
        })

        if (!wallet.account) return

        walletNetworkModel.signMessage({
          connector: wallet.connector,
          chainId: wallet.chainId,
          provider: wallet.provider,
          blockchain: wallet.blockchain,
          account: wallet.account,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}

export const useWalletSign = () => {
  const [openWalletList] = useWalletList()

  return useCallback(
    async (params: { blockchain?: string; network?: string }) => {
      try {
        const wallet = await openWalletList({
          blockchain: params.blockchain,
          network: params.network,
        })

        if (!wallet.account) return

        walletNetworkModel.signMessage({
          connector: wallet.connector,
          chainId: wallet.chainId,
          provider: wallet.provider,
          blockchain: wallet.blockchain,
          account: wallet.account,
        })
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
