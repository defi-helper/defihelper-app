import { gql } from 'urql'

export const STAKING_APY_RESTAKE_CALCULATOR = gql`
  query RestakeCalculator(
    $contract: UuidType!
    $amount: BigNumberType!
    $period: Int!
    $isRestake: Boolean!
  ) {
    restakeCalculator(
      contract: $contract
      amount: $amount
      period: $period
      isRestake: $isRestake
    ) {
      earnedUSD
      nextRestakeAt
      apyBoost
    }
  }
`
