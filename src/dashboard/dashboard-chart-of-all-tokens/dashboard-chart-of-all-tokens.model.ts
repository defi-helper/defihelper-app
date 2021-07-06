import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { dashboardApi } from '~/dashboard/common'
import {
  MetricChartType,
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum
} from '~/graphql/_generated-types'

const domain = createDomain('dashboardChartOfAllTokens')

type FetchChartParams = {
  stable?: boolean
  id: string
}

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
                stable: params.stable
              }
            }
          }
        : {}),
      sort: [
        {
          column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
          order: SortOrderEnum.Desc
        }
      ]
    })

    return {
      id: params.id,
      data
    }
  }
})

export const $dashboardChartOfAllTokens = domain
  .createStore<Record<string, Array<Pick<MetricChartType, 'sum' | 'date'>>>>(
    {},
    {
      name: '$dashboardChartOfAllTokens'
    }
  )
  .on(fetchChartDataFx.doneData, (state, payload) => ({
    ...state,
    [payload.id]: payload.data
  }))

export const dashboardChartOfAllTokensGate = createGate<FetchChartParams>({
  name: 'dashboardChartOfAllTokensGate',
  domain
})

sample({
  clock: dashboardChartOfAllTokensGate.open,
  target: fetchChartDataFx
})
