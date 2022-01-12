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

const DAYS_LIMIT = 180

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

type Params = Exclude<MetricGroupEnum, MetricGroupEnum.Year>

export const fetchChartDataFx = portfolioCoinBalance.createEffect(
  async (params: Params) => {
    const result = await portfolioApi.getTokenMetricChart({
      group: params,
      ...defaultVariables,
      dateBefore: dateUtils.now(),
      dateAfter: dateUtils.after180Days(),
    })

    const stableCoins = result?.stableCoins ?? []
    const altCoins = result?.altCoins ?? []

    return stableCoins.map((stableCoin, index) => ({
      stableCoin: bignumberUtils.floor(stableCoin.sum),
      date: stableCoin.date,
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
    MetricGroupEnum.Hour
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

$portfolioCoinBalance.reset(authModel.logoutFx.finally)
$currentGroup.reset(authModel.logoutFx.finally)
