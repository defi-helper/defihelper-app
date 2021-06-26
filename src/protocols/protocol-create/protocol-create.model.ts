import { createDomain } from 'effector-logger'

import { ProtocolCreateMutationVariables } from '~/graphql/_generated-types'
import { notifications } from '~/notifications'
import { protocolsApi } from '../common/protocol.api'

const protocolCreate = createDomain('protocolCreate')

export const protocolCreateFx = protocolCreate.createEffect({
  name: 'protocolCreateFx',
  handler: (input: ProtocolCreateMutationVariables['input']) =>
    protocolsApi.protocolsCreate({ input })
})

protocolCreateFx.failData.watch((error) => notifications.error(error.message))
