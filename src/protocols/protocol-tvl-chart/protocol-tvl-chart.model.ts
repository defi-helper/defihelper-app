import { createDomain, UnitValue } from 'effector-logger/macro'

import { dateUtils } from '~/common/date-utils'
import { MetricGroupEnum } from '~/graphql/_generated-types'
import { protocolsApi } from '~/protocols/common'

const protocolTvlDomain = createDomain()

const DAYS_LIMITS = {
  [MetricGroupEnum.Hour]: 7,
  [MetricGroupEnum.Day]: 30,
  [MetricGroupEnum.Week]: 90,
  [MetricGroupEnum.Month]: 180,
} as const

export const fetchMetricFx = protocolTvlDomain.createEffect(
  async (params: { protocolId: string }) => {
    const data = await protocolsApi.protocolTvl({
      filter: {
        id: params.protocolId,
      },
      metricGroup: MetricGroupEnum.Day,
      metricFilter: {
        dateBefore: dateUtils.now(),
        dateAfter: dateUtils.fromNowTo(DAYS_LIMITS[MetricGroupEnum.Day]),
      },
      metricPagination: {
        limit: DAYS_LIMITS[MetricGroupEnum.Day],
      },
    })

    return data
  }
)

export const $metric = protocolTvlDomain
  .createStore<UnitValue<typeof fetchMetricFx.doneData>>([])
  .on(fetchMetricFx.doneData, (_, payload) => payload)