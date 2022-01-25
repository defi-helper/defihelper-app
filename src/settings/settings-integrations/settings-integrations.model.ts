import { createDomain, combine } from 'effector-logger/macro'

import {
  IntegrationBinanceConnectMutationVariables,
  WalletExchangeFragmentFragment,
  WalletExchangeTypeEnum,
} from '~/graphql/_generated-types'
import { settingsApi } from '~/settings/common'
import { toastsService } from '~/toasts'

export type Integrations = Record<
  string,
  | (WalletExchangeFragmentFragment & {
      deleting?: boolean
      adding?: boolean
    })
  | undefined
>

export const integrationListDomain = createDomain()

export const fetchEstablishedIntegrationsListFx =
  integrationListDomain.createEffect(async () => settingsApi.integrationList())

export const connectIntegrationBinanceFx = integrationListDomain.createEffect(
  async (
    input: IntegrationBinanceConnectMutationVariables['input'] & {
      type: WalletExchangeTypeEnum
    }
  ) => settingsApi.integrationBinanceConnect({ input })
)

export const disconnectIntegrationFx = integrationListDomain.createEffect(
  async (integrationId: string) => {
    const data = await settingsApi.integrationDisconnect(integrationId)

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const $integrationsList = integrationListDomain
  .createStore<
    (WalletExchangeFragmentFragment & {
      deleting?: boolean
      adding?: boolean
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
  .on(connectIntegrationBinanceFx, (state, payload) => {
    return state.map((integration) =>
      integration.type === payload.type
        ? { ...integration, adding: true }
        : integration
    )
  })
  .on(connectIntegrationBinanceFx.done, (state, payload) => {
    return state.map((integration) =>
      integration.type === payload.params.type
        ? { ...integration, adding: false }
        : integration
    )
  })

export const $integrations = combine($integrationsList, (integrations) => {
  return integrations.reduce<Integrations>((acc, integration) => {
    acc[integration.type] = integration

    return acc
  }, {})
})

toastsService.forwardErrors(
  fetchEstablishedIntegrationsListFx.failData,
  connectIntegrationBinanceFx.failData,
  disconnectIntegrationFx.failData
)
