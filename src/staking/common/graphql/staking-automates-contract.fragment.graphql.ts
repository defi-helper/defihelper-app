import { gql } from 'urql'

export const STAKING_AUTOMATES_CONTRACT_FRAGMENT = gql`
  fragment stakingAutomatesContractFragment on AutomateContractType {
    id
    protocol {
      adapter
      name
    }
    archivedAt
    contract {
      id
      protocolId
      adapter
      layout
      blockchain
      network
      address
      deployBlockNumber
      automate {
        adapters
        autorestake
      }
      name
      description
      link
      hidden
      metric {
        tvl
        aprYear
        myStaked
        myEarned
        myAPYBoost
      }
      events
      createdAt
    }
    address
    contractWallet {
      id
      network
      address
      metric {
        stakedUSD
      }
    }
    wallet {
      id
      network
      address
      blockchain
    }
    adapter
    initParams
    verification
    rejectReason
  }
`
