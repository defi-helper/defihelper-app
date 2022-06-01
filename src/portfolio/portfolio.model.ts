import { createDomain, sample, guard } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { portfolioApi } from './common/portfolio.api'
import * as portfolioAssetsModel from './portfolio-assets/portfolio-assets.model'
import * as portfolioCoinModel from './portfolio-coin-balance/portfolio-coin-balance.model'
import * as portfolioMetricCardsModel from './portfolio-metric-cards/portfolio-metric-cards.model'

export const portfolio = createDomain()

export const fetchPortfolioCollectedFx = portfolio.createEffect(() =>
  portfolioApi.isPorfolioCollected()
)

export const portfolioUpdated = portfolio.createEvent()

export const $portfolioCollected = portfolio
  .createStore(false)
  .on(fetchPortfolioCollectedFx.doneData, (_, payload) => payload)

export const PortfolioGate = createGate({
  domain: portfolio,
  name: 'PortfolioGate',
})

guard({
  source: PortfolioGate.status,
  clock: [PortfolioGate.open, authModel.$user.updates],
  filter: (isOpened) => isOpened,
  target: fetchPortfolioCollectedFx,
})

sample({
  clock: portfolioUpdated,
  target: [
    fetchPortfolioCollectedFx,
    portfolioAssetsModel.fetchAssetsListFx,
    portfolioCoinModel.fetchChartDataFx.prepend(() =>
      portfolioCoinModel.$currentGroup.getState()
    ),
    portfolioMetricCardsModel.fetchMetricCardsFx,
  ],
})

$portfolioCollected.reset(PortfolioGate.close, authModel.logoutFx)
