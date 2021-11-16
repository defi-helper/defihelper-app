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

export enum ConnectorNames {
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

export const connectorsByName = {
  [ConnectorNames.MetaMask]: {
    connector: connectors.injected,
    blockchain: 'ethereum',
    logo: MetaMaskIcon,
  },
  [ConnectorNames.TrustWallet]: {
    connector: connectors.injected,
    blockchain: 'ethereum',
    logo: TrustIcon,
  },
  [ConnectorNames.Ledger]: {
    connector: connectors.ledger,
    blockchain: 'ethereum',
    logo: LedgerIcon,
  },
  [ConnectorNames.Trezor]: {
    connector: connectors.trezor,
    blockchain: 'ethereum',
    logo: TrezorIcon,
  },
  [ConnectorNames.CoinBase]: {
    connector: connectors.walletlink,
    blockchain: 'ethereum',
    logo: CoinBaseIcon,
  },
  [ConnectorNames.WalletConnect]: {
    connector: connectors.walletconnect,
    blockchain: 'ethereum',
    logo: WalletConnectIcon,
  },
  [ConnectorNames.Binance]: {
    connector: connectors.binance,
    blockchain: 'ethereum',
    logo: BinanceIcon,
  },
  [ConnectorNames.Fortmatic]: {
    connector: connectors.fortmatic,
    blockchain: 'ethereum',
    logo: FortmaticIcon,
  },
  [ConnectorNames.Portis]: {
    connector: connectors.portis,
    blockchain: 'ethereum',
    logo: PortisIcon,
  },
  [ConnectorNames.WavesKeeper]: {
    connector: connectors.wavesKepper,
    blockchain: 'waves',
    logo: WavesKeeperIcon,
  },
  [ConnectorNames.WavesExchange]: {
    connector: connectors.wavesExchange,
    blockchain: 'waves',
    logo: WavesExchangeIcon,
  },
} as const

export const SIGN_MESSAGE =
  'By clicking "SIGN" you acknowledge and agree that you understand all ' +
  'the applicable risks, in particular, the risks related to development ' +
  'failures, bugs and other technical disadvantages which may result in ' +
  'the theft, loss or devaluation of your funds. You also acknowledge ' +
  'agree that you are not a citizen or entity of; (ii) formed in; (iii) ' +
  'do not reside in; (iv) located in; (v) do not have a place of business ' +
  'in; and (vi) conducting business in the USA, any jurisdictions which ' +
  'have restrictions/prohibitions on the use of virtual currencies or ' +
  'any other state, country or region that is subject to sanctions ' +
  'enforced by the US, the UK or the EU. If you do not agree with any ' +
  'statement given above, then you must refrain from any further actions.'
