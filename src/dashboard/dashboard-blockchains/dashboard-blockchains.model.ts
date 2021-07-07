import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

import { Unwrap } from '~/common/types'
import { dashboardApi } from '~/dashboard/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum,
  WalletTokenMetricChartSortInputTypeColumnEnum
} from '~/graphql/_generated-types'

const domain = createDomain('blockchains')

type FetchChartParams = {
  stable?: boolean
  id: string
}

const fetchBlockchainsDataFx = domain.createEffect({
  name: 'fetchBlockchainsDataFx',
  handler: async () => {
    const pagination = {
      limit: 1
    }
    const sort = {
      order: SortOrderEnum.Desc
    }

    return dashboardApi.getBlockchains({
      blockchainMetric: 'usd',
      blockchainGroup: MetricGroupEnum.Hour,
      blockchainPagination: pagination,
      blockchainSort: {
        ...sort,
        column: UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum.Date
      },
      blockchainWalletGroup: MetricGroupEnum.Hour,
      blockchainWalletMetric: 'usd',
      blockchainWalletPagination: pagination,
      blockchainWalletSort: {
        ...sort,
        column: WalletTokenMetricChartSortInputTypeColumnEnum.Date
      }
    })
  }
})

export const $blockchains = domain
  .createStore<Unwrap<ReturnType<typeof dashboardApi.getBlockchains>>>([], {
    name: '$dashboardChartOfAllTokens'
  })
  .on(fetchBlockchainsDataFx.doneData, (_, payload) => payload)

export const blockchainsGate = createGate<FetchChartParams>({
  name: 'blockchainsGate',
  domain
})

sample({
  clock: blockchainsGate.open,
  target: fetchBlockchainsDataFx
})
