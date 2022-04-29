import { gql } from 'urql'

export const AUTOMATION_RUN_HISTORY = gql`
  query automationsRunsHistory($filter: AutomateRunHistoryFilterEnum!) {
    automateRunHistory(filter: $filter) {
      date
      number
    }
  }
`
