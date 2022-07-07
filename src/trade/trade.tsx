import { useState } from 'react'
import clsx from 'clsx'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Select, SelectOption } from '~/common/select'
import { Paper } from '~/common/paper'
import { TradeOrders } from './trade-orders'
import { TradeBuySell } from './trade-buy-sell'
import { TradeSmartSell } from './trade-smart-sell'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'
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

// new window.TradingView.widget({})

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
        <TradeBuySell />
      </>
    ),
  }

  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div className={styles.header}>
        <Select label="Wallet">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Exchange">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
        <Select label="Trading Pair">
          <SelectOption value="SelectOption">test</SelectOption>
        </Select>
      </div>
      <div className={styles.content}>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.chartHeader}>
            <div>
              <Typography>BTC/USDT</Typography>
            </div>
            <Typography variant="body3" className={styles.chartMetric} as="div">
              <Typography
                variant="inherit"
                className={styles.chartTitle}
                as="div"
              >
                24h change
              </Typography>
              <Typography variant="inherit" as="div">
                + 13% | +4 085$
              </Typography>
            </Typography>
            <Typography variant="body3" className={styles.chartMetric} as="div">
              <Typography
                variant="inherit"
                className={styles.chartTitle}
                as="div"
              >
                24h volume (USD)
              </Typography>
              <Typography variant="inherit" as="div">
                5 259 687 158.42$
              </Typography>
            </Typography>
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
            <Typography
              variant="body3"
              as="div"
              className={styles.currentBalance}
              align="right"
            >
              <Typography variant="inherit" as="div" align="right">
                Current Balance
              </Typography>
              <Typography
                variant="inherit"
                as={ButtonBase}
                align="right"
                className={styles.currentBalanceValue}
              >
                0.50000 ВТС
              </Typography>
            </Typography>
          </div>
          {SelectComponents[currentSelect]}
          <div className={styles.buttons}>
            <Typography
              className={styles.approveTransactions}
              variant="body3"
              as="div"
            >
              Approve transactions <Icon icon="info" width="1em" height="1em" />
            </Typography>
            <Button color="green">Approve USDT</Button>
            <Button color="green">Approve ETH</Button>
            <Button color="green" className={styles.fullWidth}>
              Create Order
            </Button>
          </div>
        </Paper>
      </div>
      <TradeOrders />
    </AppLayout>
  )
}
