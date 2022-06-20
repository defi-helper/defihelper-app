import { createDomain, UnitValue } from 'effector'

import { EastimatedEarnings, protocolsApi } from '~/protocols/common'
import { bignumberUtils } from '~/common/bignumber-utils'

const estimatedChartDomain = createDomain()

export const fetchEarningMetricFx = estimatedChartDomain.createEffect(
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

export const $earningsMetric = estimatedChartDomain
  .createStore<UnitValue<typeof fetchEarningMetricFx.doneData>>([])
  .on(fetchEarningMetricFx.doneData, (_, payload) => payload)

export const reset = estimatedChartDomain.createEvent()

$earningsMetric.reset(reset)
