import { useGate, useStore } from 'effector-react'
import { useEffect, useMemo } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import { MainLayout } from '~/layouts'
import { paths } from '~/paths'
import { ProtocolForm } from '~/protocols/common'
import { detailModel } from '~/protocols/protocol-detail'
import * as model from './protocol-update.model'

export type ProtocolUpdateProps = unknown

export const ProtocolUpdate: React.VFC<ProtocolUpdateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  useGate(detailModel.Gate, params)

  const protocol = useStore(detailModel.$protocol)
  const loading = useStore(detailModel.fetchProtocolFx.pending)

  const defaultValues = useMemo(
    () => ({
      name: protocol?.name ?? '',
      description: protocol?.description ?? undefined,
      hidden: protocol?.hidden ?? undefined,
      icon: protocol?.icon ?? undefined,
      link: protocol?.link ?? undefined
    }),
    [protocol]
  )

  const formLoading = useStore(model.protocolUpdateFx.pending)

  const history = useHistory()

  useEffect(() => {
    model.protocolUpdateFx.doneData.watch((payload) => {
      if (payload?.id) {
        history.push(paths.protocols.detail(payload.id))
      }
    })
  }, [history])

  return (
    <MainLayout>
      {!loading && protocol && (
        <ProtocolForm
          onSubmit={(formValues) =>
            model.protocolUpdateFx({ id: params.protocolId, input: formValues })
          }
          loading={formLoading}
          defaultValues={defaultValues}
        />
      )}
    </MainLayout>
  )
}
