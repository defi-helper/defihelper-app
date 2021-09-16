import { AutomationTriggerFragmentFragment } from '~/graphql/_generated-types'

export type Trigger = AutomationTriggerFragmentFragment & { deleting?: boolean }
