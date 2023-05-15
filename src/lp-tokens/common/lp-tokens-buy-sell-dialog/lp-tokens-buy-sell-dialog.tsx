import clsx from 'clsx'
import { useState } from 'react'
import { useAsyncRetry, useInterval } from 'react-use'

import { ZapFeePayCreateInputType } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import {
  BuyLiquidity,
  BuyLiquidityUniv3,
  SellLiquidity,
  SellLiquidityUniv3,
} from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { LPTokensBuyForm } from '../lp-tokens-buy-form'
import { LPTokensSellForm } from '../lp-tokens-sell-form'
import * as styles from './lp-tokens-buy-sell-dialog.css'

export type LPTokensBuySellDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  onSubmit?: (variables: Omit<ZapFeePayCreateInputType, 'wallet'>) => void
  buyLiquidityAdapter: BuyLiquidity | null
  buyLiquidityUniv3Adapter: BuyLiquidityUniv3 | null
  sellLiquidityUniv3Adapter: SellLiquidityUniv3 | null
  sellLiquidityAdapter: SellLiquidity | null
  provider?: unknown
  account?: string
  isUniV3: boolean
  tokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
  tokenSymbol: string
}

const Tabs = ['BUY', 'SELL'] as const

const hasGetBalance = (
  provider: unknown
): provider is { getBalance: (account: string) => Promise<number> } => {
  return (
    typeof provider === 'object' &&
    provider !== null &&
    provider !== undefined &&
    'getBalance' in provider
  )
}

export const LPTokensBuySellDialog: React.VFC<LPTokensBuySellDialogProps> = (
  props
) => {
  const [currentTab, setTab] = useState<typeof Tabs[number]>(Tabs[0])

  const handleChangeTab = (tab: typeof Tabs[number]) => () => {
    setTab(tab)
  }

  const balanceOfNative = useAsyncRetry(async () => {
    if (!hasGetBalance(props.provider) || !props.account) return

    return props.provider
      ?.getBalance(props.account)
      .then((num) => bignumberUtils.fromCall(num.toString(), 18))
  }, [props.provider, props.account])

  useInterval(balanceOfNative.retry, 15000)

  const Components = {
    [Tabs[0]]: (
      <LPTokensBuyForm
        tokens={props.tokens}
        buyLiquidityAdapter={props.buyLiquidityAdapter}
        onConfirm={props.onConfirm}
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
        tokenSymbol={props.tokenSymbol}
        buyLiquidityUniv3Adapter={props.buyLiquidityUniv3Adapter}
        balanceOfNative={balanceOfNative.value}
        isUniV3={props.isUniV3}
      />
    ),
    [Tabs[1]]: (
      <LPTokensSellForm
        tokens={props.tokens}
        sellLiquidityAdapter={props.sellLiquidityAdapter}
        sellLiquidityUniv3Adapter={props.sellLiquidityUniv3Adapter}
        onConfirm={props.onConfirm}
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
        tokenSymbol={props.tokenSymbol}
        balanceOfNative={balanceOfNative.value}
        isUniV3={props.isUniV3}
      />
    ),
  }

  return (
    <Dialog className={styles.root}>
      <Typography
        variant="body3"
        transform="uppercase"
        family="mono"
        className={styles.title}
      >
        trade lp tokens
      </Typography>
      <div className={styles.tabs}>
        {Tabs.map((tab) => (
          <ButtonBase
            key={tab}
            className={clsx(
              styles.tabsItem,
              currentTab === tab && styles.tabsItemActive
            )}
            onClick={handleChangeTab(tab)}
          >
            {tab}
          </ButtonBase>
        ))}
      </div>
      {Components[currentTab]}
    </Dialog>
  )
}
