import { gql } from 'urql'

export const AUTOSTAKING_USER_UNLINK = gql`
  mutation AutostakingUserUnlink(
    $contract: UuidType!
    $user: UuidType!
    $type: ContractUserLinkTypeEnum
  ) {
    contractUserUnlink(contract: $contract, user: $user, type: $type)
  }
`
