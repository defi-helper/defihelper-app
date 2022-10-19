import { gql } from 'urql'

export const STAKING_AUTOMATES_CONTRACT_FRAGMENT = gql`
  fragment stakingAutomatesContractFragment on AutomateContractType {
    id
    protocol {
      id
      adapter
      name
      icon
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
          symbol
        }
        reward {
          alias {
            logoUrl
          }
          network
          address
          name
          symbol
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
      automates {
        id
        metric {
          worth
        }
      }
    }
    adapter
    initParams
    verification
    rejectReason
    restakeAt
    stopLoss {
      status
      tx
      amountOut
      outToken {
        id
        blockchain
        network
        address
        name
        symbol
        decimals
      }
      inToken {
        id
        blockchain
        network
        address
        name
        symbol
        decimals
      }
      params {
        path
        amountOut
        amountOutMin
        slippage
      }
    }
  }
`
