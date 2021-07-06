import { createDomain, sample } from 'effector-logger'
import { createGate } from 'effector-react'

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
      blockchainGroup: MetricGroupEnum.Day,
      blockchainPagination: pagination,
      blockchainSort: {
        ...sort,
        column: UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum.Date
      },
      blockchainWalletGroup: MetricGroupEnum.Day,
      blockchainWalletMetric: 'usd',
      blockchainWalletPagination: pagination,
      blockchainWalletSort: {
        ...sort,
        column: WalletTokenMetricChartSortInputTypeColumnEnum.Date
      }
    })
  }
})

type ExtractTypeFromPromise<T> = T extends Promise<infer Y> ? Y : never

export const $blockchains = domain
  .createStore<
    ExtractTypeFromPromise<ReturnType<typeof dashboardApi.getBlockchains>>
  >([], {
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
