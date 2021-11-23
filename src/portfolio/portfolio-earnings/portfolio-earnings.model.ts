import { createDomain } from 'effector-logger/macro'
import { bignumberUtils } from '~/common/bignumber-utils'

import { MetricGroupEnum } from '~/graphql/_generated-types'
import { portfolioApi } from '../common'

const portfolioEarnings = createDomain()

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: Record<string, string>[]
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>

type Gate = {
  group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  balance: number
  apy: number
}

type EastimatedEarnings = {
  hold: string
  autostaking: string
  date: number
}

export const fetchChartDataFx = portfolioEarnings.createEffect(
  async (params: Gate) => {
    const data = await portfolioApi.earnings({
      balance: params.balance,
      apy: params.apy,
    })

    if (!data) throw new Error('something went wrong')

    return data.everyDay
      .reduce<EastimatedEarnings[]>((acc, everyDayItem, index) => {
        const date = new Date()

        return [
          ...acc,
          {
            hold: bignumberUtils.format(data?.hold[index]?.v ?? 0),
            autostaking: bignumberUtils.format(data?.optimal[index]?.v ?? 0),
            date: date.setDate(date.getDate() + everyDayItem.t),
          },
        ]
      }, [])
      .slice(0, 3)
  }
)

export const $portfolioEarnings = portfolioEarnings
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
