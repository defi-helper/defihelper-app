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
      telegram: metricChart(
        metric: telegramFollowers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
      }
      coingecko: metricChart(
        metric: coingeckoWatchers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
      }
      coinmarketcap: metricChart(
        metric: coinmarketcapWatchers
        group: day
        pagination: { limit: 30, offset: 0 }
      ) {
        date
        sum
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
