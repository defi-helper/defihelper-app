import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'

const portfolioChartOfAllTokens = createDomain()

const DAYS_LIMIT = 180

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: Record<string, string>[]
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>

const defaultVariables = {
  metric: 'usd',
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

type Gate = {
  tokens: string[]
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
}

const fetchChartDataFx = portfolioChartOfAllTokens.createEffect(
  async (params: Gate) => {
    const result = params.tokens.map(async (param) => {
      const data = await portfolioApi.getTokenMetricChart({
        group: params.group,
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
  }
)

export const $portfolioChartOfAllTokens = portfolioChartOfAllTokens
  .createStore(
    Object.values(MetricGroupEnum).reduce<State>((acc, metricGroup) => {
      if (metricGroup === MetricGroupEnum.Hour) return acc

      acc[metricGroup] = {
        data: [],
        value: metricGroup,
        loading: false,
      }

      return acc
    }, {} as State)
  )
  .on(fetchChartDataFx, (state, payload) => {
    return {
      ...state,
      [payload.group]: {
        ...state[payload.group],
        loading: true,
      },
    }
  })
  .on(fetchChartDataFx.done, (state, { params, result }) => {
    return {
      ...state,
      [params.group]: {
        ...state[params.group],
        loading: false,
        data: result,
      },
    }
  })

export const PortfolioChartOfAllTokensGate = createGate<Gate>({
  name: 'PortfolioChartOfAllTokensGate',
  domain: portfolioChartOfAllTokens,
})

sample({
  clock: PortfolioChartOfAllTokensGate.open,
  target: fetchChartDataFx,
})
