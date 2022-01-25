import { createDomain, sample } from 'effector-logger/macro'

import { WalletExchangeFragmentFragment } from '~/graphql/_generated-types'
import { settingsApi } from '~/settings/common'
import { toastsService } from '~/toasts'

export const integrationListDomain = createDomain()

export const fetchEstablishedIntegrationsListFx =
  integrationListDomain.createEffect(async () => {
    return settingsApi.integrationList({})
  })

export const deleteWalletFx = integrationListDomain.createEffect(
  async (walletId: string) => {
    const data = await settingsApi.walletDelete({ id: walletId })

    if (!data) throw new Error('something went wrong')

    return data
  }
)

export const addWallet =
  integrationListDomain.createEvent<WalletExchangeFragmentFragment>()

export const $integrations = integrationListDomain
  .createStore<WalletExchangeFragmentFragment[]>([])
  .on(fetchEstablishedIntegrationsListFx.doneData, (_, v) => v)

export const updated = integrationListDomain.createEvent()

sample({
  clock: updated,
  target: integrationListDomain,
})

toastsService.forwardErrors(
  fetchEstablishedIntegrationsListFx.failData,
  deleteWalletFx.failData
)
