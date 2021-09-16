import { createDomain } from 'effector-logger/macro'

import { AutomateTriggerUpdateInputType } from '~/graphql/_generated-types'
import { automationApi } from '~/automations/common/automation.api'

export const automationUpdateDomain = createDomain()

export const updateTriggerFx = automationUpdateDomain.createEffect(
  async (input: AutomateTriggerUpdateInputType) => {
    return automationApi.updateTrigger({ input })
  }
)
