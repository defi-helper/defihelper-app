import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { Unwrap } from '~/common/types'
import { portfolioApi } from '~/portfolio/common'
import {
  MetricGroupEnum,
  SortOrderEnum,
  UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum,
  WalletTokenMetricChartSortInputTypeColumnEnum,
} from '~/graphql/_generated-types'

const domain = createDomain('portfolioBlockchains')

type FetchChartParams = {
  stable?: boolean
  id: string
}

const fetchBlockchainsDataFx = domain.createEffect({
  name: 'fetchBlockchainsDataFx',
  handler: async () => {
    const pagination = {
      limit: 1,
    }
    const sort = {
      order: SortOrderEnum.Desc,
    }

    return portfolioApi.getBlockchains({
      blockchainMetric: 'usd',
      blockchainGroup: MetricGroupEnum.Hour,
      blockchainPagination: pagination,
      blockchainSort: {
        ...sort,
        column:
          UserBlockchainWalletTokenMetricChartSortInputTypeColumnEnum.Date,
      },
      blockchainWalletGroup: MetricGroupEnum.Hour,
      blockchainWalletMetric: 'usd',
      blockchainWalletPagination: pagination,
      blockchainWalletSort: {
        ...sort,
        column: WalletTokenMetricChartSortInputTypeColumnEnum.Date,
      },
    })
  },
})

export const $blockchains = domain
  .createStore<Unwrap<ReturnType<typeof portfolioApi.getBlockchains>>>([], {
    name: '$portfolioChartOfAllTokens',
  })
  .on(fetchBlockchainsDataFx.doneData, (_, payload) => payload)

export const BlockchainsGate = createGate<FetchChartParams>({
  name: 'BlockchainsGate',
  domain,
})

sample({
  clock: BlockchainsGate.open,
  target: fetchBlockchainsDataFx,
})
