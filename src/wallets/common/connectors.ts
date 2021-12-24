import { InjectedConnector } from '@web3-react/injected-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import { BscConnector } from '@binance-chain/bsc-connector'

import { config } from '~/config'
import { WalletLinkConnector } from './wallet-link'
import { WavesKeeperConnector } from './waves-keeper-connector'
import { WavesExchangeConnector } from './waves-exchange-connector'
import { networksConfig } from '~/networks-config'
import { BlockchainEnum } from '~/graphql/_generated-types'

const supportedChainIds = Object.values(networksConfig)
  .filter(({ blockchain }) => blockchain === BlockchainEnum.Ethereum)
  .map(({ chainId }) => Number(chainId))

export const injected = new InjectedConnector({
  supportedChainIds,
})

export const ledger = new LedgerConnector({
  chainId: config.DEFAULT_CHAIN_ID,
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL,
})

export const trezor = new TrezorConnector({
  chainId: config.DEFAULT_CHAIN_ID,
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL,
  manifestEmail: config.TREZOR_EMAIL,
  manifestAppUrl: config.TREZOR_URL,
})

export const walletlink = new WalletLinkConnector({
  url: config.ETH_URL,
  appName: 'DeFiHelper',
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: config.ETH_URL,
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: config.POLLING_INTERVAL,
})

export const fortmatic = new FortmaticConnector({
  apiKey: config.FORTMATIC_KEY ?? '',
  chainId: config.DEFAULT_CHAIN_ID,
})

export const portis = new PortisConnector({
  dAppId: config.PORTIS_ID ?? '',
  networks: [config.DEFAULT_CHAIN_ID],
})

export const binance = new BscConnector({
  supportedChainIds,
})

export const wavesKepper = new WavesKeeperConnector({
  authData: {
    data: 'Auth on site',
  },
})

export const wavesExchange = new WavesExchangeConnector()
