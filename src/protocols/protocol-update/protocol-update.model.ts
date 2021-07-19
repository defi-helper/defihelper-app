import { createDomain } from 'effector-logger'
import { history } from '~/common/history'

import { ProtocolUpdateMutationVariables } from '~/graphql/_generated-types'
import { toastsService } from '~/toasts'
import { paths } from '~/paths'
import { protocolsApi } from '../common/protocol.api'

const protocolUpdate = createDomain('protocolUpdate')

export const protocolUpdateFx = protocolUpdate.createEffect({
  name: 'protocolUpdateFx',
  handler: (variables: ProtocolUpdateMutationVariables) =>
    protocolsApi.protocolUpdate(variables)
})

protocolUpdateFx.doneData.watch((payload) => {
  if (!payload?.id) return

  history.push(paths.protocols.detail(payload.id))
})

toastsService.forwardErrors(protocolUpdateFx.failData)
