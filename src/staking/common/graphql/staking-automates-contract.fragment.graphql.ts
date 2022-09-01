import { gql } from 'urql'

export const STAKING_AUTOMATES_CONTRACT_FRAGMENT = gql`
  fragment stakingAutomatesContractFragment on AutomateContractType {
    id
    protocol {
      id
      adapter
      name
    }
    archivedAt
    contract {
      id
      protocol {
        id
        adapter
      }
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
      tokens {
        stake {
          alias {
            logoUrl
          }
          network
          address
          name
        }
      }
    }
    address
    contractWallet {
      id
      network
      address
      metric {
        stakedUSD
      }
      billing {
        balance {
          lowFeeFunds
        }
      }
    }
    wallet {
      id
      network
      address
      blockchain
      billing {
        balance {
          netBalanceUSD
        }
      }
    }
    adapter
    initParams
    verification
    rejectReason
    restakeAt
  }
`
