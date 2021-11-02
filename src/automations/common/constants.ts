import { AutomationNetwork } from './automation.types'

export enum Networks {
  ethereum = '1',
  ropsten = '3',
  binance = '56',
  binanceTest = '97',
  harmony = '1666600000',
  kovan = '42',
  rinkeby = '4',
  goerli = '5',
  polygon = '137',
  avalanche = '43114',
  waves = 'W',
}

export const NETWORKS: Record<string, AutomationNetwork> = {
  [Networks.ethereum]: {
    title: 'Ethereum',
    icon: 'ethereumRegular',
  },
  [Networks.ropsten]: {
    title: 'Ropsten',
    icon: 'ethereumRegular',
  },
  [Networks.goerli]: {
    title: 'Goerli',
    icon: 'ethereumRegular',
  },
  [Networks.kovan]: {
    title: 'Kovan',
    icon: 'ethereumRegular',
  },
  [Networks.binance]: {
    title: 'Binance',
    icon: 'bnbRegular',
  },
  [Networks.waves]: {
    title: 'Waves',
    icon: 'wavesRegular',
  },
}
