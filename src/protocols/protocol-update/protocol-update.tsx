import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { AppLayout } from '~/layouts'
import { ProtocolForm } from '~/protocols/common'
import { detailModel } from '~/protocols/protocol-detail'
import * as model from './protocol-update.model'

export type ProtocolUpdateProps = unknown

export const ProtocolUpdate: React.VFC<ProtocolUpdateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  useGate(detailModel.ProtocolDetailGate, params)

  const protocol = useStore(detailModel.$protocol)
  const loading = useStore(detailModel.fetchProtocolFx.pending)

  const defaultValues = useMemo(
    () => ({
      name: protocol?.name ?? '',
      description: protocol?.description ?? undefined,
      hidden: protocol?.hidden ?? undefined,
      icon: protocol?.icon ?? undefined,
      link: protocol?.link ?? undefined,
      adapter: protocol?.adapter ?? '',
    }),
    [protocol]
  )

  const formLoading = useStore(model.protocolUpdateFx.pending)

  return (
    <AppLayout>
      {!loading && (
        <ProtocolForm
          onSubmit={(formValues) =>
            model.protocolUpdateFx({ id: params.protocolId, input: formValues })
          }
          loading={formLoading}
          defaultValues={defaultValues}
        />
      )}
    </AppLayout>
  )
}
