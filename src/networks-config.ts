import { BlockchainEnum } from './api/_generated-types'
import { networks } from './networks'

type Networks = typeof networks

type Icon = Networks[keyof Networks]['icon']

type Network = {
  title: string
  explorerUrl: string
  coin: string
  decimals?: number
  blockchain: BlockchainEnum
  rpcUrls?: string[]
  chainId: number | string
  icon: Icon
  testnet: boolean
}

export const networksConfig = networks as unknown as Record<string, Network>
