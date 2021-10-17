import { createDomain } from 'effector-logger/macro'

import { AddWalletInputType } from '~/graphql/_generated-types'
import { portfolioApi } from '~/portfolio/common'

export const portfolioWalletsDomain = createDomain()

export const addWalletFx = portfolioWalletsDomain.createEffect(
  (input: AddWalletInputType) => portfolioApi.addWallet({ input })
)
