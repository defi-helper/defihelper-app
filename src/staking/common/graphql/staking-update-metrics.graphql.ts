import { gql } from 'urql'

export const STAKING_UPDATE_METRICS = gql`
  mutation StakingUpdateMetrics($contract: UuidType!) {
    contractMetricScan(contract: $contract)
  }
`
