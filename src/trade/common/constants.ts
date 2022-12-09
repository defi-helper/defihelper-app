import { SmartTradeOrderStatusEnum } from '~/api'

export enum Tabs {
  Active = 'active',
  History = 'history',
}

export const statuses = {
  [Tabs.Active]: [
    SmartTradeOrderStatusEnum.Pending,
    SmartTradeOrderStatusEnum.Succeeded,
  ],
  [Tabs.History]: [
    SmartTradeOrderStatusEnum.Processed,
    SmartTradeOrderStatusEnum.Canceled,
  ],
}
