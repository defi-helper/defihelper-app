import { createDomain } from 'effector-logger/macro'

import { bignumberUtils } from '~/common/bignumber-utils'

import {
  MetricGroupEnum,
  SortOrderEnum,
  TokenMetricQueryVariables,
  UserMetricChartSortInputTypeColumnEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { portfolioApi } from '../common'

const portfolioTotalWorth = createDomain()

const DAYS_LIMIT = 180

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: Record<string, string>[]
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>

const defaultVariables: TokenMetricQueryVariables = {
  balancePagination: {
    limit: DAYS_LIMIT,
  },
  pagination: {
    limit: DAYS_LIMIT,
  },
  balanceSort: [
    {
      column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
      order: SortOrderEnum.Desc,
    },
  ],
  sort: [
    {
      column: UserMetricChartSortInputTypeColumnEnum.Date,
      order: SortOrderEnum.Desc,
    },
  ],
}

type Gate = {
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
}

export const fetchChartDataFx = portfolioTotalWorth.createEffect(
  async (params: Gate) => {
    const data = await portfolioApi.getTokenMetric({
      ...defaultVariables,
      group: params.group,
    })

    if (!data) throw new Error('something went wrong')

    return data.totalNetWorth.map((totalNetWorth, index) => ({
      totalNetWorth: bignumberUtils.format(
        bignumberUtils.plus(
          totalNetWorth.sum,
          data.onWallets[index]?.sum ?? '0'
        )
      ),
      balance: data.balanceUSD[index]?.sum ?? '0',
      earned: data.earnedUSD[index]?.sum ?? '0',
      date: totalNetWorth.date,
    }))
  }
)

export const $portfolioTotalWorth = portfolioTotalWorth
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
