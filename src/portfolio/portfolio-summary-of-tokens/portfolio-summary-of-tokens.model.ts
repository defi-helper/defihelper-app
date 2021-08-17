import { combine, createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import {
  MetricGroupEnum,
  SortOrderEnum,
  TokenMetricChartQueryVariables,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { portfolioApi } from '~/portfolio/common'
import { Unwrap } from '~/common/types'

const domain = createDomain('portfolioSummaryOfTokens')

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
      portfolioApi.getTokenMetricChart({
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
  ReturnType<typeof portfolioApi.getTokenMetricChart>
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

export const PortfolioSummaryOfTokensGate = createGate({
  name: 'PortfolioSummaryOfTokensGate',
  domain,
})

export const $portfolioSummaryOfTokens = combine(
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
  clock: PortfolioSummaryOfTokensGate.open,
  target: [
    fetchSummaryOfTokensForLastHourFx,
    fetchSummaryOfTokensForLastHourForYesterdayFx,
  ],
})
