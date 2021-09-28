import { createDomain } from 'effector-logger/macro'
import { bignumberUtils } from '~/common/bignumber-utils'

import { dateUtils } from '~/common/date-utils'
import { Unwrap } from '~/common/types'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: Unwrap<ReturnType<typeof protocolsApi.protocolDetailMetric>>
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>

const protocolMetricOverviewDomain = createDomain()

const DAYS_LIMIT = 180

export const fetchMetricFx = protocolMetricOverviewDomain.createEffect(
  async (params: {
    protocolId: string
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  }) => {
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
  }
)

const initialState = Object.values(MetricGroupEnum).reduce<State>(
  (acc, metricGroup) => {
    if (metricGroup === MetricGroupEnum.Hour) return acc

    acc[metricGroup] = {
      data: [],
      value: metricGroup,
      loading: false,
    }

    return acc
  },
  {} as State
)

export const $metric = protocolMetricOverviewDomain
  .createStore(initialState)
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
