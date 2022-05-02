import { bignumberUtils } from '~/common/bignumber-utils'
import {
  PortfolioAssetByProtocolFragment,
  PortfolioAssetByWalletFragment,
  PortfolioAssetFragment,
} from '~/api/_generated-types'

export const portfolioSortAssets = (list: PortfolioAssetFragment[]) => {
  const l = list.filter((v) => v.metric.myUSD !== '0')
  const totalValue = l.reduce(
    (prev, v) => bignumberUtils.plus(prev, v.metric.myUSD),
    '0'
  )

  return l
    .map((v) => {
      return {
        ...v,
        metric: {
          ...v.metric,
          myPortfolioPercent: bignumberUtils
            .getPercentage(v.metric.myUSD, totalValue)
            .toString(),
        },
      }
    })
    .sort((a, b) =>
      Number(bignumberUtils.minus(b.metric.myUSD, a.metric.myUSD))
    )
}

export const portfolioSortAssetsByWallet = (
  list: PortfolioAssetByWalletFragment[]
) => {
  const l = list.filter((v) => v.metric.usd !== '0')
  const totalValue = l.reduce(
    (prev, v) => bignumberUtils.plus(prev, v.metric.usd),
    '0'
  )

  return l
    .map((v) => {
      return {
        ...v,
        metric: {
          ...v.metric,
          portfolioPercent: bignumberUtils
            .getPercentage(v.metric.usd, totalValue)
            .toString(),
        },
      }
    })
    .sort((a, b) => Number(bignumberUtils.minus(b.metric.usd, a.metric.usd)))
}

export const portfolioSortAssetsByPlatform = (
  list: PortfolioAssetByProtocolFragment[]
) => {
  const l = list.filter((v) => v.metric.myUSD !== '0')
  const totalValue = l.reduce(
    (prev, v) => bignumberUtils.plus(prev, v.metric.myUSD),
    '0'
  )

  return l
    .map((v) => {
      return {
        ...v,
        metric: {
          ...v.metric,
          portfolioPercent: bignumberUtils
            .getPercentage(v.metric.myUSD, totalValue)
            .toString(),
        },
      }
    })
    .sort((a, b) =>
      Number(bignumberUtils.minus(b.metric.myUSD, a.metric.myUSD))
    )
}
