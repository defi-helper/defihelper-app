import { createDomain } from 'effector-logger/macro'

import { automationApi } from '~/automations/common/automation.api'
import { history } from '~/common/history'
import { AutomateTriggerCreateInputType } from '~/graphql/_generated-types'
import { paths } from '~/paths'

export const automationCreateDomain = createDomain()

export const createTriggerFx = automationCreateDomain.createEffect(
  (input: AutomateTriggerCreateInputType) => {
    return automationApi.createTrigger({ input })
  }
)

createTriggerFx.done.watch(() => history.push(paths.automations.list))
