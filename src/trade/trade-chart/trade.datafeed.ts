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
  supported_resolutions: ['1D', '1W', '1M'],
}

const cache = new Map()

export default {
  onReady: (callback: (value: unknown) => void) => {
    console.log('[onReady]: Method call')
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
    const { from, to } = periodParams
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to)

    try {
      if (cache.has(symbolInfo.ticker)) return

      const data = await tradeApi.history(symbolInfo.ticker)

      const bars: Array<{
        time: number
        low: number
        high: number
        open: number
        close: number
        volume: number
      }> = data.t.map((item: number, index: number) => ({
        close: data.c[index],
        low: data.l[index] as number,
        high: data.h[index] as number,
        open: data.o[index] as number,
        time: Math.floor(item * 1000),
        volume: data.v[index] as number,
      }))

      cache.set(symbolInfo.ticker, bars)

      if (bars.length < 1) {
        onHistoryCallback([], { noData: true })
      } else {
        onHistoryCallback(bars, { noData: false })
      }
    } catch (error) {
      console.log('[getBars]: Get error', error)
      onErrorCallback(error)
    }
  },

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
