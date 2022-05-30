import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { authModel } from '~/auth'
import { MyMetricQuery } from '~/api/_generated-types'
import { portfolioApi } from '~/portfolio/common'

type MyMetric = Exclude<
  Exclude<MyMetricQuery['me'], undefined | null>['metric'],
  undefined
>

export const portfolioMetricCardsDomain = createDomain()

export const fetchMetricCardsFx = portfolioMetricCardsDomain.createEffect(() =>
  portfolioApi.myMetric()
)

export const $metric = portfolioMetricCardsDomain
  .createStore<MyMetric | null>(null)
  .on(fetchMetricCardsFx.doneData, (_, payload) => payload)

export const PortfolioMetricCardsGate = createGate({
  name: 'PortfolioMetricCardsGate',
  domain: portfolioMetricCardsDomain,
})

sample({
  clock: PortfolioMetricCardsGate.open,
  target: fetchMetricCardsFx,
})

$metric.reset(authModel.logoutFx)
