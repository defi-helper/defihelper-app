import { gql } from '@urql/core'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOL_DETAIL = gql`
  query Protocol($filter: ProtocolFilterInputType!) {
    protocol(filter: $filter) {
      ...protocolFragment
      socialPosts(
        sort: [{ column: createdAt, order: desc }]
        pagination: { limit: 3, offset: 0 }
      ) {
        list {
          id
          provider
          title
          content
          link
          createdAt
        }
      }
      telegram: metricChart(metric: telegramFollowers, group: month) {
        date
        sum
      }
      coingecko: metricChart(metric: coingeckoWatchers, group: month) {
        date
        sum
      }
      coinmarketcap: metricChart(metric: coinmarketcapWatchers, group: month) {
        date
        sum
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
