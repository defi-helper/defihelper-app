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
import * as connectors from './connectors'

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
  { connector: AbstractConnector; logo: typeof MetaMaskIcon }
> = {
  [ConnectorNames.MetaMask]: {
    connector: connectors.injected,
    logo: MetaMaskIcon
  },
  [ConnectorNames.TrustWallet]: {
    connector: connectors.injected,
    logo: TrustIcon
  },
  [ConnectorNames.Ledger]: {
    connector: connectors.ledger,
    logo: LedgerIcon
  },
  [ConnectorNames.Trezor]: {
    connector: connectors.trezor,
    logo: TrezorIcon
  },
  [ConnectorNames.CoinBase]: {
    connector: connectors.walletlink,
    logo: CoinBaseIcon
  },
  [ConnectorNames.WalletConnect]: {
    connector: connectors.walletconnect,
    logo: WalletConnectIcon
  },
  [ConnectorNames.Binance]: {
    connector: connectors.binance,
    logo: BinanceIcon
  },
  [ConnectorNames.Fortmatic]: {
    connector: connectors.fortmatic,
    logo: FortmaticIcon
  },
  [ConnectorNames.Portis]: {
    connector: connectors.portis,
    logo: PortisIcon
  }
}
