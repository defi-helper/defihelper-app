import { useGate, useStore } from 'effector-react'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import omit from 'lodash.omit'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { ProtocolForm } from '~/protocols/common'
import { detailModel } from '~/protocols/protocol-detail'
import * as model from './protocol-update.model'
import * as protocolOverviewModel from '~/protocols/protocol-overview/protocol-overview.model'
import { BlockchainEnum } from '~/graphql/_generated-types'

export type ProtocolUpdateProps = unknown

export const ProtocolUpdate: React.VFC<ProtocolUpdateProps> = () => {
  const params = useParams<{ protocolId: string }>()

  const adapters = useStore(model.$adapters)

  useGate(detailModel.ProtocolDetailGate, params)
  useGate(model.ProtocolUpdateGate)
  useGate(protocolOverviewModel.ProtocolDetailOverviewGate, params.protocolId)

  const protocol = useStore(detailModel.$protocol)
  const overview = useStore(protocolOverviewModel.$overview)
  const loading = useStore(detailModel.fetchProtocolFx.pending)

  const defaultValues = useMemo(
    () => ({
      name: protocol?.name ?? '',
      description: overview?.description ?? undefined,
      hidden: protocol?.hidden ?? undefined,
      icon: protocol?.icon ?? undefined,
      link: protocol?.link ?? undefined,
      adapter: protocol?.adapter ?? '',
      previewPicture: protocol?.previewPicture ?? undefined,
      links: {
        social:
          overview?.links.social.map((link) => omit(link, '__typename')) ?? [],
        listing:
          overview?.links.listing.map((link) => omit(link, '__typename')) ?? [],
        audit:
          overview?.links.audit.map((link) => omit(link, '__typename')) ?? [],
        other:
          overview?.links.other.map((link) => omit(link, '__typename')) ?? [],
      },
    }),
    [protocol, overview]
  )

  const formLoading = useStore(model.protocolUpdateFx.pending)

  return (
    <AppLayout
      title={loading ? 'loading...' : `${protocol?.name ?? ''} update`}
    >
      <Head title={loading ? 'loading...' : `${protocol?.name ?? ''} update`} />
      {!loading && protocol && overview && (
        <ProtocolForm
          onSubmit={(formValues) =>
            model.protocolUpdateFx({ id: params.protocolId, input: formValues })
          }
          onResolveContracts={(
            blockchain: BlockchainEnum,
            network: string,
            resolver: string,
            events: string[]
          ) =>
            model.protocolResolveContractsFx({
              id: params.protocolId,
              input: { blockchain, network, events, resolver },
            })
          }
          adapters={adapters}
          loading={formLoading}
          defaultValues={defaultValues}
        />
      )}
    </AppLayout>
  )
}
