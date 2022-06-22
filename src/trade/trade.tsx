import { useState } from 'react'

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
        <div>
          {Object.values(Tabs).map((tab) => (
            <ButtonBase key={tab} onClick={handleChangeTab(tab)}>
              {tab}
            </ButtonBase>
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
        <Paper radius={8}>
          <Dropdown
            control={<ButtonBase>{currentSelect}</ButtonBase>}
            placement="bottom-start"
            offset={[0, 8]}
          >
            {(close) =>
              Object.values(Selects).map((select) => (
                <ButtonBase
                  key={select}
                  onClick={handleChangeSelect(select, close)}
                >
                  {select}
                </ButtonBase>
              ))
            }
          </Dropdown>
          {SelectComponents[currentSelect]}
        </Paper>
      </div>
      <TradeOrders />
    </AppLayout>
  )
}
