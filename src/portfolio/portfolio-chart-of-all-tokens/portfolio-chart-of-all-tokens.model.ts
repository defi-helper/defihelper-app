import { createDomain, restore, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'

const domain = createDomain('portfolioChartOfAllTokens')

const DAYS_LIMIT = 180

const defaultVariables = {
  metric: 'usd',
  group: MetricGroupEnum.Day,
  pagination: {
    limit: DAYS_LIMIT,
  },
  sort: [
    {
      column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
      order: SortOrderEnum.Desc,
    },
  ],
}

const fetchChartDataFx = domain.createEffect({
  name: 'fetchChartDataFx',
  handler: async (params: string[]) => {
    const result = params.map(async (param) => {
      const data = await portfolioApi.getTokenMetricChart({
        ...defaultVariables,
        ...(param === 'stable' || param === 'shit'
          ? {
              filter: {
                tokenAlias: {
                  stable: param === 'stable',
                },
                dateBefore: dateUtils.now(),
                dateAfter: dateUtils.after180Days(),
              },
            }
          : {}),
      })

      return { name: param, data }
    })

    const sortedData = (await Promise.all(result)).sort(
      (a, b) => a.data.length - b.data.length
    )

    const lastItem = sortedData[sortedData.length - 1]
    const secondItem = sortedData[sortedData.length - 2]
    const firstItem = sortedData[0]

    return lastItem.data.map((dataItem, index) => ({
      [lastItem.name]: bignumberUtils.format(dataItem.sum),
      [firstItem.name]: bignumberUtils.format(firstItem.data[index]?.sum),
      [secondItem.name]: bignumberUtils.format(secondItem.data[index]?.sum),
      date: dataItem.date,
    }))
  },
})

export const $portfolioChartOfAllTokens = restore(fetchChartDataFx.doneData, [])

export const PortfolioChartOfAllTokensGate = createGate<string[]>({
  name: 'PortfolioChartOfAllTokensGate',
  domain,
})

sample({
  clock: PortfolioChartOfAllTokensGate.open,
  target: fetchChartDataFx,
})
