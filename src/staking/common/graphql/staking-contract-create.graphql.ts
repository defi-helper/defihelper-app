import { gql } from 'urql'

import { STAKING_CONTRACT_FRAGMENT } from './staking-contract.fragment.graphql'

export const STAKING_CONTRACT_CREATE = gql`
  mutation StakingContractCreate(
    $protocol: UuidType!
    $input: ContractCreateInputType!
  ) {
    contractCreate(protocol: $protocol, input: $input) {
      ...stakingContractFragment
    }
  }
  ${STAKING_CONTRACT_FRAGMENT}
`
