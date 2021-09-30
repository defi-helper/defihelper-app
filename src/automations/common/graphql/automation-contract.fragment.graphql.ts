import { gql } from '@urql/core'

export const AUTOMATION_CONTRACT_FRAGMENT = gql`
  fragment automationContractFragment on AutomateContractType {
    id
    wallet {
      id
      blockchain
      network
      address
      publicKey
      createdAt
    }
    protocol {
      id
      adapter
      name
      description
      icon
      link
      hidden
      createdAt
    }
    address
    adapter
    initParams
    verification
    rejectReason
  }
`
