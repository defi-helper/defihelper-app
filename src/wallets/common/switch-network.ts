import { BlockchainEnum } from '~/api/_generated-types'
import { networksConfig } from '~/networks-config'

type Params = {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

const isProviderError = (
  error: unknown
): error is { code: number; message: string } => {
  if (typeof error !== 'object' || error === null) return false

  return 'code' in error
}

export const request = async (params: Params) => {
  const provider = window.ethereum

  if (!provider) {
    return Promise.reject(
      new Error("Can't setup the network because window.ethereum is undefined")
    )
  }

  try {
    await provider.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: params.chainId }],
    })
  } catch (switchError) {
    if (!isProviderError(switchError)) return Promise.reject(switchError)

    if (switchError.code === 4902) {
      try {
        await provider.request?.({
          method: 'wallet_addEthereumChain',
          params: [params],
        })
      } catch (addError) {
        if (!isProviderError(addError)) return Promise.reject(addError)

        return Promise.reject(new Error(addError.message))
      }
    }

    return Promise.reject(new Error(switchError.message))
  }
}

export const switchNetwork = (network: string) => {
  const currentNetwork = networksConfig[network]

  if (!currentNetwork) return Promise.reject(new Error('Unknown network'))

  if (currentNetwork.blockchain === BlockchainEnum.Waves)
    return Promise.reject(new Error('Waves are not supported yet'))

  return request({
    chainId: `0x${currentNetwork.chainId.toString(16)}`,
    chainName: currentNetwork.title,
    nativeCurrency: {
      name: currentNetwork.coin,
      symbol: currentNetwork.coin,
      decimals: currentNetwork.decimals ?? 18,
    },
    rpcUrls: currentNetwork.rpcUrls ?? [],
    blockExplorerUrls: currentNetwork.explorerUrl
      ? [currentNetwork.explorerUrl]
      : [],
  })
}
