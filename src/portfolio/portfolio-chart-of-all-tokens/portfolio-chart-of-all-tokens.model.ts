import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { dateUtils } from '~/common/date-utils'
import { Unwrap } from '~/common/types'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'

const domain = createDomain('portfolioChartOfAllTokens')

type FetchChartParams = {
  stable?: boolean
  id: string
}

const DAYS_LIMIT = 180

const fetchChartDataFx = domain.createEffect({
  name: 'fetchChartDataFx',
  handler: async (params: FetchChartParams) => {
    const data = await portfolioApi.getTokenMetricChart({
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

type ChartMetric = Unwrap<ReturnType<typeof portfolioApi.getTokenMetricChart>>

export const $portfolioChartOfAllTokens = domain
  .createStore<Record<string, ChartMetric>>(
    {},
    {
      name: '$portfolioChartOfAllTokens',
    }
  )
  .on(fetchChartDataFx.doneData, (state, payload) => ({
    ...state,
    [payload.id]: payload.data,
  }))

export const PortfolioChartOfAllTokensGate = createGate<FetchChartParams>({
  name: 'PortfolioChartOfAllTokensGate',
  domain,
})

sample({
  clock: PortfolioChartOfAllTokensGate.open,
  target: fetchChartDataFx,
})
