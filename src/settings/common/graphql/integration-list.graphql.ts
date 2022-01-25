import { gql } from 'urql'

import { WALLET_EXCHANGE_FRAGMENT } from './wallet-exchange.fragment.graphql'

export const WALLET_EXCHANGE_LIST = gql`
  query IntegrationList {
    me {
      exchanges {
        ...walletExchangeFragment
      }
    }
  }

  ${WALLET_EXCHANGE_FRAGMENT}
`
