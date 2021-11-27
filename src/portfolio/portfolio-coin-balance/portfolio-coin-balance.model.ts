import { createDomain } from 'effector-logger/macro'

import { BigNumber } from 'bignumber.js'
import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'

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

    return stableCoins.map((stableCoin, index) => ({
      stableCoin: new BigNumber(stableCoin.sum).toFixed(0),
      date: stableCoin.date,
      altCoin: new BigNumber(altCoins?.[index]?.sum).toFixed(0),
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
