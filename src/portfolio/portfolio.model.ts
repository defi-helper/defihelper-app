import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { portfolioApi } from './common/portfolio.api'
import * as portfolioAssetsModel from './portfolio-assets/portfolio-assets.model'
import * as portfolioCoinModel from './portfolio-coin-balance/portfolio-coin-balance.model'
import * as portfolioMetricCardsModel from './portfolio-metric-cards/portfolio-metric-cards.model'

export const portfolio = createDomain()

export const fetchTokenAliassesFx = portfolio.createEffect(() =>
  portfolioApi.tokenAliases()
)

export const portfolioUpdated = portfolio.createEvent()

export const $tokenAliasses = portfolio
  .createStore<number>(0)
  .on(fetchTokenAliassesFx.doneData, (_, payload) => payload)

export const PortfolioGate = createGate({
  domain: portfolio,
  name: 'PortfolioGate',
})

guard({
  source: PortfolioGate.status,
  clock: [PortfolioGate.open, authModel.$user.updates],
  filter: (isOpened) => isOpened,
  target: fetchTokenAliassesFx,
})

sample({
  clock: portfolioUpdated,
  target: [
    fetchTokenAliassesFx,
    portfolioAssetsModel.fetchAssetsListFx,
    portfolioCoinModel.fetchChartDataFx.prepend(() =>
      portfolioCoinModel.$currentGroup.getState()
    ),
    portfolioMetricCardsModel.fetchMetricCardsFx,
  ],
})

$tokenAliasses.reset(PortfolioGate.close, authModel.logoutFx.done)
