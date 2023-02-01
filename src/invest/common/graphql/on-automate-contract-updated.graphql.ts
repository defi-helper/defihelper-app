import { gql } from 'urql'

export const ON_AUTOMATE_CONTRACT_UPDATED = gql`
  subscription OnAutomateContractUpdated($user: UuidType!) {
    onAutomateContractUpdated(filter: { user: $user }) {
      id
      metric {
        invest
      }
    }
  }
`
