import { gql } from 'urql'

import { WALLET_EXCHANGE_FRAGMENT } from './wallet-exchange.fragment.graphql'

export const INTEGRATION_BINANCE_CONNECT = gql`
  mutation IntegrationBinanceConnect(
    $input: IntegrationBinanceConnectInputType!
  ) {
    integrationBinanceConnect(input: $input) {
      ...walletExchangeFragment
    }
  }
  ${WALLET_EXCHANGE_FRAGMENT}
`
