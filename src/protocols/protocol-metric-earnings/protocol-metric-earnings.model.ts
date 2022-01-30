import { createDomain, UnitValue } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { EastimatedEarnings, protocolsApi, State } from '~/protocols/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { mergeChartData } from '~/common/merge-chart-data'
import { CHART_GROUP_VALUES, CHART_DAYS_LIMITS } from '~/common/chart'

const protocolMetricEarningsDomain = createDomain()

export const fetchEarningMetricFx = protocolMetricEarningsDomain.createEffect(
  async (params: { balance: number; apy: number }) => {
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
            hold: bignumberUtils.floor(hold?.v ?? 0),
            autostaking: bignumberUtils.floor(optimal?.v ?? 0),
            holdFormat: bignumberUtils.format(hold?.v ?? 0),
            autostakingFormat: bignumberUtils.format(optimal?.v ?? 0),
            date: date.setDate(date.getDate() + everyDayItem.t),
          },
        ]
      }, [])
      .slice(0, 3)
  }
)

export const $earningsMetric = protocolMetricEarningsDomain
  .createStore<UnitValue<typeof fetchEarningMetricFx.doneData>>([])
  .on(fetchEarningMetricFx.doneData, (_, payload) => payload)

export const fetchStakedMetricFx = protocolMetricEarningsDomain.createEffect(
  async (params: { group: string; contracts: string[] }) => {
    const data = await protocolsApi.protocolStaked({
      contract: params.contracts,
      group:
        params.group === CHART_GROUP_VALUES.day
          ? MetricGroupEnum.Hour
          : MetricGroupEnum.Day,
      dateBefore: dateUtils.now(),
      dateAfter: dateUtils.addDate(
        -CHART_DAYS_LIMITS[params.group],
        params.group === CHART_GROUP_VALUES.day ? 'hours' : 'days'
      ),
      pagination: {
        limit: CHART_DAYS_LIMITS[params.group],
      },
    })

    return mergeChartData(data).map((item) => ({
      altCoin: bignumberUtils.floor(item.altCoin),
      date: dateUtils.toDate(item.date),
      stableCoin: bignumberUtils.floor(item.stableCoin),
      altCoinFormat: bignumberUtils.format(item.altCoin),
      stableCoinFormat: bignumberUtils.format(item.stableCoin),
    }))
  }
)

export const $stakedMetric = protocolMetricEarningsDomain
  .createStore(
    Object.values(CHART_GROUP_VALUES).reduce<
      State<UnitValue<typeof fetchStakedMetricFx.doneData>>
    >((acc, metricGroup) => {
      acc[metricGroup] = {
        data: [],
        value: metricGroup,
        loading: false,
      }

      return acc
    }, {} as State<UnitValue<typeof fetchStakedMetricFx.doneData>>)
  )
  .on(fetchStakedMetricFx, (state, payload) => ({
    ...state,
    [payload.group]: {
      ...state[payload.group],
      loading: true,
    },
  }))
  .on(fetchStakedMetricFx.done, (state, { params, result }) => ({
    ...state,
    [params.group]: {
      ...state[params.group],
      data: result,
      loading: false,
    },
  }))

export const reset = protocolMetricEarningsDomain.createEvent()

$stakedMetric.reset(reset)
$earningsMetric.reset(reset)
