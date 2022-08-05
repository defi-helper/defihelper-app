/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

import { tradeApi } from '../common/trade.api'

// Generate a symbol ID from a pair of the coins
export function generateSymbol(
  exchange: string,
  fromSymbol: string,
  toSymbol: string
) {
  const short = `${fromSymbol}/${toSymbol}`
  return {
    short,
    full: `${exchange}:${short}`,
  }
}

export function parseFullSymbol(fullSymbol: string) {
  const match = fullSymbol.match(/^(\w+):(\w+)\/(\w+)$/)
  if (!match) {
    return null
  }

  return {
    exchange: match[1],
    fromSymbol: match[2],
    toSymbol: match[3],
  }
}

const configurationData = {
  supports_search: false,
  supports_group_request: true,
  supported_resolutions: ['1', '5', '15', '60', '240', 'D'],
  supports_marks: false,
  supports_timescale_marks: false,
}

const cache = new Map()

export default {
  onReady: (callback: (value: unknown) => void) => {
    console.log('[onReady]: Method call', configurationData)
    setTimeout(() => callback(configurationData))
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (value: unknown) => void
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName)
    const symbolInfo = {
      ticker: symbolName,
      name: symbolName,
      description: symbolName,
      type: symbolName,
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: symbolName,
      minmov: 1,
      pricescale: 100,
      has_intraday: false,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      volume_precision: 2,
      data_status: 'streaming',
    }

    console.log('[resolveSymbol]: Symbol resolved', symbolName)
    onSymbolResolvedCallback(symbolInfo)
  },

  getBars: async (
    symbolInfo: any,
    resolution: string,
    periodParams: any,
    onHistoryCallback: (...value: unknown[]) => void,
    onErrorCallback: (...value: unknown[]) => void
  ) => {
    const { from, to, countBack } = periodParams

    console.log('[getBars]: Method call', symbolInfo, resolution, from, to)

    try {
      const { data } = await tradeApi.history(
        symbolInfo.ticker,
        from,
        to,
        countBack
      )

      const bars = data.map((item: any) => ({
        close: item.CloseUsdPrice0,
        low: item.MinUsdPrice0,
        high: item.MaxUsdPrice0,
        open: item.OpenUsdPrice0,
        time: new Date(item.TS).getTime(),
        volume: item.Volume0,
      }))

      cache.set(symbolInfo.ticker, bars)

      onHistoryCallback(bars, { noData: false })
    } catch (error) {
      console.log('[getBars]: Get error', error)
      onErrorCallback(error)
    }
  },

  searchSymbols: () => {},

  subscribeBars: () => {},

  unsubscribeBars: () => {},

  // subscribeBars: (
  //   symbolInfo,
  //   resolution,
  //   onRealtimeCallback,
  //   subscribeUID,
  //   onResetCacheNeededCallback
  // ) => {
  //   console.log('[subscribeBars]: Method call with subscribeUID:', subscribeUID)
  //   subscribeOnStream(
  //     symbolInfo,
  //     resolution,
  //     onRealtimeCallback,
  //     subscribeUID,
  //     onResetCacheNeededCallback,
  //     lastBarsCache.get(symbolInfo.full_name)
  //   )
  // },

  // unsubscribeBars: (subscriberUID) => {
  //   console.log(
  //     '[unsubscribeBars]: Method call with subscriberUID:',
  //     subscriberUID
  //   )
  //   unsubscribeFromStream(subscriberUID)
  // },
}
