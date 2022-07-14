/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */

const ACCESS_TOKEN =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiIyOWJlYjY2Mi05N2M1LTQ3OTUtOTUzNS00YWUyMWRhY2E0YjciLCJLZXlUeXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU3Mjk1MjYxLCJpc3MiOiJib29raXRlLmF1dGguc2VydmljZSJ9.IcfWs65qpFqROaj1UF5Fhwb3lNGsjPWYNrtoeuJRfmkSSEkaV9nVcEamiHTTafKrzI7nawkUjnlWVl0bzUljlrGZzCUeLkF-VDuFO1xtY90tGV3Hxj1986OkOOzeuZQUfYdpEgYjtwA-1s4-Xuk3XiwiClxdwuVShLeg_O8zBrMDPvfo32F4xxgB-mKQgBLEDMAEMuQSpBVTew0igGP07DsYMSA5tq_zP2nmLQzOgN8oD91e7BRV2Vv9faI2VZR3aa2YyFHd2yu3_8yEsk54VI9w8AY13RP3n3T9flOFPdKeoAXo23PZNu5I1Z0CftDQS2S96dFY6TymG2GrqV2LUw'

export async function makeApiRequest(path: string) {
  const response = await fetch(`https://whattofarm.io/ext-api/v1/${path}`, {
    headers: {
      Authorization: ACCESS_TOKEN,
    },
  })

  return response.json()
}

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

const lastBarsCache = new Map()

const configurationData = {
  supported_resolutions: ['1D', '1W', '1M'],
}

async function getAllSymbols() {
  const allSymbols: Array<any> = []

  return allSymbols
}

export default {
  onReady: (callback: (value: unknown) => void) => {
    console.log('[onReady]: Method call')
    setTimeout(() => callback(configurationData))
  },

  resolveSymbol: async (
    symbolName: string,
    onSymbolResolvedCallback: (value: unknown) => void,
    onResolveErrorCallback: (value: unknown) => void
  ) => {
    console.log('[resolveSymbol]: Method call', symbolName)
    const symbols = await getAllSymbols()
    const symbolItem = symbols.find(({ full_name }) => full_name === symbolName)
    if (!symbolItem) {
      console.log('[resolveSymbol]: Cannot resolve symbol', symbolName)
      onResolveErrorCallback('cannot resolve symbol')
      return
    }
    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: '24x7',
      timezone: 'Etc/UTC',
      exchange: symbolItem.exchange,
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
    const { from, to, firstDataRequest } = periodParams
    console.log('[getBars]: Method call', symbolInfo, resolution, from, to)
    const parsedSymbol = parseFullSymbol(symbolInfo.full_name)
    const urlParameters: Record<string, any> = {
      e: parsedSymbol?.exchange,
      fsym: parsedSymbol?.fromSymbol,
      tsym: parsedSymbol?.toSymbol,
      toTs: to,
      limit: 2000,
    }
    const query = Object.keys(urlParameters)
      .map((name) => `${name}=${encodeURIComponent(urlParameters[name])}`)
      .join('&')
    try {
      const data = await makeApiRequest(`data/histoday?${query}`)
      if (
        (data.Response && data.Response === 'Error') ||
        data.Data.length === 0
      ) {
        // "noData" should be set if there is no data in the requested period.
        onHistoryCallback([], {
          noData: true,
        })
        return
      }
      let bars: Array<{
        time: number
        low: number
        high: number
        open: number
        close: number
      }> = []
      data.Data.forEach((bar: any) => {
        if (bar.time >= from && bar.time < to) {
          bars = [
            ...bars,
            {
              time: bar.time * 1000,
              low: bar.low,
              high: bar.high,
              open: bar.open,
              close: bar.close,
            },
          ]
        }
      })
      if (firstDataRequest) {
        lastBarsCache.set(symbolInfo.full_name, {
          ...bars[bars.length - 1],
        })
      }
      console.log(`[getBars]: returned ${bars.length} bar(s)`)
      onHistoryCallback(bars, {
        noData: false,
      })
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
