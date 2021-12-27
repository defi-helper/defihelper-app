import { createDomain, sample } from 'effector-logger/macro'
import { BigNumber } from 'bignumber.js'

import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'
import * as portfolioMetricCardModel from '~/portfolio/portfolio-metric-cards/portfolio-metric-cards.model'

const portfolioEarnings = createDomain()

type EastimatedEarnings = {
  hold: string
  autostaking: string
  date: number
}

type State = {
  data: EastimatedEarnings[]
  loading: boolean
}

type Params = {
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  balance: number
  apy: number
}

export const fetchChartDataFx = portfolioEarnings.createEffect(
  async (params: Params) => {
    const data = await protocolsApi.earnings({
      balance: params.balance,
      apy: params.apy,
    })

    if (!data) throw new Error('something went wrong')

    return data.everyDay
      .reduce<EastimatedEarnings[]>((acc, everyDayItem) => {
        const date = new Date()

        const hold = data.hold.find(({ t }) => everyDayItem.t === t)
        const optimal = data.optimal.find(({ t }) => everyDayItem.t === t)

        if (optimal && optimal.v > 10000000) {
          optimal.v = 10000000
        }

        return [
          ...acc,
          {
            hold: new BigNumber(hold?.v ?? 0).toFixed(0),
            autostaking: new BigNumber(optimal?.v ?? 0).toFixed(0),
            date: date.setDate(date.getDate() + everyDayItem.t),
          },
        ]
      }, [])
      .slice(0, 4)
  }
)

export const $portfolioEarnings = portfolioEarnings
  .createStore(
    Object.values(MetricGroupEnum).reduce<State>((acc, metricGroup) => {
      if (metricGroup === MetricGroupEnum.Hour) return acc

      return {
        data: [],
        loading: false,
      }
    }, {} as State)
  )
  .on(fetchChartDataFx, (state) => {
    return {
      ...state,
      loading: true,
    }
  })
  .on(fetchChartDataFx.doneData, (state, payload) => {
    return {
      ...state,
      loading: false,
      data: payload,
    }
  })

sample({
  clock: portfolioMetricCardModel.$metric.updates,
  fn: (metric): Params => ({
    group: MetricGroupEnum.Day,
    balance: Number(metric?.worth ?? 0),
    apy: Number(metric?.apy ?? 0),
  }),
  target: fetchChartDataFx,
})
