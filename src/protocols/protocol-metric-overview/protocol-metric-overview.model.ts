import { createDomain } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { Unwrap } from '~/common/types'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Year>,
  {
    data: {
      tvl: Unwrap<ReturnType<typeof protocolsApi.protocolDetailMetric>>
      tvlDebank: Unwrap<ReturnType<typeof protocolsApi.protocolDetailMetric>>
      uniqueWalletsCount: Unwrap<
        ReturnType<typeof protocolsApi.protocolDetailMetric>
      >
    }
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
    loading: boolean
  }
>

const protocolMetricOverviewDomain = createDomain()

const DAYS_LIMITS = {
  [MetricGroupEnum.Hour]: 7,
  [MetricGroupEnum.Day]: 30,
  [MetricGroupEnum.Week]: 90,
  [MetricGroupEnum.Month]: 180,
} as const

export const fetchMetricFx = protocolMetricOverviewDomain.createEffect(
  async (params: {
    protocolId: string
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
  }) => {
    const data = await protocolsApi.protocolOverviewMetric({
      filter: {
        id: params.protocolId,
      },
      metricGroup: params.group,
      metricFilter: {
        dateBefore: dateUtils.now(),
        dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[params.group]),
      },
      metricPagination: {
        limit: DAYS_LIMITS[params.group],
      },

      metricDebankFilter: {
        dateBefore: dateUtils.now(),
        dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[params.group]),
      },

      metricDebankPagination: {
        limit: DAYS_LIMITS[params.group],
      },
    })

    return {
      group: params.group,
      data,
    }
  }
)

const initialState = Object.values(MetricGroupEnum).reduce<State>(
  (acc, metricGroup) => {
    if (metricGroup === MetricGroupEnum.Year) return acc

    acc[metricGroup] = {
      data: {
        tvl: [],
        tvlDebank: [],
        uniqueWalletsCount: [],
      },
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
