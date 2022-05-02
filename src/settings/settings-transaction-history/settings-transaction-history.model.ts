import { createDomain, restore, combine, guard } from 'effector-logger/macro'

import {
  BillingHistoryQueryVariables,
  WalletFragmentFragment,
} from '~/api/_generated-types'
import { settingsApi } from '~/settings/common'
import * as settingsWalletsModel from '~/settings/settings-wallets/settings-wallets.model'

export const billingHistoryDomain = createDomain()

export const fetchBillingHistoryFx = billingHistoryDomain.createEffect(
  async (variables: BillingHistoryQueryVariables) =>
    settingsApi.history(variables)
)

const $billingHistory = restore(
  fetchBillingHistoryFx.doneData.map(({ list }) => list),
  []
)

export const $count = restore(
  fetchBillingHistoryFx.doneData.map(({ count }) => count),
  0
)

export const $params = restore(
  fetchBillingHistoryFx.map((params) => params),
  null
)

export const $history = combine(
  $billingHistory,
  settingsWalletsModel.$wallets,
  (billingHistory, wallets) => {
    return billingHistory.map((billinghistoryItem) => {
      const wallet = wallets.find(
        (walletItem) =>
          walletItem.blockchain ===
            (billinghistoryItem.bill?.blockchain ||
              billinghistoryItem.blockchain) &&
          walletItem.network ===
            (billinghistoryItem.bill?.network || billinghistoryItem.network) &&
          walletItem.address ===
            (billinghistoryItem.bill?.account || billinghistoryItem.account)
      )

      return {
        ...billinghistoryItem,
        wallet,
      }
    })
  }
)

export const $wallets = $history.map((history) => {
  const wallets = history
    .map((historyItem) => historyItem.wallet)
    .filter((wallet): wallet is WalletFragmentFragment => Boolean(wallet))
    .reduce<Record<string, WalletFragmentFragment>>((acc, wallet) => {
      acc[wallet.id] = wallet

      return acc
    }, {})

  return Object.values(wallets)
})

guard({
  source: $params,
  clock: settingsWalletsModel.updated,
  filter: (params): params is BillingHistoryQueryVariables => Boolean(params),
  target: fetchBillingHistoryFx,
})
