import { createDomain, sample, guard, restore } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import {
  portfolioApi,
  portfolioSortAssets,
  portfolioSortAssetsByWallet,
} from '~/portfolio/common'
import { PortfolioAssetFragment, UserType } from '~/graphql/_generated-types'
import { Protocol, protocolsApi } from '~/protocols/common'
import { authModel } from '~/auth'

export const portfolioAssetsDomain = createDomain()

export const fetchAssetsListFx = portfolioAssetsDomain.createEffect(() => {
  return portfolioApi.getAssetsList({}).then(portfolioSortAssets)
})

export const fetchAssetsByWalletFx = portfolioAssetsDomain.createEffect(
  (walletId: string) =>
    portfolioApi
      .getAssetsListByWallet({ walletId })
      .then(portfolioSortAssetsByWallet)
)

export const fetchAssetsByPlatformFx = portfolioAssetsDomain.createEffect(
  (protocolId: string) =>
    portfolioApi
      .getAssetsListByProtocol({ protocolId })
      .then(portfolioSortAssets)
)

export const PortfolioAssetsGate = createGate<string | null>({
  domain: portfolioAssetsDomain,
  name: 'PortfolioAssetsGate',
})

export const fetchUserInteractedProtocolsListFx =
  portfolioAssetsDomain.createEffect((userId: string) =>
    protocolsApi.protocolList({
      protocolFilter: {
        linked: userId,
      },
    })
  )

export const $assets = portfolioAssetsDomain
  .createStore<PortfolioAssetFragment[]>([])
  .on(fetchAssetsListFx.doneData, (_, payload) => payload)

export const $assetsByWallet = restore(fetchAssetsByWalletFx.doneData, [])
export const openPlatform = portfolioAssetsDomain.createEvent<string | null>()

export const $openedPlatform = portfolioAssetsDomain
  .createStore<string | null>(null)
  .on(openPlatform, (_, payload) => payload)

guard({
  clock: $openedPlatform.updates,
  filter: (walletId): walletId is string => Boolean(walletId),
  target: fetchAssetsByPlatformFx,
})

const closePlatform = guard({
  clock: $openedPlatform.updates,
  filter: (walletId): walletId is null => walletId === null,
})

export const $protocols = portfolioAssetsDomain
  .createStore<Protocol[]>([])
  .on(
    fetchUserInteractedProtocolsListFx.doneData,
    (_, payload) =>
      payload.list
        .filter((v) => v.metric.myStaked !== '0')
        .sort((v) => Number(v.metric.myStaked)) as Protocol[]
  )

export const $assetsByPlatform = restore(
  fetchAssetsByPlatformFx.doneData,
  []
).reset(closePlatform)

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
  filter: (clock): clock is string => Boolean(clock),
  target: fetchAssetsByPlatformFx,
})
