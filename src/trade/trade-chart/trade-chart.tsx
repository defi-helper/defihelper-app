/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable new-cap */
import clsx from 'clsx'
import { useEffect } from 'react'

import { dateUtils } from '~/common/date-utils'
import DataFeed from '~/trade/trade-chart/trade.datafeed'
import * as styles from './trade-chart.css'

export type TradeChartProps = {
  className?: string
  address: string
  ticker: string
  exchange: string
}

export const TradeChart: React.VFC<TradeChartProps> = (props) => {
  useEffect(() => {
    if (!props.address || !props.ticker || !props.exchange) return

    const tradingView = new window.TradingView.widget({
      symbol: [props.address, props.ticker, props.exchange].join('/'),
      interval: '1D',
      timezone: dateUtils.timezone(),
      container: 'tv_chart_container',
      locale: 'en',
      datafeed: DataFeed,
      library_path: `tradingview/charting_library/`,
      autosize: true,
      fullscreen: false,
      disabled_features: [
        'header_symbol_search',
        'header_indicators',
        'header_compare',
        'use_localstorage_for_settings',
      ],
    })

    return () => {
      tradingView.remove()
    }
  }, [props.address, props.ticker, props.exchange])

  return (
    <div
      className={clsx(styles.root, props.className)}
      id="tv_chart_container"
    />
  )
}
