import { gql } from 'urql'

export const STAKING_CONTRACT_DELETE = gql`
  mutation StakingContractDelete($id: UuidType!) {
    contractDelete(id: $id)
  }
`
