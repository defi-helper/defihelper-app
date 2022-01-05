import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { portfolioApi } from './common/portfolio.api'
import * as portfolioAssetsModel from './portfolio-assets/portfolio-assets.model'
import * as portfolioCoinModel from './portfolio-coin-balance/portfolio-coin-balance.model'
import * as portfolioMetricCardsModel from './portfolio-metric-cards/portfolio-metric-cards.model'

export const portfolio = createDomain()

export const fetchTokenAliasses = portfolio.createEffect(
  portfolioApi.tokenAliases
)

export const portfolioUpdated = portfolio.createEvent()

export const $tokenAliasses = portfolio
  .createStore<number>(0)
  .on(fetchTokenAliasses.doneData, (_, payload) => payload)

export const PortfolioGate = createGate({
  domain: portfolio,
  name: 'PortfolioGate',
})

sample({
  clock: PortfolioGate.open,
  target: fetchTokenAliasses,
})

sample({
  clock: portfolioUpdated,
  target: [
    fetchTokenAliasses,
    portfolioAssetsModel.fetchAssetsListFx,
    portfolioCoinModel.fetchChartDataFx.prepend(() =>
      portfolioCoinModel.$currentGroup.getState()
    ),
    portfolioMetricCardsModel.fetchMetricCardsFx,
  ],
})

$tokenAliasses.reset(PortfolioGate.close)
