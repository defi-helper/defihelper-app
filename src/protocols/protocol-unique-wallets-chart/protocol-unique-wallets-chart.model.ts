import { createDomain, UnitValue } from 'effector'

import { dateUtils } from '~/common/date-utils'
import { MetricGroupEnum } from '~/api/_generated-types'
import { protocolsApi } from '~/protocols/common'

const protocolMetricOverviewDomain = createDomain()

const DAYS_LIMITS = {
  [MetricGroupEnum.Hour]: 7,
  [MetricGroupEnum.Day]: 30,
  [MetricGroupEnum.Week]: 90,
  [MetricGroupEnum.Month]: 180,
} as const

export const fetchMetricFx = protocolMetricOverviewDomain.createEffect(
  async (params: { protocolId: string }) => {
    const data = await protocolsApi.protocolUniqueWallets({
      filter: {
        id: params.protocolId,
      },
      metricGroup: MetricGroupEnum.Day,
      metricFilter: {
        dateBefore: dateUtils.yesterday(),
        dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[MetricGroupEnum.Day]),
      },
      metricPagination: {
        limit: DAYS_LIMITS[MetricGroupEnum.Day],
      },
    })

    return data
  }
)

export const reset = protocolMetricOverviewDomain.createEvent()

export const $metric = protocolMetricOverviewDomain
  .createStore<UnitValue<typeof fetchMetricFx.doneData>>([])
  .on(fetchMetricFx.doneData, (_, payload) => payload)
  .reset(reset)
