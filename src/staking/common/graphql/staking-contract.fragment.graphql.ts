import { gql } from '@urql/core'

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
    protocolId
    layout
    automate {
      adapters
      autorestake
    }
    metric {
      tvl
      aprYear
      myStaked
      myEarned
    }
  }
`
