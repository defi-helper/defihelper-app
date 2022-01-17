import { createDomain } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'
import { authModel } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'

const portfolioCoinBalance = createDomain()

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

const defaultVariables = {
  metric: 'usd',
  sort: [
    {
      column: UserTokenMetricChartSortInputTypeColumnEnum.Date,
      order: SortOrderEnum.Desc,
    },
  ],
}

type Params = Exclude<MetricGroupEnum, MetricGroupEnum.Year>

export const fetchChartDataFx = portfolioCoinBalance.createEffect(
  async (params: Params) => {
    const result = await portfolioApi.getTokenMetricChart({
      group: params,
      ...defaultVariables,
      dateBefore: dateUtils.now(),
      dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[params]),
      pagination: {
        limit: DAYS_LIMITS[params],
      },
    })

    const stableCoins = result?.stableCoins ?? []
    const altCoins = result?.altCoins ?? []

    return stableCoins.map((stableCoin, index) => ({
      stableCoin: bignumberUtils.floor(stableCoin.sum),
      date: dateUtils.toDate(stableCoin.date),
      altCoin: bignumberUtils.floor(altCoins?.[index]?.sum),
      altCoinFormat: bignumberUtils.format(altCoins?.[index]?.sum),
      stableCoinFormat: bignumberUtils.format(stableCoin.sum),
    }))
  }
)

export const changeGroup =
  portfolioCoinBalance.createEvent<
    Exclude<MetricGroupEnum, MetricGroupEnum.Year>
  >()

export const $currentGroup = portfolioCoinBalance
  .createStore<Exclude<MetricGroupEnum, MetricGroupEnum.Year>>(
    MetricGroupEnum.Day
  )
  .on(changeGroup, (_, payload) => payload)

export const $portfolioCoinBalance = portfolioCoinBalance
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

$portfolioCoinBalance.reset(authModel.logoutFx.finally)
$currentGroup.reset(authModel.logoutFx.finally, reset)
