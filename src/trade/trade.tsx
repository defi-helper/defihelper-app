import { useState } from 'react'
import clsx from 'clsx'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Select, SelectOption } from '~/common/select'
import { Paper } from '~/common/paper'
import { TradeOrders } from './trade-orders'
import { TradeBuy } from './trade-buy'
import { TradeSell } from './trade-sell'
import { TradeSmartSell } from './trade-smart-sell'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import * as styles from './trade.css'

export type TradeProps = unknown

enum Tabs {
  Buy = 'buy',
  Sell = 'sell',
}

enum Selects {
  BuySell = 'trade',
  SmartSell = 'smart sell',
}

export const Trade: React.VFC<TradeProps> = () => {
  const [currentSelect, setCurrentSelect] = useState(Selects.BuySell)

  const [currentTab, setCurrentTab] = useState(Tabs.Buy)

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const handleChangeSelect = (select: Selects, cb: () => void) => () => {
    setCurrentSelect(select)

    cb()
  }

  const TabsComponents = {
    [Tabs.Buy]: <TradeBuy />,
    [Tabs.Sell]: <TradeSell />,
  }

  const SelectComponents = {
    [Selects.SmartSell]: <TradeSmartSell />,
    [Selects.BuySell]: (
      <>
        <div className={styles.tabs}>
          {Object.values(Tabs).map((tab) => (
            <Typography
              key={tab}
              onClick={handleChangeTab(tab)}
              className={clsx(styles.tabItem, {
                [styles.tabBuy]: tab === Tabs.Buy && Tabs.Buy === currentTab,
                [styles.tabSell]: tab === Tabs.Sell && Tabs.Sell === currentTab,
              })}
              as={ButtonBase}
              transform="uppercase"
              variant="body2"
            >
              {tab}
            </Typography>
          ))}
        </div>
        {TabsComponents[currentTab]}
      </>
    ),
  }

  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div className={styles.content}>
        <Select label="Wallet">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Exchange">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Trading Pair">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.chartHeader}>
            <div>
              <Typography>BTC/USDT</Typography>
            </div>
            <div>
              <Typography
                variant="body3"
                className={styles.chartTitle}
                as="span"
              >
                24h change
              </Typography>
              <Typography variant="body3">+ 13% | +4 085$</Typography>
            </div>
            <div>
              <Typography
                variant="body3"
                className={styles.chartTitle}
                as="span"
              >
                24h volume (USD)
              </Typography>
              <Typography variant="body3">5 259 687 158.42$</Typography>
            </div>
          </div>
          <img src="" alt="" className={styles.chartInner} />
        </Paper>
        <Paper radius={8} className={styles.selects}>
          <div className={styles.tradeSelectHeader}>
            <Dropdown
              control={(open) => (
                <Typography
                  variant="body3"
                  as={ButtonBase}
                  transform="uppercase"
                  family="mono"
                  className={styles.tradeSellSelect}
                >
                  {currentSelect}
                  <Icon
                    icon={open ? 'arrowUp' : 'arrowDown'}
                    width="16"
                    height="16"
                  />
                </Typography>
              )}
              placement="bottom-start"
              offset={[0, 8]}
            >
              {(close) =>
                Object.values(Selects).map((select) => (
                  <Typography
                    variant="body3"
                    key={select}
                    onClick={handleChangeSelect(select, close)}
                    as={ButtonBase}
                    transform="uppercase"
                  >
                    {select}
                  </Typography>
                ))
              }
            </Dropdown>
            <Typography variant="body3" as="div">
              <Typography variant="inherit" as="div" align="right">
                Current Balance
              </Typography>
              <Typography variant="inherit" as="div" align="right">
                0.50000 ВТС
              </Typography>
            </Typography>
          </div>
          {SelectComponents[currentSelect]}
        </Paper>
      </div>
      <TradeOrders />
    </AppLayout>
  )
}
