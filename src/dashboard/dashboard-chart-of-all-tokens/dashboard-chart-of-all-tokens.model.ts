import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'
import { dateUtils } from '~/common/date-utils'

import { Unwrap } from '~/common/types'
import { dashboardApi } from '~/dashboard/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'

const domain = createDomain('dashboardChartOfAllTokens')

type FetchChartParams = {
  stable?: boolean
  id: string
}

const DAYS_LIMIT = 180

const fetchChartDataFx = domain.createEffect({
  name: 'fetchChartDataFx',
  handler: async (params: FetchChartParams) => {
    const data = await dashboardApi.getTokenMetricChart({
      metric: 'usd',
      group: MetricGroupEnum.Day,
      ...(typeof params.stable === 'boolean'
        ? {
            filter: {
              tokenAlias: {
                stable: params.stable,
              },
              dateBefore: dateUtils.now(),
              dateAfter: dateUtils.after180Days(),
            },
          }
        : {}),
      pagination: {
        limit: DAYS_LIMIT,
      },
      sort: [
        {
          column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
          order: SortOrderEnum.Desc,
        },
      ],
    })

    return {
      id: params.id,
      data,
    }
  },
})

type ChartMetric = Unwrap<ReturnType<typeof dashboardApi.getTokenMetricChart>>

export const $dashboardChartOfAllTokens = domain
  .createStore<Record<string, ChartMetric>>(
    {},
    {
      name: '$dashboardChartOfAllTokens',
    }
  )
  .on(fetchChartDataFx.doneData, (state, payload) => ({
    ...state,
    [payload.id]: payload.data,
  }))

export const dashboardChartOfAllTokensGate = createGate<FetchChartParams>({
  name: 'dashboardChartOfAllTokensGate',
  domain,
})

sample({
  clock: dashboardChartOfAllTokensGate.open,
  target: fetchChartDataFx,
})
