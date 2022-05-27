import { gql } from 'urql'

export const STAKING_CONTRACT_FRAGMENT = gql`
  fragment stakingContractFragment on ContractType {
    id
    blockchain
    network
    address
    name
    description
    link
    hidden
    createdAt
    adapter
    protocol {
      id
    }
    layout
    deployBlockNumber
    deprecated
    tokens {
      stake {
        alias {
          logoUrl
          name
        }
      }
    }
    automate {
      adapters
      autorestake
      buyLiquidity {
        router
        pair
      }
    }
    metric(filter: { wallet: { type: [wallet] } }) {
      tvl
      aprDay
      aprWeek
      aprMonth
      aprYear
      aprWeekReal
      myStaked
      myEarned
      myAPYBoost
    }
  }
`
