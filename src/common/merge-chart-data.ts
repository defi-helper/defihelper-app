import { MetricChartType } from '~/graphql/_generated-types'

type ChartData = Record<string, Array<Pick<MetricChartType, 'date' | 'sum'>>>

export const mergeChartData = <T extends ChartData>(data: T) => {
  const [longestItem, ...restItems] = Object.entries(data).sort(
    ([, a], [, b]) => (a.length > b.length ? -1 : 1)
  )

  const [longestItemKey, longestItemArr] = longestItem

  return longestItemArr.map((arrItem) =>
    restItems
      .map(([key, ar]) => ({
        key,
        sum: ar.find(({ date }) => date === arrItem.date)?.sum ?? '0',
      }))
      .reduce(
        (acc, item) => {
          acc[item.key] = item.sum

          return acc
        },
        {
          [longestItemKey]: arrItem.sum,
          date: arrItem.date,
        }
      )
  )
}
