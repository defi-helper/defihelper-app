/* eslint-disable new-cap */
import { useEffect } from 'react'

import { dateUtils } from '~/common/date-utils'
import DataFeed from '~/trade/common/trade-datafeed'

export type TradeChartProps = {
  className?: string
}

export const TradeChart: React.VFC<TradeChartProps> = (props) => {
  useEffect(() => {
    const tradingView = new window.TradingView.widget({
      symbol: 'A',
      interval: '1D',
      timezone: dateUtils.timezone(),
      container_id: 'tv_chart_container',
      locale: 'en',
      dataFeed: DataFeed,
      library_path: 'charting_library/',
    })

    return () => {
      tradingView.remove()
    }
  }, [])

  return <div className={props.className} id="tv_chart_container" />
}
