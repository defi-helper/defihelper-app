import { createDomain, sample } from 'effector-logger/macro'

import { createGate } from 'effector-react'
import BN from 'bignumber.js'
import { portfolioApi } from '~/portfolio/common'
import { PortfolioAssetFragment } from '~/graphql/_generated-types'

export const portfolioAssetsDomain = createDomain()

export const fetchAssetsListFx = portfolioAssetsDomain.createEffect(
  async () => {
    return portfolioApi.getAssetsList({})
  }
)

export const $assets = portfolioAssetsDomain
  .createStore<PortfolioAssetFragment[]>([])
  .on(fetchAssetsListFx.doneData, (_, list) => {
    const totalValue = list.reduce(
      (prev, v) => prev.plus(new BN(v.metric.myUSD)),
      new BN(0)
    )

    return list.map((v) => {
      const percent = new BN(v.metric.myUSD)
        .multipliedBy(100)
        .dividedBy(totalValue)

      return {
        ...v,
        metric: {
          ...v.metric,
          myPortfolioPercent: percent.toString(10),
        },
      }
    })
  })

export const PortfolioAssetsGate = createGate({
  domain: portfolioAssetsDomain,
  name: 'PortfolioAssetsGate',
})

sample({
  clock: PortfolioAssetsGate.open,
  target: fetchAssetsListFx,
})
