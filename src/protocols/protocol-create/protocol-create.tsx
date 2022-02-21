import { useGate, useStore } from 'effector-react'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { ProtocolForm } from '~/protocols/common'
import * as model from './protocol-create.model'

export type ProtocolCreateProps = unknown

export const ProtocolCreate: React.VFC<ProtocolCreateProps> = () => {
  const loading = useStore(model.protocolCreateFx.pending)

  const adapters = useStore(model.$adapters)

  useGate(model.ProtocolCreateGate)

  return (
    <AppLayout title="Protocol create">
      <Head title="Protocol create" />
      <ProtocolForm
        onSubmit={model.protocolCreateFx}
        loading={loading}
        adapters={adapters}
      />
    </AppLayout>
  )
}
