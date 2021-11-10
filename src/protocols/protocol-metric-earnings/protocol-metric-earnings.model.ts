import { createDomain } from 'effector-logger/macro'

import { bignumberUtils } from '~/common/bignumber-utils'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

type ChartData = {
  hold: string
  autostaking: string
  date: number
}

type State = Record<
  Exclude<MetricGroupEnum, MetricGroupEnum.Hour>,
  {
    data: ChartData[]
    value: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
    loading: boolean
  }
>

const protocolMetricEarningsDomain = createDomain()

export const fetchMetricFx = protocolMetricEarningsDomain.createEffect(
  async (params: {
    balance: number
    apy: number
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Hour>
  }) => {
    const data = await protocolsApi.protocolEstimated({
      balance: params.balance,
      apy: params.apy,
    })

    if (!data) throw new Error('something went wrong')

    return {
      group: params.group,
      data: data.everyDay.reduce<ChartData[]>((acc, everyDayItem, index) => {
        return [
          ...acc,
          {
            hold: bignumberUtils.format(data?.hold[index]?.v ?? 0),
            autostaking: bignumberUtils.format(data?.optimal[index]?.v ?? 0),
            date: everyDayItem.t,
          },
        ]
      }, []),
    }
  }
)

const initialState = Object.values(MetricGroupEnum).reduce<State>(
  (acc, metricGroup) => {
    if (metricGroup === MetricGroupEnum.Hour) return acc

    acc[metricGroup] = {
      data: [],
      value: metricGroup,
      loading: false,
    }

    return acc
  },
  {} as State
)

export const $metric = protocolMetricEarningsDomain
  .createStore(initialState)
  .on(fetchMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true,
    },
  }))
  .on(fetchMetricFx.doneData, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      data: payload.data,
      loading: false,
    },
  }))
