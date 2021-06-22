import type { AbstractConnector } from '@web3-react/abstract-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { LedgerConnector } from '@web3-react/ledger-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { FortmaticConnector } from '@web3-react/fortmatic-connector'
import { PortisConnector } from '@web3-react/portis-connector'
import { TrezorConnector } from '@web3-react/trezor-connector'
import React from 'react'
import { BscConnector } from '@binance-chain/bsc-connector'

import { ReactComponent as MetaMaskIcon } from '~/assets/icons/wallets/metamask.svg'
import { ReactComponent as LedgerIcon } from '~/assets/icons/wallets/ledger.svg'
import { ReactComponent as CoinBaseIcon } from '~/assets/icons/wallets/coinbase-wallet.svg'
import { ReactComponent as WalletConnectIcon } from '~/assets/icons/wallets/wallet-connect.svg'
import { ReactComponent as FortmaticIcon } from '~/assets/icons/wallets/fortmatic-wallet.svg'
import { ReactComponent as PortisIcon } from '~/assets/icons/wallets/portis-wallet.svg'
import { ReactComponent as TrustIcon } from '~/assets/icons/wallets/trustwallet.svg'
import { ReactComponent as TrezorIcon } from '~/assets/icons/wallets/trezor-wallet.svg'
import { ReactComponent as BinanceIcon } from '~/assets/icons/wallets/binance-wallet.svg'
import { config } from '~/config'
import { WalletLinkConnector } from './wallet-link'

export const injected = new InjectedConnector({
  supportedChainIds: [...config.CHAIN_IDS, ...config.CHAIN_BINANCE_IDS]
})

export const ledger = new LedgerConnector({
  chainId: config.CHAIN_IDS[0],
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL
})

export const trezor = new TrezorConnector({
  chainId: config.CHAIN_IDS[0],
  url: config.ETH_URL,
  pollingInterval: config.POLLING_INTERVAL,
  manifestEmail: config.TREZOR_EMAIL,
  manifestAppUrl: config.TREZOR_URL
})

export const walletlink = new WalletLinkConnector({
  url: config.ETH_URL,
  appName: 'Bondappetit'
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    1: config.ETH_URL
  },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: config.POLLING_INTERVAL
})

export const fortmatic = new FortmaticConnector({
  apiKey: config.FORTMATIC_KEY ?? '',
  chainId: config.CHAIN_IDS[0]
})

export const portis = new PortisConnector({
  dAppId: config.PORTIS_ID ?? '',
  networks: [config.CHAIN_IDS[0]]
})

export const binance = new BscConnector({
  supportedChainIds: [...config.CHAIN_IDS, ...config.CHAIN_BINANCE_IDS]
})

enum ConnectorNames {
  MetaMask = 'MetaMask',
  TrustWallet = 'TrustWallet',
  Ledger = 'Ledger',
  CoinBase = 'Coinbase',
  WalletConnect = 'WalletConnect',
  Fortmatic = 'Fortmatic',
  Portis = 'Portis',
  Trezor = 'Trezor',
  Binance = 'Binance'
}

export const connectorsByName: Record<
  ConnectorNames,
  { connector: AbstractConnector; logo: React.FC }
> = {
  [ConnectorNames.MetaMask]: {
    connector: injected,
    logo: MetaMaskIcon
  },
  [ConnectorNames.TrustWallet]: {
    connector: injected,
    logo: TrustIcon
  },
  [ConnectorNames.Ledger]: {
    connector: ledger,
    logo: LedgerIcon
  },
  [ConnectorNames.Trezor]: {
    connector: trezor,
    logo: TrezorIcon
  },
  [ConnectorNames.CoinBase]: {
    connector: walletlink,
    logo: CoinBaseIcon
  },
  [ConnectorNames.WalletConnect]: {
    connector: walletconnect,
    logo: WalletConnectIcon
  },
  [ConnectorNames.Binance]: {
    connector: binance,
    logo: BinanceIcon
  },
  [ConnectorNames.Fortmatic]: {
    connector: fortmatic,
    logo: FortmaticIcon
  },
  [ConnectorNames.Portis]: {
    connector: portis,
    logo: PortisIcon
  }
}
