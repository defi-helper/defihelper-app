import { gql } from '@urql/core'

export const STAKING_CONNECTED_CONTRACTS = gql`
  query StakingConnectedContracts($filter: WalletContractListFilterInputType) {
    me {
      wallets {
        list {
          contracts(filter: $filter) {
            list {
              id
              address
            }
          }
        }
      }
    }
  }
`
