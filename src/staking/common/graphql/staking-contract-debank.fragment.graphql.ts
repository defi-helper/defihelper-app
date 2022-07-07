import { gql } from 'urql'

export const STAKING_CONTRACT_DEBANK_FRAGMENT = gql`
  fragment stakingContractDebankFragment on ContractDebankType {
    id
    address
    name
    description
    link
    hidden
    createdAt
    protocol {
      id
    }
    layout
    deprecated
    tokens {
      stake {
        alias {
          logoUrl
        }
        network
        address
        name
      }
      reward {
        alias {
          logoUrl
        }
        network
        address
        name
      }
    }
    metric(filter: { wallet: { type: [wallet] } }) {
      tvl
      myStaked
      myEarned
    }
  }
`
