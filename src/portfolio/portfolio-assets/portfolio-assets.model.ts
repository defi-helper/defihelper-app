import { createDomain, sample, guard, restore, UnitValue } from 'effector'
import { createGate } from 'effector-react'

import {
  portfolioApi,
  portfolioSortAssets,
  portfolioSortAssetsByPlatform,
  portfolioSortAssetsByWallet,
} from '~/portfolio/common'
import {
  PortfolioAssetFragment,
  TokenAliasLiquidityEnum,
  UserType,
} from '~/api/_generated-types'
import { authModel } from '~/auth'

export const portfolioAssetsDomain = createDomain()

export const fetchAssetsListFx = portfolioAssetsDomain.createEffect(() => {
  return portfolioApi.getAssetsList({}).then(portfolioSortAssets)
})

export const fetchAssetsByWallet = (walletId: string) =>
  portfolioApi
    .getAssetsListByWallet({ walletId })
    .then(portfolioSortAssetsByWallet)

export const fetchAssetsByWalletFx =
  portfolioAssetsDomain.createEffect(fetchAssetsByWallet)

export const fetchAssetsByPlatformFx = portfolioAssetsDomain.createEffect(
  (protocolId: string) =>
    portfolioApi
      .getAssetsListByProtocol({ protocolId })
      .then(portfolioSortAssetsByPlatform)
)

export const PortfolioAssetsGate = createGate<string | null>({
  domain: portfolioAssetsDomain,
  name: 'PortfolioAssetsGate',
  defaultState: null,
})

export const fetchUserInteractedProtocolsListFx =
  portfolioAssetsDomain.createEffect((user: string) =>
    portfolioApi.getProtocolList({
      filter: {
        user,
      },
    })
  )

export const $assets = portfolioAssetsDomain
  .createStore<PortfolioAssetFragment[]>([])
  .on(fetchAssetsListFx.doneData, (_, payload) =>
    payload.filter((row) => row.liquidity !== TokenAliasLiquidityEnum.Trash)
  )

export const $assetsDebug = portfolioAssetsDomain
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
  .createStore<
    UnitValue<typeof fetchUserInteractedProtocolsListFx.doneData>['list']
  >([])
  .on(fetchUserInteractedProtocolsListFx.doneData, (_, payload) => payload.list)

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
  target: [fetchAssetsByPlatformFx, fetchAssetsByWalletFx],
})

$assets.reset(authModel.logoutFx)
$assetsByWallet.reset(authModel.logoutFx)
$protocols.reset(authModel.logoutFx)
