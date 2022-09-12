import { TradeOrderListQuery } from '~/api'

export type Order = Exclude<
  TradeOrderListQuery['smartTradeOrders']['list'],
  null | undefined
>[number]
