import { config } from './config'
import { BlockchainEnum } from './graphql/_generated-types'

type Network = {
  title: string
  explorerUrl: string
  coin: string
  blockchain: BlockchainEnum
  icon:
    | 'ethereumRegular'
    | 'bnbRegular'
    | 'wavesRegular'
    | 'avalanche'
    | 'solana'
    | 'polygon'
}

const prodNetworks: Record<string, Network> = {
  1: {
    title: 'Ethereum',
    explorerUrl: 'https://etherscan.io',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  1666600000: {
    title: 'Harmony',
    explorerUrl: 'https://explorer.harmony.one',
    coin: 'ONE',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  56: {
    title: 'Binance Smart Chain',
    explorerUrl: 'https://bscscan.com',
    coin: 'BNB',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'bnbRegular',
  },
  137: {
    title: 'Polygon',
    explorerUrl: 'https://polygonscan.com',
    coin: 'MATIC',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'polygon',
  },
  43114: {
    title: 'Avalanche',
    explorerUrl: 'https://snowtrace.io',
    coin: 'AVAX',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'avalanche',
  },
  W: {
    title: 'Waves',
    explorerUrl: 'https://wavesexplorer.com',
    coin: 'WAVES',
    blockchain: BlockchainEnum.Waves,
    icon: 'wavesRegular',
  },
}

const devNetworks: Record<string, Network> = {
  3: {
    title: 'Ropsten',
    explorerUrl: 'https://ropsten.etherscan.io',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  42: {
    title: 'Kovan',
    explorerUrl: 'https://kovan.etherscan.io',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  4: {
    title: 'Rinkeby',
    explorerUrl: 'https://rinkeby.etherscan.io',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  5: {
    title: 'Goerli',
    explorerUrl: 'https://goerli.etherscan.io',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  97: {
    title: 'Binance Smart Chain Testnet',
    explorerUrl: 'https://testnet.bscscan.com',
    coin: 'BNB',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'bnbRegular',
  },
  43113: {
    title: 'Avalanche (testnet)',
    explorerUrl: 'https://testnet.snowtrace.io',
    coin: 'AVAX',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'avalanche',
  },
}

export const networksConfig: Record<string, Network> = {
  ...prodNetworks,
  ...(config.IS_DEV ? devNetworks : {}),
}
