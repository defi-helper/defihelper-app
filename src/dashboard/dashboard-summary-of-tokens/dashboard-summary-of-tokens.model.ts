import { combine, createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import {
  MetricGroupEnum,
  SortOrderEnum,
  TokenMetricChartQueryVariables,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { dashboardApi } from '~/dashboard/common'
import { Unwrap } from '~/common/types'

const domain = createDomain('dashboardSummaryOfTokens')

const summaryOfTokensForLastHourVariables = {
  group: MetricGroupEnum.Hour,
  pagination: {
    limit: 1,
  },
}

const summaryOfTokensForLastHourForYesterdayVariables = {
  group: MetricGroupEnum.Day,
  pagination: {
    limit: 2,
    offset: 1,
  },
}

const createGetTokenMetricEffect = (
  name: string,
  variables: Pick<TokenMetricChartQueryVariables, 'group' | 'pagination'>
) => {
  return domain.createEffect({
    name,
    handler: async () =>
      dashboardApi.getTokenMetricChart({
        metric: 'usd',
        ...variables,
        sort: [
          {
            column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
            order: SortOrderEnum.Desc,
          },
        ],
      }),
  })
}

export const fetchSummaryOfTokensForLastHourFx = createGetTokenMetricEffect(
  'fetchSummaryOfTokensForLastHour',
  summaryOfTokensForLastHourVariables
)

export const fetchSummaryOfTokensForLastHourForYesterdayFx =
  createGetTokenMetricEffect(
    'summaryOfTokensForLastHourForYesterday',
    summaryOfTokensForLastHourForYesterdayVariables
  )

type SummaryOfTokens = Unwrap<
  ReturnType<typeof dashboardApi.getTokenMetricChart>
>

const $summaryOfTokensForLastHour = domain
  .createStore<SummaryOfTokens>([], {
    name: 'summaryOfTokensForLastHour',
  })
  .on(fetchSummaryOfTokensForLastHourFx.doneData, (_, payload) => payload)

const $summaryOfTokensForLastHourForYesterday = domain
  .createStore<SummaryOfTokens>([], {
    name: 'summaryOfTokensForLastHourForYesterday',
  })
  .on(
    fetchSummaryOfTokensForLastHourForYesterdayFx.doneData,
    (_, payload) => payload
  )

export const dashboardSummaryOfTokensGate = createGate({
  name: 'dashboardSummaryOfTokensGate',
  domain,
})

export const $dashboardSummaryOfTokens = combine(
  $summaryOfTokensForLastHour,
  $summaryOfTokensForLastHourForYesterday,
  (summaryOfTokensForLastHour, summaryOfTokensForLastHourForYesterday) => {
    const sumOfTokensForLastHour = summaryOfTokensForLastHour.reduce(
      (acc, { sum }) => acc + Number(sum),
      0
    )

    const sumOfTokensForLastHourYesterday =
      summaryOfTokensForLastHourForYesterday.reduce(
        (acc, { sum }) => acc + Number(sum),
        0
      )

    const summaryDiffOfYesterday =
      sumOfTokensForLastHour - sumOfTokensForLastHourYesterday

    return {
      summaryOfTokensForLastHour: sumOfTokensForLastHour,
      summaryOfTokensForLastHourForYesterday: sumOfTokensForLastHourYesterday,
      summaryDiffOfYesterday,
      summaryDiffOfYesterdayPercent: summaryDiffOfYesterday * 100,
    }
  }
)

sample({
  clock: dashboardSummaryOfTokensGate.open,
  target: [
    fetchSummaryOfTokensForLastHourFx,
    fetchSummaryOfTokensForLastHourForYesterdayFx,
  ],
})
