import { createDomain, guard, restore, sample } from 'effector-logger/macro'
import { attach } from 'effector'

import * as assetsModel from '~/portfolio/portfolio-assets/portfolio-assets.model'

export type OpenedWallet = { walletId: string; contractId: string } | null

export const portfolioDeployedContracts = createDomain()

export const fetchAssetsByWalletFx = attach({
  effect: assetsModel.fetchAssetsByWalletFx,
})

export const openWallet = portfolioDeployedContracts.createEvent<OpenedWallet>()

export const $openedWallet = portfolioDeployedContracts
  .createStore<OpenedWallet>(null)
  .on(openWallet, (_, payload) => payload)

sample({
  clock: guard({
    clock: $openedWallet.updates,
    filter: (wallet): wallet is Exclude<OpenedWallet, null> => Boolean(wallet),
  }),
  fn: ({ walletId }) => walletId,
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
