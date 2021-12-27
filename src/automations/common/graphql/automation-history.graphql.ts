import { gql } from 'urql'

export const AUTOMATION_HISTORY = gql`
  query AutomationHistory(
    $filter: AutomateTriggerFilterInputType!
    $callHistoryFilter: AutomateTriggerCallHistoryListFilterInputType
    $callHistorySort: [AutomateTriggerCallHistoryListSortInputType!]
    $callHistoryPagination: AutomateTriggerCallHistoryListPaginationInputType
  ) {
    automateTrigger(filter: $filter) {
      callHistory(
        filter: $callHistoryFilter
        sort: $callHistorySort
        pagination: $callHistoryPagination
      ) {
        list {
          id
          error
          createdAt
        }
        pagination {
          count
        }
      }
    }
  }
`
