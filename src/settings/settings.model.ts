import { restore, createEffect } from 'effector'

import { authModel } from '~/auth'
import { automationApi } from '~/automations/common/automation.api'

export const fetchBalanceFx = createEffect(() => automationApi.getBalance())

export const $balance = restore(fetchBalanceFx.doneData, 0).reset(
  authModel.logoutFx
)
