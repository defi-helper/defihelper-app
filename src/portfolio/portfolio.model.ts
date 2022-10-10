import { createDomain, sample, guard } from 'effector'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { portfolioApi } from './common/portfolio.api'
import { usersApi } from '~/users/common/users.api'
import * as portfolioAssetsModel from './portfolio-assets/portfolio-assets.model'
import * as portfolioCoinModel from './portfolio-coin-balance/portfolio-coin-balance.model'
import * as portfolioMetricCardsModel from './portfolio-metric-cards/portfolio-metric-cards.model'
import { UserUpdateMutationVariables } from '~/api'
import { fetchPortfolioNameFx, fetchUserFx } from '~/auth/auth.model'

export const portfolio = createDomain()

export const fetchPortfolioCollectedFx = portfolio.createEffect(() =>
  portfolioApi.isPorfolioCollected()
)

export const updatePortfolioNameFx = portfolio.createEffect(
  (input: UserUpdateMutationVariables) => usersApi.updateUser(input)
)

export const portfolioUpdated = portfolio.createEvent()

export const $portfolioCollected = portfolio
  .createStore(false)
  .on(fetchPortfolioCollectedFx.doneData, (_, payload) => payload)

export const $portfolioName = portfolio
  .createStore('')
  .on(updatePortfolioNameFx.doneData, (_, payload) => payload?.name ?? '')
  .on(fetchUserFx.doneData, (_, payload) => payload?.name ?? '')

export const PortfolioGate = createGate({
  domain: portfolio,
  name: 'PortfolioGate',
})

guard({
  source: PortfolioGate.status,
  clock: [PortfolioGate.open, authModel.$user.updates],
  filter: (isOpened) => isOpened,
  target: [fetchPortfolioCollectedFx, fetchPortfolioNameFx],
})

sample({
  clock: portfolioUpdated,
  target: [
    fetchPortfolioCollectedFx,
    fetchUserFx,
    portfolioAssetsModel.fetchAssetsListFx,
    portfolioCoinModel.fetchChartDataFx.prepend(() =>
      portfolioCoinModel.$currentGroup.getState()
    ),
    portfolioMetricCardsModel.fetchMetricCardsFx,
  ],
})

$portfolioCollected.reset(PortfolioGate.close, authModel.logoutFx)
