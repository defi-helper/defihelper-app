import { gql } from 'urql'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_DETAIL = gql`
  query Protocol($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      ...protocolFragment
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
  ${PROTOCOL_FRAGMENT}
`
