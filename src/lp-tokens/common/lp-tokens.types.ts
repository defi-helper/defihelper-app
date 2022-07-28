import { BuyLiquidityContractsQuery } from '~/api'

export type LPContracts = Exclude<
  Exclude<
    BuyLiquidityContractsQuery['protocol'],
    null | undefined
  >['contracts']['list'],
  null | undefined
>
