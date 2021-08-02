import { createDomain } from 'effector-logger'

import { AddWalletInputType } from '~/graphql/_generated-types'
import { dashboardApi } from './common'

export const dashboardDomain = createDomain('dashboardDomain')

export const addWalletFx = dashboardDomain.createEffect({
  name: 'addWalletFx',
  handler: (input: AddWalletInputType) => dashboardApi.addWallet({ input }),
})
