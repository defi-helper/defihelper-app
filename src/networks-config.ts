import { BlockchainEnum } from './graphql/_generated-types'

type Network = {
  title: string
  explorerUrl: string
  coin: string
  blockchain: BlockchainEnum
  icon: 'ethereumRegular' | 'bnbRegular' | 'wavesRegular'
}

export const networksConfig: Record<string, Network> = {
  1: {
    title: 'Ethereum',
    explorerUrl: 'https://etherscan.io/address',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  3: {
    title: 'Ropsten',
    explorerUrl: 'https://ropsten.etherscan.io/address',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  1666600000: {
    title: 'Harmony',
    explorerUrl: 'https://explorer.harmony.one/address',
    coin: 'ONE',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  42: {
    title: 'Kovan',
    explorerUrl: 'https://kovan.etherscan.io/address',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  4: {
    title: 'Rinkeby',
    explorerUrl: 'https://rinkeby.etherscan.io/address',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  5: {
    title: 'Goerli',
    explorerUrl: 'https://goerli.etherscan.io/address',
    coin: 'ETH',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  56: {
    title: 'Binance Smart Chain',
    explorerUrl: 'https://bscscan.com/address',
    coin: 'BNB',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'bnbRegular',
  },
  97: {
    title: 'Binance Smart Chain Testnet',
    explorerUrl: 'https://testnet.bscscan.com/address',
    coin: 'BNB',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'bnbRegular',
  },
  137: {
    title: 'Polygon',
    explorerUrl: 'https://polygonscan.com/address',
    coin: 'MATIC',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  43114: {
    title: 'Avalanche',
    explorerUrl: 'https://explorer.avax.network/address',
    coin: 'AVAX',
    blockchain: BlockchainEnum.Ethereum,
    icon: 'ethereumRegular',
  },
  waves: {
    title: 'Waves',
    explorerUrl: 'https://wavesexplorer.com/address',
    coin: 'WAVES',
    blockchain: BlockchainEnum.Waves,
    icon: 'wavesRegular',
  },
  main: {
    title: 'Waves',
    explorerUrl: 'https://wavesexplorer.com/address',
    coin: 'WAVES',
    blockchain: BlockchainEnum.Waves,
    icon: 'wavesRegular',
  },
  W: {
    title: 'Waves',
    explorerUrl: 'https://wavesexplorer.com/address',
    coin: 'WAVES',
    blockchain: BlockchainEnum.Waves,
    icon: 'wavesRegular',
  },
}
