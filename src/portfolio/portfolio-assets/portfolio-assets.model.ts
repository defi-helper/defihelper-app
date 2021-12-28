import { createDomain, sample, guard, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { portfolioApi, portfolioSortAssets } from '~/portfolio/common'
import { PortfolioAssetFragment } from '~/graphql/_generated-types'

export const portfolioAssetsDomain = createDomain()

export const fetchAssetsListFx = portfolioAssetsDomain.createEffect(() => {
  return portfolioApi.getAssetsList({}).then(portfolioSortAssets)
})

export const fetchAssetsByWallet = portfolioAssetsDomain.createEffect(
  (walletId: string) =>
    portfolioApi.getAssetsListByWallet({ walletId }).then(portfolioSortAssets)
)

export const $assets = portfolioAssetsDomain
  .createStore<PortfolioAssetFragment[]>([])
  .on(fetchAssetsListFx.doneData, (_, payload) => payload)

export const $assetsByWallet = restore(fetchAssetsByWallet.doneData, [])

export const PortfolioAssetsGate = createGate<string>({
  domain: portfolioAssetsDomain,
  name: 'PortfolioAssetsGate',
})

sample({
  clock: PortfolioAssetsGate.open,
  target: fetchAssetsListFx,
})

guard({
  clock: PortfolioAssetsGate.state.updates,
  filter: (clock) => Boolean(clock),
  target: fetchAssetsByWallet,
})
