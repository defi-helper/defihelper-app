import { gql } from 'urql'

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
