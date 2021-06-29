import { gql } from '@urql/core'

import { STAKING_CONTRACT_FRAGMENT } from './staking-contract.fragment.graphql'

export const STAKING_CONTRACT_UPDATE = gql`
  mutation StakingContractUpdate(
    $id: UuidType!
    $input: ContractUpdateInputType!
  ) {
    contractUpdate(id: $id, input: $input) {
      ...stakingContractFragment
    }
  }
  ${STAKING_CONTRACT_FRAGMENT}
`
