import { createDomain, UnitValue } from 'effector-logger/macro'
import omit from 'lodash.omit'

import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'
import { mergeChartData } from '~/common/merge-chart-data'
import { CHART_GROUP_VALUES, CHART_DAYS_LIMITS } from '~/common/chart'

const portfolioCoinBalance = createDomain()

const defaultVariables = {
  metric: 'usd',
  sort: [
    {
      column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
      order: SortOrderEnum.Desc,
    },
  ],
}

export const fetchChartDataFx = portfolioCoinBalance.createEffect(
  async (params: string) => {
    const result = await portfolioApi.getTokenMetricChart({
      group:
        params === CHART_GROUP_VALUES.day
          ? MetricGroupEnum.Hour
          : MetricGroupEnum.Day,
      ...defaultVariables,
      dateBefore:
        params === CHART_GROUP_VALUES.day
          ? dateUtils.now()
          : dateUtils.yesterday(),
      dateAfter: dateUtils.addDate(
        -CHART_DAYS_LIMITS[params],
        params === CHART_GROUP_VALUES.day ? 'hours' : 'days'
      ),
      pagination: {
        limit: CHART_DAYS_LIMITS[params],
      },
    })

    return mergeChartData(omit(result ?? {}, '__typename')).map((item) => ({
      stableCoin: bignumberUtils.floor(item.stableCoin),
      date: dateUtils.toDate(item.date),
      altCoin: bignumberUtils.floor(item.altCoin),
      altCoinFormat: bignumberUtils.format(item.altCoin),
      stableCoinFormat: bignumberUtils.format(item.stableCoin),
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

export const changeGroup = portfolioCoinBalance.createEvent<string>()

export const $currentGroup = portfolioCoinBalance
  .createStore<string>(CHART_GROUP_VALUES.month)
  .on(changeGroup, (_, payload) => payload)

export const $portfolioCoinBalance = portfolioCoinBalance
  .createStore(
    Object.values(CHART_GROUP_VALUES).reduce<State>((acc, metricGroup) => {
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
      [payload]: {
        ...state[payload],
        loading: true,
      },
    }
  })
  .on(fetchChartDataFx.done, (state, { params, result }) => {
    return {
      ...state,
      [params]: {
        ...state[params],
        loading: false,
        data: result,
      },
    }
  })

export const reset = portfolioCoinBalance.createEvent()

$portfolioCoinBalance.reset(authModel.logoutFx.done)
$currentGroup.reset(authModel.logoutFx.done, reset)
