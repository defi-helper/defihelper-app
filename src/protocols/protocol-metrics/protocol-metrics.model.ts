import { createDomain } from 'effector-logger/macro'
import { bignumberUtils } from '~/common/bignumber-utils'

import { dateUtils } from '~/common/date-utils'
import { Unwrap } from '~/common/types'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type State = Record<
  MetricGroupEnum,
  {
    data: Unwrap<ReturnType<typeof protocolsApi.protocolDetailMetric>>
    value: MetricGroupEnum
    loading: boolean
  }
>

const protocolMetricsDomain = createDomain('protocolMetricsDomain')

const DAYS_LIMIT = 180

export const fetchMetricFx = protocolMetricsDomain.createEffect({
  name: 'fetchMetricFx',
  handler: async (params: { protocolId: string; group: MetricGroupEnum }) => {
    const data = await protocolsApi.protocolDetailMetric({
      filter: {
        id: params.protocolId,
      },
      metric: 'tvl',
      metricGroup: params.group,
      metricFilter: {
        dateBefore: dateUtils.now(),
        dateAfter: dateUtils.after180Days(),
      },
      metricPagination: {
        limit: DAYS_LIMIT,
      },
    })

    return {
      group: params.group,
      data: data.map((dataItem) => ({
        ...dataItem,
        sum: bignumberUtils.format(dataItem.sum),
      })),
    }
  },
})

const initialState = Object.values(MetricGroupEnum).reduce<State>(
  (acc, metricGroup) => {
    acc[metricGroup] = {
      data: [],
      value: metricGroup,
      loading: false,
    }

    return acc
  },
  {} as State
)

export const $metric = protocolMetricsDomain
  .createStore(initialState, { name: '$metric' })
  .on(fetchMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true,
    },
  }))
  .on(fetchMetricFx.doneData, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      data: payload.data,
      loading: false,
    },
  }))
