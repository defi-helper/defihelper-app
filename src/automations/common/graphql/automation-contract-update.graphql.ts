import { gql } from '@urql/core'

import { AUTOMATION_CONTRACT_FRAGMENT } from './automation-contract.fragment.graphql'

export const AUTOMATION_CONTRACT_UPDATE = gql`
  mutation AutomationContractUpdate($input: AutomateContractUpdateInputType!) {
    automateContractUpdate(input: $input) {
      ...automationContractFragment
    }
  }
  ${AUTOMATION_CONTRACT_FRAGMENT}
`
