import React, { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useStore } from 'effector-react'
import { useForm } from 'react-hook-form'

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
import { TradeChart } from './trade-chart'
import { networksConfig } from '~/networks-config'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Input } from '~/common/input'
import { tradeApi } from './common/trade.api'
import * as styles from './trade.css'
import * as model from './trade.model'

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
  const { register, handleSubmit, formState, reset } =
    useForm<{ email: string }>()

  const [currentSelect, setCurrentSelect] = useState(Selects.BuySell)
  const [currentTab, setCurrentTab] = useState(Tabs.Buy)
  const [currentExchange, setCurrentExchange] = useState('')
  const [currentPair, setCurrentPair] = useState('')
  const [currentWallet, setCurrentWallet] = useState('')

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const handleChangeSelect = (select: Selects, cb: () => void) => () => {
    setCurrentSelect(select)

    cb()
  }

  const handleChangeExchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentExchange(event.target.value)
  }
  const handleChangePair = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPair(event.target.value)
  }
  const handleChangeWallet = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentWallet(event.target.value)
  }

  const exchanges = useStore(model.$exchanges)
  const pairs = useStore(model.$pairs)
  const wallets = useStore(settingsWalletModel.$wallets)

  const walletsMap = useMemo(
    () =>
      wallets
        .filter((wallet) => Boolean(model.networks[wallet.network]))
        .reduce((acc, wallet) => {
          acc.set(wallet.id, wallet)

          return acc
        }, new Map<string, typeof wallets[number]>()),
    [wallets]
  )

  const wallet = useMemo(
    () => walletsMap.get(currentWallet),
    [currentWallet, walletsMap]
  )

  useEffect(() => {
    if (!wallet) return

    model.fetchExchangesFx(wallet.network)
  }, [wallet])

  useEffect(() => {
    if (!wallet) return

    model.fetchPairsFx(wallet.network)
  }, [wallet])

  useEffect(() => {
    return () => model.reset()
  }, [])

  useEffect(() => {
    if (!wallets[0]) return

    setCurrentWallet(wallets[0].id)
  }, [wallets])

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

  const handleOnSubmit = handleSubmit(async (formValues) => {
    try {
      await tradeApi.sendForm('2', formValues)

      reset({ email: '' })
    } catch {
      console.error('something went wrong')
    }
  })

  console.log(pairs)

  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div className={styles.header}>
        <Select
          label="Wallet"
          value={currentWallet}
          onChange={handleChangeWallet}
        >
          {wallets
            .filter(({ network }) => Boolean(model.networks[network]))
            .map(({ network, id, name }, index) => (
              <SelectOption value={id} key={String(index)}>
                {networksConfig[network] && (
                  <Icon
                    icon={networksConfig[network].icon}
                    className={styles.pairIcon}
                  />
                )}
                {name}
              </SelectOption>
            ))}
        </Select>
        <Select
          label="Exchange"
          onChange={handleChangeExchange}
          value={currentExchange}
        >
          {exchanges.map((exchange, index) => (
            <SelectOption value={exchange.Icon} key={String(index)}>
              <img
                alt=""
                src={`${exchange.Icon}.svg`}
                width="24"
                height="24"
                className={styles.pairIcon}
              />
              {exchange.Name}
            </SelectOption>
          ))}
        </Select>
        <Select
          label="Trading Pair"
          value={currentPair}
          onChange={handleChangePair}
        >
          {pairs.map((pair, index) => (
            <SelectOption value={pair.pairInfo?.address} key={String(index)}>
              <img
                alt=""
                src={`https://whattofarm.io/assets/dex/${pair.pairInfo?.lpToken?.network?.name}.svg`}
                width="24"
                height="24"
                className={styles.pairIcon}
              />
              <img
                alt=""
                src={`https://whattofarm.io/assets/dex/${pair.pairInfo?.icon}.svg`}
                width="24"
                height="24"
                className={styles.pairIcon}
              />
              {pair.pairInfo?.ticker}
            </SelectOption>
          ))}
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
          <TradeChart className={styles.chartInner} symbol={currentPair} />
        </Paper>
        <Paper radius={8} className={styles.selects}>
          <div className={styles.selectsBody}>
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
                Approve transactions{' '}
                <Icon icon="info" width="1em" height="1em" />
              </Typography>
              <Button color="green">Approve USDT</Button>
              <Button color="green">Approve ETH</Button>
              <Button color="green" className={styles.fullWidth}>
                Create Order
              </Button>
            </div>
          </div>
          <div className={styles.beta}>
            <Typography
              variant="body2"
              align="center"
              family="mono"
              className={styles.betaTitle}
            >
              Trade section is currently at the beta stage. Please leave your
              email address to try it first.
            </Typography>
            <form
              noValidate
              autoComplete="off"
              className={styles.betaForm}
              onSubmit={handleOnSubmit}
            >
              <Input
                placeholder="hello@defihelper.io"
                {...register('email', {
                  required: true,
                  pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g,
                })}
                error={Boolean(formState.errors.email?.message)}
                helperText={formState.errors.email?.message}
              />
              <Button color="green" type="submit">
                join
              </Button>
            </form>
          </div>
        </Paper>
      </div>
      <TradeOrders />
    </AppLayout>
  )
}
