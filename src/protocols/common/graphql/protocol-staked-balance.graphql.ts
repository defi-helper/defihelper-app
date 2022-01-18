import { gql } from 'urql'

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
      altCoin: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          contract: $contract
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { liquidity: unstable }
        }
        pagination: $pagination
        sort: $sort
      ) {
        sum
        date
      }
      stableCoin: tokenMetricChart(
        metric: usd
        group: $group
        filter: {
          contract: $contract
          dateAfter: $dateAfter
          dateBefore: $dateBefore
          tokenAlias: { liquidity: stable }
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
