import { createDomain, restore, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { history } from '~/common/history'
import { ProtocolCreateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { protocolsApi } from '../common/protocol.api'
import { config } from '~/config'

const protocolCreate = createDomain()

export const protocolCreateFx = protocolCreate.createEffect({
  name: 'protocolCreateFx',
  handler: (input: ProtocolCreateMutationVariables['input']) =>
    protocolsApi.protocolCreate({
      input,
    }),
})

export const fetchAdaptersFx = protocolCreate.createEffect(
  () =>
    fetch(config.ADAPTERS_HOST).then((res) => res.json()) as Promise<string[]>
)

export const $adapters = restore(fetchAdaptersFx.doneData, [])

export const ProtocolCreateGate = createGate({
  name: 'ProtocolCreateGate',
  domain: protocolCreate,
})

sample({
  clock: ProtocolCreateGate.open,
  target: fetchAdaptersFx,
})

protocolCreateFx.doneData.watch((payload) => {
  if (!payload?.id) return

  history.push(paths.protocols.detail(payload.id))
})

toastsService.forwardErrors(protocolCreateFx.failData)
