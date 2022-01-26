import { createDomain, combine } from 'effector-logger/macro'
import omit from 'lodash.omit'

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
  ) => {
    const data = await settingsApi.integrationBinanceConnect({
      input: omit(input, 'type'),
    })

    if (!data) throw new Error('something went worng')

    return data
  }
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
  .on(connectIntegrationBinanceFx.done, (state, payload) => {
    return [...state, payload.result]
  })

export const $connectAdding = integrationListDomain
  .createStore<WalletExchangeFragmentFragment['type'] | null>(null)
  .on(connectIntegrationBinanceFx, (_, { type }) => type)
  .on(connectIntegrationBinanceFx.finally, () => null)

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
