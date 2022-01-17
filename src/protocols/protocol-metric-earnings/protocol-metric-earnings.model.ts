import { createDomain } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import {
  EastimatedEarnings,
  protocolsApi,
  StakedBalance,
  State,
} from '~/protocols/common'
import { bignumberUtils } from '~/common/bignumber-utils'

const DAYS_LIMITS = {
  [MetricGroupEnum.Hour]: 7,
  [MetricGroupEnum.Day]: 30,
  [MetricGroupEnum.Week]: 90,
  [MetricGroupEnum.Month]: 180,
} as const

const protocolMetricEarningsDomain = createDomain()

export const fetchEarningMetricFx = protocolMetricEarningsDomain.createEffect(
  async (params: {
    balance: number
    apy: number
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
  }) => {
    const data = await protocolsApi.earnings({
      balance: params.balance,
      apy: params.apy,
    })

    if (!data) throw new Error('something went wrong')

    return {
      group: params.group,
      data: data.everyDay
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
              hold: bignumberUtils.floor(hold?.v ?? 0),
              autostaking: bignumberUtils.floor(optimal?.v ?? 0),
              date: date.setDate(date.getDate() + everyDayItem.t),
            },
          ]
        }, [])
        .slice(0, 3),
    }
  }
)

export const $earningsMetric = protocolMetricEarningsDomain
  .createStore(
    Object.values(MetricGroupEnum).reduce<State<EastimatedEarnings[]>>(
      (acc, metricGroup) => {
        if (metricGroup === MetricGroupEnum.Year) return acc

        acc[metricGroup] = {
          data: [],
          value: metricGroup,
          loading: false,
        }

        return acc
      },
      {} as State<EastimatedEarnings[]>
    )
  )
  .on(fetchEarningMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true,
    },
  }))
  .on(fetchEarningMetricFx.doneData, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      data: payload.data,
      loading: false,
    },
  }))

export const fetchStakedMetricFx = protocolMetricEarningsDomain.createEffect(
  async (params: {
    group: Exclude<MetricGroupEnum, MetricGroupEnum.Year>
    contracts: string[]
  }) => {
    const data = await protocolsApi.protocolStaked({
      contract: params.contracts,
      group: params.group,
      dateBefore: dateUtils.now(),
      dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[params.group]),
      pagination: {
        limit: DAYS_LIMITS[params.group],
      },
    })

    if (!data) throw new Error('something went wrong')

    return {
      group: params.group,
      data: data.altCoins?.map((altCoin, index) => ({
        altCoin: bignumberUtils.floor(altCoin.sum),
        date: altCoin.date,
        stableCoin: bignumberUtils.floor(data.stableCoins?.[index]?.sum),
        altCoinFormat: bignumberUtils.format(altCoin.sum),
        stableCoinFormat: bignumberUtils.format(data.stableCoins?.[index]?.sum),
      })),
    }
  }
)

export const $stakedMetric = protocolMetricEarningsDomain
  .createStore(
    Object.values(MetricGroupEnum).reduce<State<StakedBalance[]>>(
      (acc, metricGroup) => {
        if (metricGroup === MetricGroupEnum.Year) return acc

        acc[metricGroup] = {
          data: [],
          value: metricGroup,
          loading: false,
        }

        return acc
      },
      {} as State<StakedBalance[]>
    )
  )
  .on(fetchStakedMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true,
    },
  }))
  .on(fetchStakedMetricFx.doneData, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      data: payload.data,
      loading: false,
    },
  }))
