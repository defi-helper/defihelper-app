import { gql } from '@urql/core'

import { AUTOMATION_CONTRACT_FRAGMENT } from './automation-contract.fragment.graphql'

export const AUTOMATION_CONTRACT_CREATE = gql`
  mutation AutomationContractCreate($input: AutomateContractCreateInputType!) {
    automateContractCreate(input: $input) {
      ...automationContractFragment
    }
  }
  ${AUTOMATION_CONTRACT_FRAGMENT}
`
