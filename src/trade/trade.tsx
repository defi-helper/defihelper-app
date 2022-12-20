/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useAsyncFn, useInterval } from 'react-use'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import { useStore } from 'effector-react'
import contracts from '@defihelper/networks/contracts.json'

import { Head } from '~/common/head'
import { AppLayout } from '~/layouts'
import { Typography } from '~/common/typography'
import { Select, SelectOption } from '~/common/select'
import { Paper } from '~/common/paper'
import { TradeOrders } from './trade-orders'
import { TradeBuySell } from './trade-buy-sell'
import { TradeSmartOrderSell, TradeSmartOrderBuy } from './trade-smart-order'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Button } from '~/common/button'
import { TradeChart } from './trade-chart'
import { networksConfig } from '~/networks-config'
import { settingsWalletModel } from '~/settings/settings-wallets'
import { Input } from '~/common/input'
import { bignumberUtils } from '~/common/bignumber-utils'
import { config } from '~/config'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { TradePlusMinus } from './common/trade-plus-minus'
import { useDialog } from '~/common/dialog'
import { ConfirmDialog } from '~/common/confirm-dialog'
import { pairMock } from './common/trade-dev.mock'
import { switchNetwork } from '~/wallets/common'
import { NumericalInput } from '~/common/numerical-input'
import { authModel } from '~/auth'
import { UserRoleEnum } from '~/api'
import { useQueryParams } from '~/common/hooks'
import * as model from './trade.model'
import * as tradeOrdersModel from './trade-orders/trade-orders.model'
import * as styles from './trade.css'

export type TradeProps = unknown

const Tabs = ['buy', 'sell']

enum Selects {
  BuySell = 'trade',
  SmartSell = 'smart sell',
  TrailingBuy = 'trailing buy',
}

const USDC_ETH = '0xEa26B78255Df2bBC31C1eBf60010D78670185bD0'

export const Trade: React.VFC<TradeProps> = () => {
  const routerHistory = useHistory()

  const queryParams = useQueryParams()
  const exchangeQuery = queryParams.get('exchange')
  const pairQuery = queryParams.get('pair')
  const networkQuery = queryParams.get('network')

  const [currentSelect, setCurrentSelect] = useState(Selects.SmartSell)
  const [currentTab, setCurrentTab] = useState(0)
  const [currentExchange, setCurrentExchange] = useState('')
  const [currentPair, setCurrentPair] = useState('')
  const [currentWalletAddress, setCurrentWalletAddress] = useState<
    string | undefined
  >(undefined)
  const [searchPair, setSearchPair] = useState('')
  const [currentSlippage, setCurrentSlippage] = useState('3')
  const [transactionDeadline, setTransactionDeadline] = useState('30')
  const [openConfirmDialog] = useDialog(ConfirmDialog)

  const handleConnect = useWalletConnect()

  const handleChangeTab = (tab: number) => () => {
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
    setCurrentWalletAddress(event.target.value)
  }

  const exchanges = useStore(model.$exchanges)
  const pairs = useStore(model.$pairsWithAlias)
  const settingsWallets = useStore(settingsWalletModel.$wallets)
  const loadingExchanges = useStore(model.fetchExchangesFx.pending)
  const loadingPairs = useStore(model.fetchPairsFx.pending)
  const adapter = useStore(model.$adapter)
  const currentWallet = walletNetworkModel.useWalletNetwork()
  const history = useStore(model.$history)
  const updating = useStore(model.fetchHistoryFx.pending)
  const user = useStore(authModel.$user)
  const editingOrder = useStore(tradeOrdersModel.$editingOrder)

  const wallets = useMemo(
    () =>
      settingsWallets.filter(({ network }) => Boolean(model.networks[network])),
    [settingsWallets]
  )

  const correctWallets = useMemo(
    () => wallets.filter(({ network }) => network in model.networks),
    [wallets]
  )

  const walletsMap = useMemo(
    () =>
      correctWallets.reduce((acc, wallet) => {
        acc.set(wallet.id, wallet)

        return acc
      }, new Map<string, typeof correctWallets[number]>()),
    [correctWallets]
  )

  const wallet = useMemo(() => {
    if (currentWalletAddress) return walletsMap.get(currentWalletAddress)
  }, [currentWalletAddress, walletsMap])

  useEffect(() => {
    const abortController = new AbortController()

    model.fetchExchangesFx({
      network: networkQuery ?? wallet?.network ?? config.DEFAULT_CHAIN_ID,
      signal: abortController.signal,
    })

    return () => abortController.abort()
  }, [wallet, networkQuery])

  useEffect(() => {
    if (!currentExchange || loadingExchanges) return

    const abortController = new AbortController()

    model.fetchPairsFx({
      network: networkQuery ?? wallet?.network ?? config.DEFAULT_CHAIN_ID,
      exchange: currentExchange,
      signal: abortController.signal,
    })

    return () => {
      abortController.abort()
    }
  }, [wallet, currentExchange, loadingExchanges, networkQuery])

  useEffect(() => {
    return () => model.reset()
  }, [])

  useEffect(() => {
    if (!correctWallets.length) return

    const findedWallet = correctWallets.find(({ network, address }) => {
      return (
        ((network === 'main'
          ? address === currentWallet?.account
          : address.toLowerCase() === currentWallet?.account?.toLowerCase()) &&
          network === currentWallet?.chainId) ||
        network === networkQuery
      )
    })

    const walletId = findedWallet?.id ?? correctWallets[0]?.id

    setCurrentWalletAddress(walletId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallets, currentWallet, correctWallets])

  const pairMap = useMemo(
    () =>
      pairs.reduce((acc, pair) => {
        acc.set(pair.pairInfo?.address, pair)

        return acc
      }, new Map<string, typeof pairs[number]>()),
    [pairs]
  )

  useEffect(() => {
    const [firstPair] = pairs

    if (!firstPair || loadingPairs) return

    if (pairQuery && pairMap.has(pairQuery)) {
      setCurrentPair(pairQuery ?? '')
    } else {
      setCurrentPair(firstPair.pairInfo?.address ?? '')
    }
  }, [pairs, loadingPairs, pairMap, pairQuery])

  const currentPairObj = useMemo(
    () => pairMap.get(currentPair),
    [pairMap, currentPair]
  )
  const exchangesMap = useMemo(
    () =>
      exchanges.reduce((acc, exchange) => {
        acc.set(exchange.Name, exchange)
        if (exchange.Address) acc.set(exchange.Address, exchange)

        return acc
      }, new Map<string, typeof exchanges[number]>()),
    [exchanges]
  )

  const currentExchangeObj = useMemo(
    () => exchangesMap.get(currentExchange),
    [exchangesMap, currentExchange]
  )

  useEffect(() => {
    const [firstExchange] = exchanges

    if (!firstExchange || loadingExchanges) return

    if (exchangeQuery && exchangesMap.has(exchangeQuery)) {
      const exchange = exchangesMap.get(exchangeQuery)

      if (!exchange) return

      setCurrentExchange(exchange.Name)
    } else {
      setCurrentExchange(firstExchange.Name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exchanges, loadingExchanges, exchangesMap])

  useEffect(() => {
    if (!currentPair || !currentExchangeObj || !wallet) return

    routerHistory.replace({
      search: `exchange=${currentExchangeObj.Address}&pair=${currentPair}&network=${wallet.network}`,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPair, currentExchangeObj, wallet])

  const tokens = useMemo(() => {
    const tokensCp = [...(currentPairObj?.pairInfo?.tokens ?? [])]

    return currentTab > 0 ? tokensCp.reverse() : tokensCp
  }, [currentPairObj, currentTab])

  const tokensTab = (currentPairObj?.pairInfo?.tokens ?? []).map(
    ({ symbol }) => symbol
  )

  const tabNames = {
    [Selects.SmartSell]: tokensTab,
    [Selects.BuySell]: Tabs,
    [Selects.TrailingBuy]: tokensTab,
  }

  const tabs = tabNames[currentSelect].length ? (
    <div className={styles.tabs}>
      {tabNames[currentSelect].map((tab, index) => (
        <Typography
          key={tab}
          onClick={handleChangeTab(index)}
          className={clsx(
            styles.tabItem,
            currentTab === index && styles.tabItemActive
          )}
          as={ButtonBase}
          transform="uppercase"
          variant="body2"
        >
          {tab}
        </Typography>
      ))}
    </div>
  ) : null

  const SelectComponents = {
    [Selects.SmartSell]: (
      <>
        {!editingOrder && tabs}
        <TradeSmartOrderSell
          router={adapter?.router}
          swap={adapter?.swap}
          tokens={tokens}
          exchangeAddress={currentExchangeObj?.Address}
          transactionDeadline={transactionDeadline}
          slippage={currentSlippage}
          key={String(currentPair || currentWalletAddress || currentExchange)}
          exchangesMap={exchangesMap}
          currentPair={currentPairObj}
        />
      </>
    ),
    [Selects.BuySell]: (
      <>
        {!editingOrder && tabs}
        <TradeBuySell
          router={adapter?.router}
          swap={adapter?.swap}
          tokens={tokens}
          key={String(currentPair || currentWalletAddress || currentExchange)}
        />
      </>
    ),
    [Selects.TrailingBuy]: (
      <>
        {!editingOrder && tabs}
        <TradeSmartOrderBuy
          router={adapter?.router}
          swap={adapter?.swap}
          tokens={tokens}
          exchangeAddress={currentExchangeObj?.Address}
          transactionDeadline={transactionDeadline}
          slippage={currentSlippage}
          key={String(currentPair || currentWalletAddress || currentExchange)}
          exchangesMap={exchangesMap}
          currentPair={currentPairObj}
          hasReverse={currentTab > 0}
        />
      </>
    ),
  }

  useEffect(() => {
    if (!currentWallet?.provider || !currentWallet.chainId) return

    model.fetchAdapterFx({
      provider: currentWallet.provider,
      chainId: currentWallet.chainId,
    })
  }, [currentWallet])

  const handleUpdatePrice = useCallback(() => {
    if (!currentPairObj) return

    model.fetchHistoryFx({
      address: String(
        config.IS_DEV &&
          currentPairObj?.pairInfo?.address === pairMock.pairInfo.address
          ? USDC_ETH
          : currentPairObj?.pairInfo?.address
      ),
    })
  }, [currentPairObj])

  useEffect(() => {
    handleUpdatePrice()
  }, [handleUpdatePrice])

  useInterval(handleUpdatePrice, 15000)

  const [cancelOrder, handleCancelOrder] = useAsyncFn(
    async (values: { orderNumber: number | string; id: string }) => {
      if (!adapter) return

      try {
        await openConfirmDialog()

        const can = await adapter?.swap.canCancelOrder(values.orderNumber)

        if (can instanceof Error) throw can

        const res = await adapter?.swap.cancelOrder(values.orderNumber)

        await res?.tx?.wait()

        await tradeOrdersModel.cancelOrderFx({
          id: values.id,
        })
      } catch (error) {
        console.error(error)
      }
    },
    [adapter]
  )

  const selectedNetworkCorrect = (wallet?.network ?? '') in model.networks
  const currentNetworkCorrect = (currentWallet?.chainId ?? '') in model.networks
  const currentNetworkAndSelectedAreEqual =
    wallet?.network === currentWallet?.chainId &&
    wallet?.network !== undefined &&
    currentWallet?.chainId !== undefined

  const networkCorrect =
    currentNetworkCorrect ||
    selectedNetworkCorrect ||
    currentNetworkAndSelectedAreEqual

  const [switchNetworkState, handleSwitchNetwork] = useAsyncFn(async () => {
    let network =
      !currentNetworkCorrect || !selectedNetworkCorrect ? '56' : wallet?.network

    if (!currentNetworkAndSelectedAreEqual) {
      network = wallet?.network
    }

    if (!network) return

    await switchNetwork(network).catch(console.error)
  }, [
    wallet,
    selectedNetworkCorrect,
    currentNetworkCorrect,
    currentNetworkAndSelectedAreEqual,
  ])

  const hasContract =
    'SmartTradeRouter' in
    (contracts[wallet?.network as keyof typeof contracts] ?? {})

  const handleSearchPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchPair(event.target.value)
  }

  useEffect(() => {
    if (!currentPair) return

    setSearchPair('')
  }, [currentPair])

  return (
    <AppLayout title="Trade">
      <Head title="Trade" />
      <Typography variant="h3" className={styles.title}>
        Trade
      </Typography>
      <div className={styles.header}>
        {wallets.length ? (
          <Select
            label="Wallet"
            placeholder="Choose wallet"
            value={currentWalletAddress}
            onChange={handleChangeWallet}
          >
            {wallets.map(({ network, id, name }, index) => (
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
            <SelectOption onClick={() => handleConnect()}>
              + Connect wallet
            </SelectOption>
          </Select>
        ) : (
          <div>
            <Typography
              as="span"
              variant="body3"
              family="mono"
              transform="uppercase"
              className={styles.connectWalletLabel}
            >
              Wallet
            </Typography>
            <div
              className={styles.connectWalletInput}
              onClick={handleConnect.bind(null, undefined)}
            >
              <Icon icon="plus" width={20} height={20} />
              <div>Connect Wallet</div>
              <Icon
                icon="arrowDown"
                height={18}
                width={18}
                className={styles.connectWalletArrow}
              />
            </div>
          </div>
        )}
        <Select
          label="Exchange"
          onChange={handleChangeExchange}
          value={currentExchange}
        >
          {exchanges.map((exchange, index) => {
            const [firstChar, ...restChars] = Array.from(exchange.Name)

            return (
              <SelectOption value={exchange.Name} key={String(index)}>
                <img
                  alt=""
                  src={`${exchange.Icon}.svg`}
                  width="24"
                  height="24"
                  className={styles.pairIcon}
                />
                {[firstChar.toLocaleUpperCase(), ...restChars].join('')}
              </SelectOption>
            )
          })}
        </Select>
        <Select
          label="Trading Pair"
          value={currentPair}
          onChange={handleChangePair}
          header={
            <Input
              type="text"
              placeholder="Select a pair or paste token address"
              value={searchPair}
              onChange={handleSearchPair}
            />
          }
        >
          {pairs
            .filter(
              (pair) =>
                pair.pairInfo?.address
                  ?.toLocaleLowerCase()
                  .includes(searchPair.toLocaleLowerCase()) ||
                pair.pairInfo?.ticker
                  ?.toLocaleLowerCase()
                  .includes(searchPair.toLocaleLowerCase())
            )
            .map((pair, index) => (
              <SelectOption value={pair.pairInfo?.address} key={String(index)}>
                <div className={styles.tickerIcons}>
                  {pair.tokensAlias.map((alias, aliasKey) => {
                    const key = String(index + aliasKey)

                    return alias?.logoUrl ? (
                      <img
                        key={key}
                        alt=""
                        src={alias.logoUrl}
                        width="24"
                        height="24"
                        className={styles.pairIcon}
                      />
                    ) : (
                      <Paper className={styles.pairIconUnknown} key={key}>
                        <Icon icon="unknownNetwork" width="16" height="16" />
                      </Paper>
                    )
                  })}
                </div>
                {pair.pairInfo?.ticker}
              </SelectOption>
            ))}
        </Select>
      </div>
      <div className={styles.content}>
        <Paper radius={8} className={styles.chart}>
          <div className={styles.chartHeader}>
            <div className={styles.ticker}>
              {currentPairObj && (
                <div className={styles.tickerIcons}>
                  {currentPairObj.tokensAlias.map((alias, index) =>
                    alias?.logoUrl ? (
                      <img
                        key={String(index)}
                        alt=""
                        src={alias.logoUrl}
                        width="24"
                        height="24"
                        className={styles.pairIcon}
                      />
                    ) : (
                      <Paper
                        className={styles.pairIconUnknown}
                        key={String(index)}
                      >
                        <Icon icon="unknownNetwork" width="16" height="16" />
                      </Paper>
                    )
                  )}
                </div>
              )}
              <Typography>{currentPairObj?.pairInfo?.ticker ?? '-'}</Typography>
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
                {bignumberUtils.format(
                  currentPairObj?.pricePercentCount?.h24,
                  undefined,
                  false
                )}
                % | $
                {bignumberUtils.format(
                  currentPairObj?.liquidityCount?.h24,
                  undefined,
                  false
                )}
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
                $
                {bignumberUtils.format(
                  currentPairObj?.volumeCount?.h24,
                  undefined,
                  false
                )}
              </Typography>
            </Typography>
            <Typography variant="body3" className={styles.chartMetric} as="div">
              <Typography
                variant="inherit"
                className={styles.chartTitle}
                as="div"
              >
                Liquidity
              </Typography>
              <Typography variant="inherit" as="div">
                $
                {bignumberUtils.format(
                  currentPairObj?.liquidity,
                  undefined,
                  false
                )}
              </Typography>
            </Typography>
            <Typography variant="body3" className={styles.chartMetric} as="div">
              <Typography
                variant="inherit"
                className={styles.chartTitle}
                as="div"
              >
                TXNS
              </Typography>
              <Typography variant="inherit" as="div">
                {bignumberUtils.format(
                  currentPairObj?.txsSellsCount.h24,
                  undefined,
                  false
                )}
              </Typography>
            </Typography>
          </div>
          <TradeChart
            className={styles.chartInner}
            address={
              config.IS_DEV &&
              currentPairObj?.pairInfo?.address === pairMock.pairInfo.address
                ? '0x0d4a11d5EEaaC28EC3F61d100daF4d40471f1852'
                : currentPairObj?.pairInfo?.address
            }
            loading={loadingExchanges || loadingPairs}
          />
        </Paper>
        <Paper radius={8} className={styles.selects}>
          <div
            className={clsx(
              styles.selectsBody,
              ((updating && !history) || !networkCorrect || !hasContract) &&
                styles.selectsBodyBlur
            )}
          >
            <div className={styles.tradeSelectHeader}>
              {([UserRoleEnum.Admin] as Array<string>).includes(
                String(user?.role)
              ) && (
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
              )}
              <Dropdown
                control={
                  <ButtonBase>
                    <Icon icon="settings" width={24} height={24} />
                  </ButtonBase>
                }
                placement="bottom-end"
                className={styles.transactionSettings}
              >
                <Typography
                  variant="body2"
                  className={styles.transactionSettingsTitle}
                >
                  Transaction Settings
                </Typography>
                <Typography
                  variant="body3"
                  className={styles.transactionSettingsRowTitle}
                >
                  Slippage
                </Typography>
                <div className={styles.transactionSettingsRow}>
                  <NumericalInput
                    size="small"
                    rightSide="%"
                    value={currentSlippage}
                    onChange={({ currentTarget }) =>
                      setCurrentSlippage(currentTarget.value)
                    }
                  />
                  <ButtonBase
                    className={styles.transactionSettingsButton}
                    onClick={() => setCurrentSlippage('1')}
                  >
                    Auto
                  </ButtonBase>
                </div>
                <Typography
                  variant="body3"
                  className={styles.transactionSettingsRowTitle}
                >
                  Transaction deadline
                </Typography>
                <div className={styles.transactionSettingsRow}>
                  <NumericalInput
                    size="small"
                    rightSide="min"
                    value={transactionDeadline}
                    onChange={({ currentTarget }) =>
                      setTransactionDeadline(currentTarget.value)
                    }
                  />
                  <TradePlusMinus
                    onPlus={(value) => setTransactionDeadline(String(value))}
                    onMinus={(value) => setTransactionDeadline(String(value))}
                    min={1}
                    max={100}
                    value={transactionDeadline}
                  />
                </div>
              </Dropdown>
            </div>
            {SelectComponents[currentSelect]}
          </div>
          {(!networkCorrect || (!hasContract && wallet?.network)) && (
            <div className={styles.beta}>
              <Typography
                variant="body2"
                align="center"
                family="mono"
                className={styles.betaTitle}
              >
                {!currentNetworkAndSelectedAreEqual &&
                  wallet &&
                  currentWallet && (
                    <>Please switch your wallet and switch network</>
                  )}
                {!currentNetworkCorrect && currentWallet && (
                  <>Please switch your network to continue</>
                )}
                {((wallet && !selectedNetworkCorrect) ||
                  (wallet && !hasContract)) && (
                  <>
                    {networksConfig[wallet.network]?.title} not supported.
                    Please switch your network
                  </>
                )}
                {!wallet && <>Please choose your wallet</>}
              </Typography>
              {wallet && (
                <Button
                  color="green"
                  className={styles.switchNetwork}
                  onClick={handleSwitchNetwork}
                  loading={switchNetworkState.loading}
                >
                  switch network
                </Button>
              )}
            </div>
          )}
        </Paper>
      </div>
      <TradeOrders
        onCancelOrder={handleCancelOrder}
        onUpdatePrice={handleUpdatePrice}
        updating={updating || cancelOrder.loading}
        router={adapter?.router}
        swap={adapter?.swap}
        exchangesMap={exchangesMap}
        transactionDeadline={transactionDeadline}
      />
    </AppLayout>
  )
}
