/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
import clsx from 'clsx'
import { useEffect } from 'react'

import { dateUtils } from '~/common/date-utils'
import DataFeed from '~/trade/common/trade-datafeed'
import * as styles from './trade-chart.css'

export type TradeChartProps = {
  className?: string
  data: any[]
}

export const TradeChart: React.VFC<TradeChartProps> = (props) => {
  useEffect(() => {
    const tradingView = new window.TradingView.widget({
      symbol: 'BTC/USD',
      interval: '1D',
      timezone: dateUtils.timezone(),
      container_id: 'tv_chart_container',
      locale: 'en',
      datafeed: DataFeed,
      library_path: 'charting_library/charting_library/',
      autosize: true,
      fullscreen: false,
      disabled_features: [
        'header_symbol_search',
        'header_indicators',
        'header_compare',
      ],
    })

    return () => {
      tradingView.remove()
    }
  }, [])

  return (
    <div
      className={clsx(styles.root, props.className)}
      id="tv_chart_container"
    />
  )
}
