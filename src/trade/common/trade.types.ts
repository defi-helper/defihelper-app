import {
  SmartTradeMockHandlerCallDataType,
  SmartTradeSwapHandlerCallDataType,
  TradeOrderListQuery,
} from '~/api'

export type Order = Exclude<
  TradeOrderListQuery['smartTradeOrders']['list'],
  null | undefined
>[number]

export const hasBoughtPrice = (
  callData: Record<string, unknown>
): callData is SmartTradeSwapHandlerCallDataType => {
  return 'boughtPrice' in callData
}

export const hasAmountIn = (
  callData: Record<string, unknown>
): callData is SmartTradeMockHandlerCallDataType => {
  return 'amountIn' in callData
}
