import { gql } from '@urql/core'

import { PROTOCOL_FRAGMENT } from './protocol.fragment.graphql'

export const PROTOCOLS = gql`
  query Protocols(
    $protocolFilter: ProtocolListFilterInputType
    $protocolSort: [ProtocolListSortInputType!]
    $protocolPagination: ProtocolListPaginationInputType
    $metric: MetricColumnType! = usd
    $metricGroup: MetricGroupEnum! = day
    $metricFilter: ProtocolMetricChartFilterInputType
    $metricSort: [ProtocolMetricChartSortInputType!] = [
      { column: date, order: desc }
    ]
    $metricPagination: ProtocolMetricChartPaginationInputType = { limit: 1 }
  ) {
    protocols(
      filter: $protocolFilter
      sort: $protocolSort
      pagination: $protocolPagination
    ) {
      list {
        ...protocolFragment
        metricChart(
          metric: $metric
          group: $metricGroup
          filter: $metricFilter
          sort: $metricSort
          pagination: $metricPagination
        ) {
          avg
        }
      }
      pagination {
        count
      }
    }
    favorites: protocols(filter: { favorite: true }) {
      pagination {
        count
      }
    }
    all: protocols {
      pagination {
        count
      }
    }
  }
  ${PROTOCOL_FRAGMENT}
`
