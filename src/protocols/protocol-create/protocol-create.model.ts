import { createDomain } from 'effector-logger'
import { history } from '~/common/history'

import { ProtocolCreateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { protocolsApi } from '../common/protocol.api'

const protocolCreate = createDomain('protocolCreate')

export const protocolCreateFx = protocolCreate.createEffect({
  name: 'protocolCreateFx',
  handler: (input: ProtocolCreateMutationVariables['input']) =>
    protocolsApi.protocolCreate({
      input
    })
})

protocolCreateFx.doneData.watch((payload) => {
  if (!payload?.id) return

  history.push(paths.protocols.detail(payload.id))
})

toastsService.forwardErrors(protocolCreateFx.failData)
