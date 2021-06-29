import { createDomain } from 'effector-logger'
import { history } from '~/common/history'

import { ProtocolCreateMutationVariables } from '~/graphql/_generated-types'
import { notifications } from '~/notifications'
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

protocolCreateFx.failData.watch((error) => notifications.error(error.message))

protocolCreateFx.doneData.watch((payload) => {
  if (!payload?.id) return

  history.push(paths.protocols.detail(payload.id))
})
