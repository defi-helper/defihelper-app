import { createDomain, sample } from 'effector-logger/macro'
import { createGate } from 'effector-react'

import { portfolioApi } from './common/portfolio.api'

export const portfolio = createDomain()

export const fetchTokenAliasses = portfolio.createEffect(
  portfolioApi.tokenAliases
)

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

$tokenAliasses.reset(PortfolioGate.close)
