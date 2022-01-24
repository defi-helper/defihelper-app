import { createDomain, guard, restore } from 'effector-logger/macro'

import { AddWalletInputType } from '~/graphql/_generated-types'
import { portfolioApi } from '~/portfolio/common'
import * as assetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'
import { authModel } from '~/auth'

export const portfolioWalletsDomain = createDomain()

export const addWalletFx = portfolioWalletsDomain.createEffect(
  (input: AddWalletInputType) => portfolioApi.addWallet({ input })
)

export const fetchAssetsByWalletFx = portfolioWalletsDomain.createEffect(
  assetsModel.fetchAssetsByWallet
)

export const openWallet = portfolioWalletsDomain.createEvent<string | null>()

export const $openedWallet = portfolioWalletsDomain
  .createStore<string | null>(null)
  .on(openWallet, (_, payload) => payload)

guard({
  clock: $openedWallet.updates,
  filter: (walletId): walletId is string => Boolean(walletId),
  target: fetchAssetsByWalletFx,
})

const closeWallet = guard({
  clock: $openedWallet.updates,
  filter: (walletId): walletId is null => walletId === null,
})

export const $assetsByWallet = restore(
  fetchAssetsByWalletFx.doneData,
  []
).reset(closeWallet, authModel.logoutFx.finally)

$openedWallet.reset(authModel.logoutFx.finally)
