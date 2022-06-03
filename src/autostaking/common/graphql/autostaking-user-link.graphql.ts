import { gql } from 'urql'

export const AUTOSTAKING_USER_LINK = gql`
  mutation AutostakingUserLink(
    $contract: UuidType!
    $user: UuidType!
    $type: ContractUserLinkTypeEnum
  ) {
    contractUserLink(contract: $contract, user: $user, type: $type)
  }
`
