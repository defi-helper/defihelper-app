import { useStore } from 'effector-react'

import { MainLayout } from '~/layouts'
import { ProtocolForm } from '~/protocols/common'
import * as model from './protocol-create.model'

export type ProtocolCreateProps = unknown

export const ProtocolCreate: React.VFC<ProtocolCreateProps> = () => {
  const loading = useStore(model.protocolCreateFx.pending)

  return (
    <MainLayout>
      <ProtocolForm onSubmit={model.protocolCreateFx} loading={loading} />
    </MainLayout>
  )
}
