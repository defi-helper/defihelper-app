import { createDomain, sample, guard, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { portfolioApi, portfolioSortAssets } from '~/portfolio/common'
import { PortfolioAssetFragment, UserType } from '~/graphql/_generated-types'
import { Protocol, protocolsApi } from '~/protocols/common'
import { authModel } from '~/auth'

export const portfolioAssetsDomain = createDomain()
export const portfolioProtocolsListDomain = createDomain()

export const fetchAssetsListFx = portfolioAssetsDomain.createEffect(() => {
  return portfolioApi.getAssetsList({}).then(portfolioSortAssets)
})

export const fetchAssetsByWalletFx = portfolioAssetsDomain.createEffect(
  (walletId: string) =>
    portfolioApi.getAssetsListByWallet({ walletId }).then(portfolioSortAssets)
)

export const PortfolioAssetsGate = createGate<string>({
  domain: portfolioAssetsDomain,
})

export const PortfolioProtocolsGate = createGate<string>({
  domain: portfolioProtocolsListDomain,
})

export const fetchUserInteractedProtocolsListFx =
  portfolioProtocolsListDomain.createEffect((userId: string) => {
    console.warn(`!!!${userId}`)
    return protocolsApi.protocolList({
      protocolFilter: {
        linked: userId,
      },
    })
  })

export const $assets = portfolioAssetsDomain
  .createStore<PortfolioAssetFragment[]>([])
  .on(fetchAssetsListFx.doneData, (_, payload) => payload)

export const $assetsByWallet = restore(fetchAssetsByWalletFx.doneData, [])

export const $protocols = portfolioProtocolsListDomain
  .createStore<Protocol[]>([])
  .on(
    fetchUserInteractedProtocolsListFx.doneData,
    (_, payload) => payload.list as Protocol[]
  )

sample({
  clock: guard({
    source: [authModel.$user, PortfolioAssetsGate.status],
    clock: [authModel.$user.updates, PortfolioAssetsGate.open],
    filter: (source): source is [UserType, boolean] => {
      const [user, opened] = source
      return user?.id !== undefined && opened
    },
  }),
  fn: ([user]) => user.id,
  target: fetchUserInteractedProtocolsListFx,
})

sample({
  clock: PortfolioAssetsGate.open,
  target: fetchAssetsListFx,
})

guard({
  clock: PortfolioAssetsGate.state.updates,
  filter: (clock) => Boolean(clock),
  target: fetchAssetsByWalletFx,
})
