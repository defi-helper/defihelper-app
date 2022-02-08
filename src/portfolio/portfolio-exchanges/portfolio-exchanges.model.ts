import { createDomain, guard } from 'effector-logger/macro'

import { createGate } from 'effector-react'
import { WalletExchangeFragmentFragment } from '~/graphql/_generated-types'
import { settingsApi } from '~/settings/common'
import { toastsService } from '~/toasts'
import { authModel } from '~/auth'

export const integrationListDomain = createDomain()

export const fetchEstablishedIntegrationsListFx =
  integrationListDomain.createEffect(async () => settingsApi.integrationList())

export const $exchangesList = integrationListDomain
  .createStore<WalletExchangeFragmentFragment[]>([])
  .on(fetchEstablishedIntegrationsListFx.doneData, (_, payload) => payload)

export const PortfolioIntegrationsGate = createGate({
  domain: integrationListDomain,
  name: 'PortfolioIntegrationsGate',
})

guard({
  source: PortfolioIntegrationsGate.status,
  clock: [PortfolioIntegrationsGate.open, authModel.$user.updates],
  filter: (isOpened) => isOpened,
  target: fetchEstablishedIntegrationsListFx,
})

toastsService.forwardErrors(fetchEstablishedIntegrationsListFx.failData)
