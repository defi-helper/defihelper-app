import { BinanceSmartChain } from './binance-smart-chain'
import { Ethereum } from './ethereum'
import { Waves } from './waves'

export const NETWORKS = {
  bsc: new BinanceSmartChain(),
  eth: new Ethereum(),
  waves: new Waves()
}
