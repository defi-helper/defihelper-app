import { createDomain, UnitValue } from 'effector'
import omit from 'lodash.omit'

import { authModel } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'
import { CHART_GROUP_VALUES, CHART_DAYS_LIMITS } from '~/common/chart'
import { dateUtils } from '~/common/date-utils'
import { mergeChartData } from '~/common/merge-chart-data'
import {
  MetricGroupEnum,
  SortOrderEnum,
  TokenMetricQueryVariables,
  UserMetricChartSortInputTypeColumnEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/api/_generated-types'
import { portfolioApi } from '../common'

const portfolioTotalWorth = createDomain()

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

export const fetchChartDataFx = portfolioTotalWorth.createEffect(
  async (params: { group: string }) => {
    const data = await portfolioApi.getTokenMetric({
      ...defaultVariables,
      metricDateBefore: dateUtils.yesterday(),
      metricDateAfter: dateUtils.addDate(
        -CHART_DAYS_LIMITS[params.group],
        'days'
      ),
      balancePagination: {
        limit: CHART_DAYS_LIMITS[params.group],
      },
      pagination: {
        limit: CHART_DAYS_LIMITS[params.group],
      },
      group: MetricGroupEnum.Day,
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

type State = Record<
  string,
  {
    data: UnitValue<typeof fetchChartDataFx.doneData>
    value: string
    loading: boolean
  }
>

export const $portfolioTotalWorth = portfolioTotalWorth
  .createStore(
    Object.values(CHART_GROUP_VALUES).reduce((acc, metricGroup) => {
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
  .reset(authModel.logoutFx)
