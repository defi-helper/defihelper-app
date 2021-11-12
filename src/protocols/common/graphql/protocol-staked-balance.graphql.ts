import { gql } from '@urql/core'

export const PROTOCOL_STAKED_BALANCE = gql`
  query ProtocolStakedBalance(
    $group: MetricGroupEnum!
    $contract: [UuidType!]
    $dateAfter: DateTimeType
    $dateBefore: DateTimeType
    $pagination: UserTokenMetricChartPaginationInputType
    $sort: [UserTokenMetricChartSortInputType!]
  ) {
    me {
      altCoins: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          contract: $contract
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { stable: false }
        }
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
      stableCoins: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          contract: $contract
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { stable: true }
        }
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
    }
  }
`
