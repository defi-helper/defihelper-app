import { config } from 'src/config'

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

const request = async (params: Params) => {
  const provider = window.ethereum

  if (!provider) {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    )
    return false
  }

  try {
    await provider.request?.({
      method: 'wallet_addEthereumChain',
      params: [params],
    })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }
    return false
  }
}

export const setupBinance = async () => {
  const [chainId] = config.CHAIN_BINANCE_IDS

  const params = {
    chainId: `0x${chainId.toString(16)}`,
    chainName: 'Binance Smart Chain Mainnet',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'bnb',
      decimals: 18,
    },
    rpcUrls: [
      'https://bsc-dataseed.binance.org/',
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
    ],
    blockExplorerUrls: ['https://bscscan.com/'],
  }

  return request(params)
}

export const setupPolygon = async () => {
  const [chainId] = config.CHAIN_POLYGON_IDS

  const params = {
    chainId: `0x${chainId.toString(16)}`,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: [
      'https://rpc-mainnet.maticvigil.com/',
      'https://rpc-mainnet.maticvigil.com/',
    ],
    blockExplorerUrls: ['https://polygonscan.com/'],
  }

  return request(params)
}

export const setupAvalanche = async () => {
  const [chainId] = config.CHAIN_AVALANCHE_IDS

  const params = {
    chainId: `0x${chainId.toString(16)}`,
    chainName: 'Avalanch Mainnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: [
      'https://api.avax.network/ext/bc/C/rpc',
      'https://api.avax.network/ext/bc/C/rpc',
    ],
    blockExplorerUrls: ['https://cchain.explorer.avax.network/'],
  }

  return request(params)
}
