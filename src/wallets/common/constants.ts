import type { AbstractConnector } from '@web3-react/abstract-connector'

import { ReactComponent as MetaMaskIcon } from '~/assets/icons/wallets/metamask.svg'
import { ReactComponent as CoinBaseIcon } from '~/assets/icons/wallets/coinbase-wallet.svg'
import { ReactComponent as FortmaticIcon } from '~/assets/icons/wallets/fortmatic-wallet.svg'
import { ReactComponent as TrustIcon } from '~/assets/icons/wallets/trustwallet.svg'
import * as connectors from './connectors'
import { config } from '~/config'
import { ReactComponent as WavesKeeperIcon } from '~/assets/icons/wallets/waves-keeper-wallet.svg'
import { ReactComponent as WavesExchangeIcon } from '~/assets/icons/wallets/waves-exchange-wallet.svg'
import { networksConfig } from '~/networks-config'
import { BlockchainEnum } from '~/api/_generated-types'
// import { ReactComponent as LedgerIcon } from '~/assets/icons/wallets/ledger.svg'
import { ReactComponent as WalletConnectIcon } from '~/assets/icons/wallets/wallet-connect.svg'
// import { ReactComponent as PortisIcon } from '~/assets/icons/wallets/portis-wallet.svg'
// import { ReactComponent as TrezorIcon } from '~/assets/icons/wallets/trezor-wallet.svg'
// import { ReactComponent as BinanceIcon } from '~/assets/icons/wallets/binance-wallet.svg'

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

const ethereumNetworks = connectors.supportedChainIds.map(String)
const wavesNetworks = Object.values(networksConfig)
  .filter(({ blockchain }) => blockchain === BlockchainEnum.Waves)
  .map(({ chainId }) => String(chainId))

const IS_IOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent)
const IS_ANDROID = /Android/i.test(navigator.userAgent)

const METAMASK_LINK =
  'https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn'
const TRUST_MOBILE = 'https://trustwallet.com/'
const METAMASK_MOBILE = 'https://metamask.io/'
// const BINANCE_LINK =
//   'https://chrome.google.com/webstore/detail/binance-wallet/fhbohimaelbohpjbbldcngcnapndodjp'
const WAVES_KEEPER_LINK =
  'https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo'

const IS_MOBILE = IS_IOS || IS_ANDROID

type ConnectorByName = {
  connector: AbstractConnector
  blockchain: string
  logo: React.FC<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined
    }
  >
  networks: string[]
  available: () => boolean
  extensionLink?: string
}

export const connectorsByName: Record<string, ConnectorByName> = {
  [ConnectorNames.MetaMask]: {
    connector: connectors.injected,
    blockchain: 'ethereum',
    logo: MetaMaskIcon,
    networks: ethereumNetworks,
    available: () => Boolean(window.ethereum),
    extensionLink: IS_MOBILE ? METAMASK_MOBILE : METAMASK_LINK,
  },
  [ConnectorNames.TrustWallet]: {
    connector: connectors.injected,
    blockchain: 'ethereum',
    logo: TrustIcon,
    networks: ethereumNetworks,
    available: () => Boolean(window.ethereum),
    extensionLink: IS_MOBILE ? TRUST_MOBILE : METAMASK_LINK,
  },
  [ConnectorNames.CoinBase]: {
    connector: connectors.walletlink,
    blockchain: 'ethereum',
    logo: CoinBaseIcon,
    networks: [String(config.DEFAULT_CHAIN_ID)],
    available: () => true,
  },
  [ConnectorNames.Fortmatic]: {
    connector: connectors.fortmatic,
    blockchain: 'ethereum',
    logo: FortmaticIcon,
    networks: [String(config.DEFAULT_CHAIN_ID)],
    available: () => true,
  },
  [ConnectorNames.WavesKeeper]: {
    connector: connectors.wavesKepper,
    blockchain: 'waves',
    logo: WavesKeeperIcon,
    networks: wavesNetworks,
    available: () => Boolean(window.WavesKeeper),
    extensionLink: WAVES_KEEPER_LINK,
  },
  [ConnectorNames.WavesExchange]: {
    connector: connectors.wavesExchange,
    blockchain: 'waves',
    logo: WavesExchangeIcon,
    networks: wavesNetworks,
    available: () => true,
  },
  [ConnectorNames.WalletConnect]: {
    connector: connectors.walletconnect,
    blockchain: 'ethereum',
    logo: WalletConnectIcon,
    networks: [String(config.DEFAULT_CHAIN_ID)],
    available: () => true,
  },
  // [ConnectorNames.Portis]: {
  //   connector: connectors.portis,
  //   blockchain: 'ethereum',
  //   logo: PortisIcon,
  //   networks: [String(config.DEFAULT_CHAIN_ID)],
  //   available: () => true,
  // },
  // [ConnectorNames.Ledger]: {
  //   connector: connectors.ledger,
  //   blockchain: 'ethereum',
  //   logo: LedgerIcon,
  //   networks: [String(config.DEFAULT_CHAIN_ID)],
  //   available: true,
  // },
  // [ConnectorNames.Trezor]: {
  //   connector: connectors.trezor,
  //   blockchain: 'ethereum',
  //   logo: TrezorIcon,
  //   networks: [String(config.DEFAULT_CHAIN_ID)],
  //   available: true,
  // },
  // [ConnectorNames.Binance]: {
  //   connector: connectors.binance,
  //   blockchain: 'ethereum',
  //   logo: BinanceIcon,
  //   networks: ethereumNetworks,
  //   available: Boolean(window.BinanceChain),
  //   extensionLink: BINANCE_LINK,
  // },
}

export const SIGN_MESSAGE =
  "By clicking 'SIGN' you acknowledge and agree that you understand all " +
  'the applicable risks, in particular, the risks related to development ' +
  'failures, bugs and other technical disadvantages which may result in ' +
  'the theft, loss or devaluation of your funds. You also acknowledge ' +
  'agree that you are not a citizen or entity of; (ii) formed in; (iii) ' +
  'do not reside in; (iv) located in; (v) do not have a place of business ' +
  'in; and (vi) conducting business in the USA, any jurisdictions which ' +
  'have restrictions/prohibitions on the use of virtual currencies. If you ' +
  'do not agree with any statement given above, then you must refrain from ' +
  'any further actions.'
