import type { AbstractConnector } from '@web3-react/abstract-connector'

import { ReactComponent as MetaMaskIcon } from '~/assets/icons/wallets/metamask.svg'
import { ReactComponent as LedgerIcon } from '~/assets/icons/wallets/ledger.svg'
import { ReactComponent as CoinBaseIcon } from '~/assets/icons/wallets/coinbase-wallet.svg'
import { ReactComponent as WalletConnectIcon } from '~/assets/icons/wallets/wallet-connect.svg'
import { ReactComponent as FortmaticIcon } from '~/assets/icons/wallets/fortmatic-wallet.svg'
import { ReactComponent as PortisIcon } from '~/assets/icons/wallets/portis-wallet.svg'
import { ReactComponent as TrustIcon } from '~/assets/icons/wallets/trustwallet.svg'
import { ReactComponent as TrezorIcon } from '~/assets/icons/wallets/trezor-wallet.svg'
import { ReactComponent as BinanceIcon } from '~/assets/icons/wallets/binance-wallet.svg'
import { ReactComponent as WavesKeeperIcon } from '~/assets/icons/wallets/waves-keeper-wallet.svg'
import { ReactComponent as WavesExchangeIcon } from '~/assets/icons/wallets/waves-exchange-wallet.svg'
import * as connectors from './connectors'
import { config } from '~/config'
import { BlockchainEnum } from '~/graphql/_generated-types'

enum ConnectorNames {
  MetaMask = 'MetaMask',
  TrustWallet = 'TrustWallet',
  Ledger = 'Ledger',
  CoinBase = 'Coinbase',
  WalletConnect = 'WalletConnect',
  Fortmatic = 'Fortmatic',
  Portis = 'Portis',
  Trezor = 'Trezor',
  Binance = 'Binance',
  WavesKeeper = 'WavesKeeper',
  WavesExchange = 'WavesExchange',
}

export const connectorsByName: Record<
  ConnectorNames,
  { connector: AbstractConnector; logo: typeof MetaMaskIcon }
> = {
  [ConnectorNames.MetaMask]: {
    connector: connectors.injected,
    logo: MetaMaskIcon,
  },
  [ConnectorNames.TrustWallet]: {
    connector: connectors.injected,
    logo: TrustIcon,
  },
  [ConnectorNames.Ledger]: {
    connector: connectors.ledger,
    logo: LedgerIcon,
  },
  [ConnectorNames.Trezor]: {
    connector: connectors.trezor,
    logo: TrezorIcon,
  },
  [ConnectorNames.CoinBase]: {
    connector: connectors.walletlink,
    logo: CoinBaseIcon,
  },
  [ConnectorNames.WalletConnect]: {
    connector: connectors.walletconnect,
    logo: WalletConnectIcon,
  },
  [ConnectorNames.Binance]: {
    connector: connectors.binance,
    logo: BinanceIcon,
  },
  [ConnectorNames.Fortmatic]: {
    connector: connectors.fortmatic,
    logo: FortmaticIcon,
  },
  [ConnectorNames.Portis]: {
    connector: connectors.portis,
    logo: PortisIcon,
  },
  [ConnectorNames.WavesKeeper]: {
    connector: connectors.wavesKepper,
    logo: WavesKeeperIcon,
  },
  [ConnectorNames.WavesExchange]: {
    connector: connectors.wavesExchange,
    logo: WavesExchangeIcon,
  },
}

export type Network = {
  title: string
  blockchain?: BlockchainEnum
  network?: number | string
  onClick?: 'activateEthereum' | 'activateBinance' | 'activateWaves'
  type: 'Networks' | 'AllNetworks'
}

export const NETWORKS: Network[] = [
  {
    title: 'All',
    type: 'AllNetworks' as const,
  },
  {
    title: 'Ethereum',
    blockchain: BlockchainEnum.Ethereum,
    network: config.CHAIN_ETHEREUM_IDS[0],
    onClick: 'activateEthereum' as const,
    type: 'Networks' as const,
  },
  {
    title: 'Ropsten',
    blockchain: BlockchainEnum.Ethereum,
    network: config.CHAIN_ETHEREUM_IDS[1],
    onClick: 'activateEthereum' as const,
    type: 'Networks' as const,
  },
  {
    title: 'Binance Smart Chain',
    blockchain: BlockchainEnum.Ethereum,
    network: config.CHAIN_BINANCE_IDS[0],
    onClick: 'activateBinance' as const,
    type: 'Networks' as const,
  },
  {
    title: 'Waves',
    blockchain: BlockchainEnum.Waves,
    network: config.CHAIN_WAVES_ID[0],
    onClick: 'activateWaves' as const,
    type: 'Networks' as const,
  },
]

export const SIGN_MESSAGE = 'hello!'
