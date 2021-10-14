import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { ProtocolForm } from '~/protocols/common'
import { detailModel } from '~/protocols/protocol-detail'
import * as model from './protocol-update.model'

export type ProtocolUpdateProps = unknown

export const ProtocolUpdate: React.VFC<ProtocolUpdateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  const adapters = useStore(model.$adapters)

  useGate(detailModel.ProtocolDetailGate, params)
  useGate(model.ProtocolUpdateGate)

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
      <Head title={loading ? 'loading...' : `${protocol?.name ?? ''} update`} />
      {!loading && (
        <ProtocolForm
          onSubmit={(formValues) =>
            model.protocolUpdateFx({ id: params.protocolId, input: formValues })
          }
          adapters={adapters}
          loading={formLoading}
          defaultValues={defaultValues}
        />
      )}
    </AppLayout>
  )
}
