import { BuyLiquidityContractsQuery } from '~/api'

export type LPContracts = Exclude<
  Exclude<BuyLiquidityContractsQuery['contracts'], null | undefined>['list'],
  null | undefined
>
