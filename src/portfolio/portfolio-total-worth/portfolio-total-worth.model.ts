import { createDomain } from 'effector-logger/macro'
import omit from 'lodash.omit'

import { authModel } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'
import { dateUtils } from '~/common/date-utils'
import { mergeChartData } from '~/common/merge-chart-data'
import {
  MetricGroupEnum,
  SortOrderEnum,
  TokenMetricQueryVariables,
  UserMetricChartSortInputTypeColumnEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { portfolioApi } from '../common'

const portfolioTotalWorth = createDomain()

const DAYS_LIMITS = {
  [MetricGroupEnum.Hour]: 7,
  [MetricGroupEnum.Day]: 30,
  [MetricGroupEnum.Week]: 90,
  [MetricGroupEnum.Month]: 180,
} as const

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Year>,
  {
    data: Record<string, string>[]
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
    loading: boolean
  }
>

const defaultVariables: TokenMetricQueryVariables = {
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
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
}

export const fetchChartDataFx = portfolioTotalWorth.createEffect(
  async (params: Gate) => {
    const data = await portfolioApi.getTokenMetric({
      ...defaultVariables,
      metricDateBefore: dateUtils.now(),
      metricDateAfter: dateUtils.fromNowTo(DAYS_LIMITS[params.group]),
      balancePagination: {
        limit: DAYS_LIMITS[params.group],
      },
      pagination: {
        limit: DAYS_LIMITS[params.group],
      },
      group: params.group,
    })

    if (!data) throw new Error('something went wrong')

    return mergeChartData(omit(data, '__typename')).map((item) => ({
      stakingUSD: item.stakingUSD,
      balance: item.balanceUSD,
      earned: item.earnedUSD,
      date: dateUtils.toDate(item.date),
      stakingUSDFormat: bignumberUtils.format(item.stakingUSD),
      balanceFormat: bignumberUtils.format(item.balanceUSD),
      earnedFormat: bignumberUtils.format(item.earnedUSD),
    }))
  }
)

export const $portfolioTotalWorth = portfolioTotalWorth
  .createStore(
    Object.values(MetricGroupEnum).reduce<State>((acc, metricGroup) => {
      if (metricGroup === MetricGroupEnum.Year) return acc

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
  .reset(authModel.logoutFx.finally)
