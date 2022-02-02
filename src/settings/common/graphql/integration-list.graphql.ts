import { gql } from 'urql'

import { WALLET_EXCHANGE_FRAGMENT } from './wallet-exchange.fragment.graphql'

export const WALLET_EXCHANGE_LIST = gql`
  query IntegrationList {
    me {
      exchanges(pagination: { limit: 10 }) {
        list {
          ...walletExchangeFragment
        }
      }
    }
  }

  ${WALLET_EXCHANGE_FRAGMENT}
`
