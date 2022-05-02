import { gql } from 'urql'

export const AUTOMATION_RUN_HISTORY = gql`
  query monitoringAutomationsRunsHistory(
    $filter: MonitoringAutomateRunHistoryFilterEnum!
  ) {
    monitoringAutomateRunHistory(filter: $filter) {
      date
      number
    }
  }
`
