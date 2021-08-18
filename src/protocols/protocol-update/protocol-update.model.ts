import { createDomain, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { history } from '~/common/history'
import { ProtocolUpdateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { protocolsApi } from '../common/protocol.api'
import { config } from '~/config'

const protocolUpdate = createDomain('protocolUpdate')

export const protocolUpdateFx = protocolUpdate.createEffect({
  name: 'protocolUpdateFx',
  handler: (variables: ProtocolUpdateMutationVariables) =>
    protocolsApi.protocolUpdate(variables),
})

export const fetchAdaptersFx = protocolUpdate.createEffect({
  name: 'fetchAdaptersFx',
  handler: () =>
    fetch(config.ADAPTERS_URL).then((res) => res.json()) as Promise<string[]>,
})

export const $adapters = restore(fetchAdaptersFx.doneData, [])

export const ProtocolUpdateGate = createGate({
  name: 'ProtocolUpdateGate',
  domain: protocolUpdate,
})

sample({
  clock: ProtocolUpdateGate.open,
  target: fetchAdaptersFx,
})

protocolUpdateFx.doneData.watch((payload) => {
  if (!payload?.id) return

  history.push(paths.protocols.detail(payload.id))
})

toastsService.forwardErrors(protocolUpdateFx.failData)
