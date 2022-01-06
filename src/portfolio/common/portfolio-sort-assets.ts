import { bignumberUtils } from '~/common/bignumber-utils'
import { PortfolioAssetFragment } from '~/graphql/_generated-types'

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
