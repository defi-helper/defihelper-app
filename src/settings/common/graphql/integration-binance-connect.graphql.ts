import { gql } from 'urql'

import { WALLET_EXCHANGE_FRAGMENT } from './wallet-exchange.fragment.graphql'

export const INTEGRATION_API_CONNECT = gql`
  mutation integrationExchangeApiConnect(
    $input: IntegrationExchangeApiConnectInputType!
  ) {
    integrationExchangeApiConnect(input: $input) {
      ...walletExchangeFragment
    }
  }
  ${WALLET_EXCHANGE_FRAGMENT}
`
