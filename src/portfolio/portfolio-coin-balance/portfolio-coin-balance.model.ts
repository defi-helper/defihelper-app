import { createDomain } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { bignumberUtils } from '~/common/bignumber-utils'

const portfolioCoinBalance = createDomain()

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
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
}

export const fetchChartDataFx = portfolioCoinBalance.createEffect(
  async (params: Gate) => {
    const result = await portfolioApi.getTokenMetricChart({
      group: params.group,
      ...defaultVariables,
      dateBefore: dateUtils.now(),
      dateAfter: dateUtils.after180Days(),
    })

    const stableCoins = result?.stableCoins ?? []
    const altCoins = result?.altCoins ?? []

    if (stableCoins.length > altCoins.length) {
      return stableCoins.map((stableCoin, index) => ({
        stableCoin: bignumberUtils.format(stableCoin.sum),
        date: stableCoin.date,
        altCoin: bignumberUtils.format(altCoins?.[index]?.sum),
      }))
    }

    return altCoins?.map((altCoin, index) => ({
      altCoin: bignumberUtils.format(altCoin.sum),
      date: altCoin.date,
      stableCoin: bignumberUtils.format(stableCoins?.[index]?.sum),
    }))
  }
)

export const $portfolioCoinBalance = portfolioCoinBalance
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
