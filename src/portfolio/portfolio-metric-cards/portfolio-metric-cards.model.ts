import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { MetricChartType } from '~/graphql/_generated-types'
import { portfolioApi } from '~/portfolio/common'

type TokenMetric = {
  totalNetWorth: Array<Pick<MetricChartType, 'sum'>>
  unclaimedReward: Array<Pick<MetricChartType, 'sum'>>
}

export const portfolioMetricCardsDomain = createDomain()

export const fetchMetricCardsFx = portfolioMetricCardsDomain.createEffect(() =>
  portfolioApi.getTokenMetric()
)

export const $metric = portfolioMetricCardsDomain
  .createStore<TokenMetric | null>(null)
  .on(fetchMetricCardsFx.doneData, (_, payload) => payload)

export const PortfolioMetricCardsGate = createGate({
  name: 'PortfolioMetricCardsGate',
  domain: portfolioMetricCardsDomain,
})

sample({
  clock: PortfolioMetricCardsGate.open,
  target: fetchMetricCardsFx,
})
