import { gql } from '@urql/core'

export const PROTOCOL_CONTRACT_FRAGMENT = gql`
  fragment protocolContractFragment on ContractType {
    id
    blockchain
    network
    address
    name
    description
    link
    hidden
    createdAt
  }
`
