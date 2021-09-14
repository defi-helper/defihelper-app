import { createDomain } from 'effector-logger/macro'

import { AddWalletInputType } from '~/graphql/_generated-types'
import { portfolioApi } from './common'

export const portfolioDomain = createDomain('portfolioDomain')

export const addWalletFx = portfolioDomain.createEffect({
  name: 'addWalletFx',
  handler: (input: AddWalletInputType) => portfolioApi.addWallet({ input }),
})
