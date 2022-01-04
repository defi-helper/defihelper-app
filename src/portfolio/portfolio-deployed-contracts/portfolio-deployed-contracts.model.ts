import { createDomain, guard, restore } from 'effector-logger/macro'
import { attach } from 'effector'

import * as assetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'

export const portfolioDeployedContracts = createDomain()

export const fetchAssetsByWalletFx = attach({
  effect: assetsModel.fetchAssetsByWalletFx,
})

export const openWallet = portfolioDeployedContracts.createEvent<
  string | null
>()

export const $openedWallet = portfolioDeployedContracts
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
).reset(closeWallet)
