import { useStore } from 'effector-react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { paths } from '~/paths'
import { ProtocolForm } from '~/protocols/common'
import * as model from './protocol-create.model'

export type ProtocolCreateProps = unknown

export const ProtocolCreate: React.VFC<ProtocolCreateProps> = () => {
  const loading = useStore(model.protocolCreateFx.pending)

  const history = useHistory()

  useEffect(() => {
    model.protocolCreateFx.doneData.watch((payload) => {
      if (payload?.id) {
        history.push(paths.protocols.detail(payload.id))
      }
    })
  }, [history])

  return (
    <MainLayout>
      <ProtocolForm onSubmit={model.protocolCreateFx} loading={loading} />
    </MainLayout>
  )
}
