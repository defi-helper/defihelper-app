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
    protocolId
    layout
    automate {
      adapters
      autorestake
    }
    metric(filter: { wallet: { type: [wallet] } }) {
      tvl
      aprYear
      myStaked
      myEarned
      myAPYBoost
    }
  }
`
