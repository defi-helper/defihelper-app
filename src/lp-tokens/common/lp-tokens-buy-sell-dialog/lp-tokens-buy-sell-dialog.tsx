import clsx from 'clsx'
import { useState } from 'react'
import { ZapFeePayCreateInputType } from '~/api'

import { ButtonBase } from '~/common/button-base'
import { Dialog } from '~/common/dialog'
import { BuyLiquidity, SellLiquidity } from '~/common/load-adapter'
import { Typography } from '~/common/typography'
import { LPTokensBuyForm } from '../lp-tokens-buy-form'
import { LPTokensSellForm } from '../lp-tokens-sell-form'
import * as styles from './lp-tokens-buy-sell-dialog.css'

export type LPTokensBuySellDialogProps = {
  onConfirm: () => void
  onCancel: () => void
  onSubmit?: (variables: Omit<ZapFeePayCreateInputType, 'wallet'>) => void
  buyLiquidityAdapter: BuyLiquidity
  sellLiquidityAdapter: SellLiquidity
  tokens: {
    logoUrl: string
    symbol: string
    address: string
  }[]
  tokenSymbol: string
}

const Tabs = ['BUY', 'SELL'] as const

export const LPTokensBuySellDialog: React.VFC<LPTokensBuySellDialogProps> = (
  props
) => {
  const [currentTab, setTab] = useState<typeof Tabs[number]>(Tabs[0])

  const handleChangeTab = (tab: typeof Tabs[number]) => () => {
    setTab(tab)
  }

  const Components = {
    [Tabs[0]]: (
      <LPTokensBuyForm
        tokens={props.tokens}
        buyLiquidityAdapter={props.buyLiquidityAdapter}
        onConfirm={props.onConfirm}
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
        tokenSymbol={props.tokenSymbol}
      />
    ),
    [Tabs[1]]: (
      <LPTokensSellForm
        tokens={props.tokens}
        sellLiquidityAdapter={props.sellLiquidityAdapter}
        onConfirm={props.onConfirm}
        onSubmit={props.onSubmit}
        onCancel={props.onCancel}
        tokenSymbol={props.tokenSymbol}
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
