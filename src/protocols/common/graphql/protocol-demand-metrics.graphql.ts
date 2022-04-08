import { gql } from 'urql'

export const PROTOCOL_DEMAND_METRICS = gql`
  query ProtocolDemandMetrics($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      telegram: metricChart(
        metric: telegramFollowers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
        provider
        entityIdentifier
      }
      coingecko: metricChart(
        metric: coingeckoWatchers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
        provider
        entityIdentifier
      }
      coinmarketcap: metricChart(
        metric: coinmarketcapWatchers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
        provider
        entityIdentifier
      }
    }
  }
`
