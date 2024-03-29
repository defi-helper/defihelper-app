import { createDomain, UnitValue } from 'effector'

import { dateUtils } from '~/common/date-utils'
import { MetricGroupEnum } from '~/api/_generated-types'
import { protocolsApi, State } from '~/protocols/common'
import { bignumberUtils } from '~/common/bignumber-utils'
import { mergeChartData } from '~/common/merge-chart-data'
import { CHART_GROUP_VALUES, CHART_DAYS_LIMITS } from '~/common/chart'

const protocolCoinBalanceDomain = createDomain()

export const fetchStakedMetricFx = protocolCoinBalanceDomain.createEffect(
  async (params: { group: string; contracts: string[] }) => {
    const data = await protocolsApi.protocolStaked({
      contract: params.contracts,
      group: MetricGroupEnum.Day,
      dateBefore: dateUtils.yesterday(),
      dateAfter: dateUtils.addDate(-CHART_DAYS_LIMITS[params.group], 'days'),
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

export const $stakedMetric = protocolCoinBalanceDomain
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

export const reset = protocolCoinBalanceDomain.createEvent()

$stakedMetric.reset(reset)
