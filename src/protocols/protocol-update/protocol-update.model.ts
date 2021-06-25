import { createDomain } from 'effector-logger'

import { ProtocolUpdateMutationVariables } from '~/graphql/_generated-types'
import { notifications } from '~/notifications'
import { protocolsApi } from '../common/protocol.api'

const protocolUpdate = createDomain('protocolUpdate')

export const protocolUpdateFx = protocolUpdate.createEffect({
  name: 'protocolUpdateFx',
  handler: (variables: ProtocolUpdateMutationVariables) =>
    protocolsApi.protocolsUpdate(variables)
})

protocolUpdateFx.failData.watch((error) => notifications.error(error.message))
