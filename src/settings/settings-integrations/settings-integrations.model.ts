import {
  restore,
  guard,
  createEffect,
  createStore,
  createEvent,
} from 'effector-logger/macro'

import {
  IntegrationExchangeApiConnectMutationVariables,
  WalletExchangeFragmentFragment,
} from '~/api/_generated-types'
import { settingsApi } from '~/settings/common'
import { toastsService } from '~/toasts'
import { portfolioApi, portfolioSortAssetsByWallet } from '~/portfolio/common'
import { authModel } from '~/auth'

export type Integrations = Record<
  string,
  | (WalletExchangeFragmentFragment & {
      deleting?: boolean
      adding?: boolean
    })
  | undefined
>

export const fetchEstablishedIntegrationsListFx = createEffect(async () =>
  settingsApi.integrationList()
)

export const connectIntegrationApiExchangeFx = createEffect(
  async (input: IntegrationExchangeApiConnectMutationVariables['input']) => {
    const data = await settingsApi.integrationExchangeApiConnect({
      input,
    })

    if (!data)
      throw new Error(
        'Please, verify your keys pair, the pair is expired or wrong'
      )

    return data
  }
)

export const fetchAssetsByIntegration = (exchangeId: string) =>
  portfolioApi
    .getAssetsListByExchange({ exchangeId })
    .then(portfolioSortAssetsByWallet)

export const fetchAssetsByIntegrationFx = createEffect(fetchAssetsByIntegration)

export const $assetsByIntegration = restore(
  fetchAssetsByIntegrationFx.doneData,
  []
)

export const openIntegration = createEvent<string | null>()

export const $openedIntegration = createStore<string | null>(null).on(
  openIntegration,
  (_, payload) => payload
)

guard({
  clock: $openedIntegration.updates,
  filter: (integrationId): integrationId is string => Boolean(integrationId),
  target: fetchAssetsByIntegrationFx,
})

export const disconnectIntegrationFx = createEffect(
  async (integrationId: string) => {
    const data = await settingsApi.integrationDisconnect(integrationId)

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const $integrationsList = createStore<
  (WalletExchangeFragmentFragment & {
    deleting?: boolean
  })[]
>([])
  .on(fetchEstablishedIntegrationsListFx.doneData, (_, payload) => payload)
  .on(disconnectIntegrationFx, (state, payload) => {
    return state.map((integration) =>
      integration.id === payload
        ? { ...integration, deleting: true }
        : integration
    )
  })
  .on(disconnectIntegrationFx.done, (state, payload) => {
    return state.filter(
      (integration) => integration.id !== payload.params && payload.result
    )
  })
  .on(connectIntegrationApiExchangeFx.done, (state, payload) => {
    return [...state, payload.result]
  })

export const $connectAdding = createStore<
  WalletExchangeFragmentFragment['exchange'] | null
>(null)
  .on(connectIntegrationApiExchangeFx, (_, { type }) => type)
  .on(connectIntegrationApiExchangeFx.finally, () => null)

$assetsByIntegration.reset(authModel.logoutFx)
toastsService.forwardErrors(
  fetchEstablishedIntegrationsListFx.failData,
  connectIntegrationApiExchangeFx.failData,
  disconnectIntegrationFx.failData
)
