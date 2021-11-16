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

export const injected = new InjectedConnector({
  supportedChainIds: [
    ...config.CHAIN_ETHEREUM_IDS,
    ...config.CHAIN_BINANCE_IDS,
    ...config.CHAIN_POLYGON_IDS,
    ...config.CHAIN_AVALANCHE_IDS,
  ],
})

export const ledger = new LedgerConnector({
  chainId: config.CHAIN_ETHEREUM_IDS[0],
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL,
})

export const trezor = new TrezorConnector({
  chainId: config.CHAIN_ETHEREUM_IDS[0],
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL,
  manifestEmail: config.TREZOR_EMAIL,
  manifestAppUrl: config.TREZOR_URL,
})

export const walletlink = new WalletLinkConnector({
  url: config.ETH_URL,
  appName: 'Bondappetit',
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
  chainId: config.CHAIN_ETHEREUM_IDS[0],
})

export const portis = new PortisConnector({
  dAppId: config.PORTIS_ID ?? '',
  networks: [config.CHAIN_ETHEREUM_IDS[0]],
})

export const binance = new BscConnector({
  supportedChainIds: [
    ...config.CHAIN_ETHEREUM_IDS,
    ...config.CHAIN_BINANCE_IDS,
    ...config.CHAIN_POLYGON_IDS,
    ...config.CHAIN_AVALANCHE_IDS,
  ],
})

export const wavesKepper = new WavesKeeperConnector({
  authData: {
    data: 'Auth on site',
  },
})

export const wavesExchange = new WavesExchangeConnector()
