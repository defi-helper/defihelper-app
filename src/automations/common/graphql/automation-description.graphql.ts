import { gql } from 'urql'

export const AUTOMATION_DESCRIPTION_FRAGMENT = gql`
  fragment automationDescriptionFragment on AutomateDescriptionType {
    name
    description
  }
`

export const AUTOMATION_DESCRIPTION = gql`
  query AutomationDescription {
    automateDescription {
      triggers {
        everyMonth {
          ...automationDescriptionFragment
        }
        everyWeek {
          ...automationDescriptionFragment
        }
        everyDay {
          ...automationDescriptionFragment
        }
        everyHour {
          ...automationDescriptionFragment
        }
        contractEvent {
          ...automationDescriptionFragment
        }
      }
      conditions {
        schedule {
          ...automationDescriptionFragment
        }
        ethereumAvgGasPrice {
          ...automationDescriptionFragment
        }
        ethereumBalance {
          ...automationDescriptionFragment
        }
        ethereumOptimalAutomateRun {
          ...automationDescriptionFragment
        }
        contractMetric {
          ...automationDescriptionFragment
        }
      }
      actions {
        notification {
          ...automationDescriptionFragment
        }
        ethereumAutomateRun {
          ...automationDescriptionFragment
        }
      }
    }
  }
  ${AUTOMATION_DESCRIPTION_FRAGMENT}
`
