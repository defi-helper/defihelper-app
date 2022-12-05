import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'
import React, { useEffect, useMemo, useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import contracts from '@defihelper/networks/contracts.json'

import { bignumberUtils } from '~/common/bignumber-utils'
import {
  SmartTradeOrderListSortInputTypeColumnEnum,
  SmartTradeOrderStatusEnum,
  SmartTradeOrderTokenLinkTypeEnum,
  SortOrderEnum,
} from '~/api'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { dateUtils } from '~/common/date-utils'
import { useDialog } from '~/common/dialog'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { TradeStatusChart } from '~/trade/common/trade-status-chart'
import { hasBoughtPrice, Order } from '~/trade/common/trade.types'
import { Exchange, tradeApi } from '~/trade/common/trade.api'
import { TradeOrderDeposit } from '~/trade/common/trade-order-deposit'
import { useWalletConnect, WalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
import { switchNetwork } from '~/wallets/common'
import {
  SettingsSuccessDialog,
  TransactionEnum,
  SettingsWalletBalanceDialog,
  useOnBillingTransferCreatedSubscription,
  useOnBillingTransferUpdatedSubscription,
} from '~/settings/common'
import { analytics } from '~/analytics'
import { SmartTradeRouter, SmartTradeSwapHandler } from '~/common/load-adapter'
import { useQueryParams } from '~/common/hooks'
import { config } from '~/config'
import { useTradeUpdated } from '../common/subscriptions'
import { StakingErrorDialog } from '~/staking/common'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { authModel } from '~/auth'
import { TradeEditDialog } from '~/trade/common/trade-edit-dialog'
import * as styles from './trade-orders.css'
import * as model from './trade-orders.model'

export type TradeOrdersProps = {
  className?: string
  onCancelOrder: (values: {
    orderNumber: number | string
    id: string
  }) => Promise<void>
  onUpdatePrice?: () => void
  updating?: boolean
  router?: SmartTradeRouter['methods']
  swap?: SmartTradeSwapHandler['methods']
  exchangesMap: Map<string, Exchange>
  transactionDeadline: string
}

enum Tabs {
  Active = 'active',
  History = 'history',
}

const statuses = {
  [Tabs.Active]: [
    SmartTradeOrderStatusEnum.Pending,
    SmartTradeOrderStatusEnum.Succeeded,
  ],
  [Tabs.History]: [
    SmartTradeOrderStatusEnum.Processed,
    SmartTradeOrderStatusEnum.Canceled,
  ],
}

const titles: Record<string, string> = {
  [SmartTradeOrderStatusEnum.Canceled]: 'Order cancelled by user',
  [SmartTradeOrderStatusEnum.Succeeded]: 'Stop loss finished',
  completed: 'Stop loss completed',
}

export const TradeOrders: React.VFC<TradeOrdersProps> = (props) => {
  const [currentTab, setCurrentTab] = useState(Tabs.Active)

  const queryParams = useQueryParams()

  const history = useHistory()

  const goerliPrice = Array.from(queryParams, ([title, price]) => ({
    price,
    id: title.replace('price', '').replace('[', '').replace(']', ''),
  })).reduce<Record<string, string>>((acc, item) => {
    acc[item.id] = item.price

    return acc
  }, {})

  const orders = useStore(model.$ordersWithPrice)

  const loading = useStore(model.fetchOrdersFx.pending)
  const claimingOrder = useStore(model.$claimingOrder)
  const depositingOrder = useStore(model.$depositingOrder)
  const editingBoughtPrice = useStore(model.$editingBoughtPrice)

  const [updatingOrderId, setUpdatingOrderId] = useState('')

  const [openTradeEditDialog] = useDialog(TradeEditDialog)
  const [openErrorDialog] = useDialog(StakingErrorDialog)
  const [openSuccess] = useDialog(SettingsSuccessDialog)
  const [openBalanceDialog] = useDialog(SettingsWalletBalanceDialog)

  const handleConnect = useWalletConnect()
  const currentWallet = walletNetworkModel.useWalletNetwork()

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const handleClaim = (order: Order) => async () => {
    if (!hasBoughtPrice(order.callData) || !props.router) return

    try {
      model.claimStarted(order.id)

      const refund = order.callData.path.map((token) => ({ token, amount: '' }))

      const canRefund = await props.router.canRefund(order.number, refund)

      if (canRefund instanceof Error) throw canRefund

      const res = await props.router.refund(order.number, refund)

      await res.tx?.wait()

      model.claimOrderFx({
        id: order.id,
      })
    } catch {
      console.error('error')
    } finally {
      model.claimEnded()
    }
  }

  const handleCloseOnMarket = (order: Order) => async () => {
    if (!hasBoughtPrice(order.callData) || !props.router) return

    try {
      const res = await props.swap?.emergencyHandleOrder(
        order.number,
        dateUtils.toDate(
          dateUtils.addDate(Number(props.transactionDeadline), 'minutes')
        )
      )

      if (!res?.tx?.hash) return

      model.closeOnMarketFx({
        id: order.id,
        input: {
          tx: res.tx.hash,
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    model.fetchOrdersFx({
      filter: {
        claim: currentTab === Tabs.History,
      },
      sort:
        currentTab === Tabs.Active
          ? {
              column: SmartTradeOrderListSortInputTypeColumnEnum.CreatedAt,
              order: SortOrderEnum.Desc,
            }
          : {
              column: SmartTradeOrderListSortInputTypeColumnEnum.UpdatedAt,
              order: SortOrderEnum.Desc,
            },
    })

    return () => {
      model.reset()
    }
  }, [currentTab])

  const handleUpdatePrice = (orderId?: string) => () => {
    props.onUpdatePrice?.()

    if (!orderId) return

    setUpdatingOrderId(orderId)
  }

  useEffect(() => {
    if (props.updating) return

    setUpdatingOrderId('')
  }, [updatingOrderId, props.updating])

  const handleDeposit =
    (order: Exclude<typeof orders, null>['list'][number]) => async () => {
      try {
        model.depositStarted(order.id)

        analytics.log('settings_wallet_defihelper_balance_top_up_click')
        await switchNetwork(order.owner.network)

        if (!currentWallet?.chainId) return

        const balanceAdapter = await settingsWalletModel.loadAdapterFx({
          provider: currentWallet.provider,
          chainId: currentWallet.chainId,
          type:
            'BalanceUpgradable' in
            contracts[order.owner.network as keyof typeof contracts]
              ? 'BalanceUpgradable'
              : 'Balance',
        })

        const billingBalance = await settingsWalletModel.fetchBillingBalanceFx({
          blockchain: order.owner.blockchain,
          network: order.owner.network,
        })

        const result = await openBalanceDialog({
          adapter: balanceAdapter,
          recomendedIncome: billingBalance.recomendedIncome,
          priceUSD: billingBalance.priceUSD,
          wallet: order.owner.address,
          network: order.owner.network,
          token: billingBalance.token,
        })

        await settingsWalletModel.depositFx({
          blockchain: order.owner.blockchain,
          amount: result.amount,
          walletAddress: order.owner.address,
          chainId: String(currentWallet.chainId),
          provider: currentWallet.provider,
          transactionHash: result.transactionHash,
        })

        await openSuccess({
          type: TransactionEnum.deposit,
        })
      } catch (error) {
        console.error(error)
      } finally {
        model.depositEnded()
      }
    }

  const handleEditOrder =
    (order: Exclude<typeof orders, null>['list'][number]) => () => {
      const { callData } = order

      if (!hasBoughtPrice(callData)) return

      model.editOrderStart(order)

      history.replace({
        search: `exchange=${callData.exchange}&pair=${callData.pair}&network=${order.owner.network}`,
      })
    }

  const handleEnterBoughtPrice =
    (
      order: Exclude<typeof orders, null>['list'][number],
      currentPrice?: string
    ) =>
    async () => {
      if (!hasBoughtPrice(order.callData)) return

      try {
        model.editBoughtPriceStarted(order.id)

        const [tokenAddress] = order.callData.path.slice(-1)

        const exchange = props.exchangesMap.get(order.callData.exchange)

        const pairs = await tradeApi.pairs([], [order.callData.exchange])

        const pair = pairs.data.list.find(({ pairInfo }) =>
          pairInfo.tokens.some(
            ({ address }) =>
              address.toLowerCase() === tokenAddress.toLowerCase()
          )
        )

        const token = pair?.pairInfo.tokens.find(
          ({ address }) => address.toLowerCase() === tokenAddress.toLowerCase()
        )

        const result = await openTradeEditDialog({
          order,
          exchange,
          boughtToken: token,
          currentPrice,
        })

        await model.updateBoughtPriceFx({
          id: order.id,
          input: {
            callData: {
              boughtPrice: result,
            },
          },
        })
      } catch (error) {
        console.error(error)
      } finally {
        model.editBoughtPriceEnded()
      }
    }

  const handleWrongAddress =
    (order: typeof orders.list[number]) => async () => {
      openErrorDialog({
        contractName:
          order.tokens.map(({ token }) => token.symbol).join('/') ?? '',
        address: order.owner.address,
        network: order.owner.network,
      }).catch(console.error)
    }

  const handleSwitchNetwork = (order: typeof orders.list[number]) => () =>
    switchNetwork(order.owner.network).catch(console.error)

  const user = useStore(authModel.$user)

  const variables = useMemo(() => {
    if (!user) return undefined

    return {
      user: [user.id],
    }
  }, [user])
  const variablesTradeUpdated = useMemo(() => {
    if (!user) return undefined

    return {
      user: user.id,
    }
  }, [user])

  useOnBillingTransferCreatedSubscription(({ data }) => {
    if (data?.onBillingTransferCreated.id) {
      model.fetchOrdersFx({
        filter: {
          claim: currentTab === Tabs.History,
        },
        sort:
          currentTab === Tabs.Active
            ? {
                column: SmartTradeOrderListSortInputTypeColumnEnum.CreatedAt,
                order: SortOrderEnum.Desc,
              }
            : {
                column: SmartTradeOrderListSortInputTypeColumnEnum.UpdatedAt,
                order: SortOrderEnum.Desc,
              },
      })
    }
  }, variables)
  useOnBillingTransferUpdatedSubscription(({ data }) => {
    if (!props.swap) return

    if (data?.onBillingTransferUpdated.id) {
      model.fetchOrdersFx({
        filter: {
          claim: currentTab === Tabs.History,
        },
        sort:
          currentTab === Tabs.Active
            ? {
                column: SmartTradeOrderListSortInputTypeColumnEnum.CreatedAt,
                order: SortOrderEnum.Desc,
              }
            : {
                column: SmartTradeOrderListSortInputTypeColumnEnum.UpdatedAt,
                order: SortOrderEnum.Desc,
              },
      })
    }
  }, variables)

  useTradeUpdated(({ data }) => {
    if (!data?.onSmartTradeOrderUpdated) {
      return
    }

    model.updatedOrder(data.onSmartTradeOrderUpdated)
  }, variablesTradeUpdated)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (!event.data) return

      const { data } = JSON.parse(event.data)

      if (isEmpty(data.pricesUsd)) return

      model.priceUpdated()
    }

    model.webSocket.addEventListener('message', onMessage)

    return () => {
      model.webSocket.removeEventListener('message', onMessage)
    }
  }, [])

  return (
    <StickyContainer>
      <div className={clsx(styles.root, props.className)}>
        <Sticky>
          {({ style }) => (
            <Paper radius={8} className={styles.header} style={style}>
              <Typography variant="h4" className={styles.title}>
                Orders
              </Typography>
              <Paper className={styles.tabs} radius={8}>
                {Object.entries(Tabs).map(([key, value]) => (
                  <ButtonBase
                    key={value}
                    className={clsx(
                      styles.tabsItem,
                      value === currentTab && styles.tabsItemActive
                    )}
                    onClick={handleChangeTab(value)}
                  >
                    {key}
                  </ButtonBase>
                ))}
              </Paper>
              {false && (
                <Input placeholder="Search" className={styles.search} />
              )}
              <div className={styles.actions}>
                <ButtonBase
                  onClick={handleUpdatePrice()}
                  className={styles.updatePrice}
                >
                  <Icon width={24} height={24} icon="swap" />
                </ButtonBase>
                {false && (
                  <ButtonBase>
                    <Icon width={24} height={24} icon="arrowUp" />
                  </ButtonBase>
                )}
              </div>
            </Paper>
          )}
        </Sticky>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            {isEmpty(orders?.list) && !loading && (
              <div className={styles.noOrders}>
                <Icon icon="order" />
                <Typography variant="body3" align="center">
                  Your open orders will be here
                </Typography>
              </div>
            )}
            {!isEmpty(orders?.list) && (
              <>
                <div className={styles.tableHeadings}>
                  <Typography
                    as={ButtonBase}
                    className={styles.tableHeadingsButton}
                  >
                    Pair
                  </Typography>
                  <Typography
                    as={ButtonBase}
                    className={styles.tableHeadingsButton}
                  >
                    Volume
                  </Typography>
                  <Typography
                    as={ButtonBase}
                    className={styles.tableHeadingsButton}
                  >
                    Created Date
                  </Typography>
                  <Typography
                    as={ButtonBase}
                    className={styles.tableHeadingsButton}
                  >
                    Status
                  </Typography>
                  <Typography
                    as={ButtonBase}
                    className={styles.tableHeadingsButton}
                  >
                    Profit/Loss
                  </Typography>
                  {currentTab === Tabs.Active && (
                    <Typography as="div" className={styles.tableHeadingsButton}>
                      Actions
                    </Typography>
                  )}
                </div>
                {orders?.list.map((order) => {
                  const callDataWithBoughtPrice = hasBoughtPrice(order.callData)
                    ? order.callData
                    : null

                  const boughtPrice = callDataWithBoughtPrice?.boughtPrice

                  const tokensAmountInOut = callDataWithBoughtPrice?.amountIn

                  const updating =
                    props.updating && updatingOrderId === order.id

                  const deposit = currentWallet
                    ? handleDeposit(order)
                    : handleConnect

                  const { balances } = order

                  const tokenIn = order.tokens.find(
                    ({ type }) => type === SmartTradeOrderTokenLinkTypeEnum.In
                  )
                  const orderTokenOut = order.tokens.find(
                    ({ type }) => type === SmartTradeOrderTokenLinkTypeEnum.Out
                  )

                  const usdPrice =
                    order.price?.actualPrice[
                      tokenIn?.token.address.toLowerCase() ?? ''
                    ]?.usd_price

                  const actualPrice = bignumberUtils.div(
                    order.price?.actualPrice[
                      tokenIn?.token.address.toLowerCase() ?? ''
                    ]?.usd_price,
                    order.price?.actualPrice[
                      orderTokenOut?.token.address.toLowerCase() ?? ''
                    ]?.usd_price
                  )

                  const stringPrice =
                    usdPrice !== undefined ? String(actualPrice) : undefined

                  const price =
                    order.owner.network === '5' && config.IS_DEV
                      ? goerliPrice[order.number]
                      : stringPrice

                  const currentPrice =
                    callDataWithBoughtPrice?.swapPrice ?? price

                  const percent = bignumberUtils.eq(boughtPrice, 0)
                    ? '0'
                    : bignumberUtils.mul(
                        bignumberUtils.div(
                          bignumberUtils.minus(currentPrice, boughtPrice),
                          boughtPrice
                        ),
                        100
                      )

                  const wrongAccount =
                    currentWallet?.account !== order.owner.address &&
                    currentWallet?.chainId !== order.owner.network

                  const wrongNetwork =
                    String(currentWallet?.chainId) !== order.owner.network
                      ? handleSwitchNetwork(order)
                      : null

                  const claim =
                    wrongNetwork ??
                    (wrongAccount
                      ? handleWrongAddress(order)
                      : handleClaim(order))

                  const cancel =
                    wrongNetwork ??
                    (wrongAccount
                      ? handleWrongAddress(order)
                      : async () => {
                          setUpdatingOrderId(order.id)

                          props.onCancelOrder({
                            orderNumber: order.number,
                            id: order.id,
                          })
                        })

                  const edit =
                    wrongNetwork ??
                    (wrongAccount
                      ? handleWrongAddress(order)
                      : handleEditOrder(order))

                  const closeOnMarket =
                    wrongNetwork ??
                    (wrongAccount
                      ? handleWrongAddress(order)
                      : handleCloseOnMarket(order))

                  const tokenOut = balances.find(
                    ({ token }) =>
                      token.address.toLowerCase() !==
                      tokenIn?.token.address.toLowerCase()
                  )

                  const profit = bignumberUtils.minus(
                    bignumberUtils.mul(tokensAmountInOut, currentPrice),
                    bignumberUtils.mul(tokensAmountInOut, boughtPrice)
                  )

                  const claimButton =
                    (order.status === SmartTradeOrderStatusEnum.Succeeded &&
                      !order.claim) ||
                    (order.closed && !order.claim) ? (
                      <WalletConnect
                        fallback={<Button color="green">Claim</Button>}
                      >
                        <Button
                          color="green"
                          onClick={claim}
                          loading={claimingOrder === order.id}
                          disabled={Boolean(
                            claimingOrder.length && claimingOrder !== order.id
                          )}
                        >
                          Claim
                        </Button>
                      </WalletConnect>
                    ) : (
                      <>
                        {callDataWithBoughtPrice &&
                          [
                            SmartTradeOrderStatusEnum.Pending,
                            SmartTradeOrderStatusEnum.Processed,
                          ].includes(order.status) && (
                            <TradeStatusChart
                              stopLoss={bignumberUtils.div(
                                callDataWithBoughtPrice.stopLoss?.amountOut,
                                callDataWithBoughtPrice.amountIn
                              )}
                              takeProfit={bignumberUtils.div(
                                callDataWithBoughtPrice.takeProfit?.amountOut,
                                callDataWithBoughtPrice.amountIn
                              )}
                              buy={boughtPrice ?? undefined}
                              profit={currentPrice}
                              className={styles.contractStatus}
                              moving={callDataWithBoughtPrice.stopLoss?.moving}
                              percent={bignumberUtils.toFixed(percent, 4)}
                            />
                          )}
                      </>
                    )

                  return (
                    <TradeOrderDeposit
                      key={order.id}
                      lowBalance={
                        order.owner.billing.balance.lowFeeFunds &&
                        statuses[Tabs.Active].includes(order.status)
                      }
                      onDeposit={deposit}
                      depositing={depositingOrder === order.id}
                    >
                      <div
                        className={clsx(
                          styles.tableRow,
                          updating && styles.tableRowLoader
                        )}
                      >
                        <div className={styles.tableRowInner}>
                          <div>
                            <Typography
                              variant="body2"
                              as="div"
                              className={styles.contractName}
                            >
                              <div className={styles.contractIcons}>
                                {order.tokens.map(({ token }) => (
                                  <React.Fragment key={token.id}>
                                    {token.alias?.logoUrl ? (
                                      <img
                                        src={token.alias?.logoUrl}
                                        className={styles.contractIcon}
                                        alt=""
                                      />
                                    ) : (
                                      <Paper
                                        className={
                                          styles.contractUnknownTokenIcon
                                        }
                                      >
                                        <Icon
                                          icon="unknownNetwork"
                                          width="16"
                                          height="16"
                                        />
                                      </Paper>
                                    )}
                                  </React.Fragment>
                                ))}
                              </div>
                              {order.tokens
                                .map(({ token }) => token.symbol)
                                .join('/')}
                            </Typography>
                            <Typography
                              className={styles.contractAddress}
                              as="div"
                            >
                              {networksConfig[order.owner.network] && (
                                <Icon
                                  icon={
                                    networksConfig[order.owner.network].icon
                                  }
                                  width="22"
                                  height="22"
                                />
                              )}
                              <Link
                                href={buildExplorerUrl({
                                  address: order.owner.address,
                                  network: order.owner.network,
                                })}
                                target="_blank"
                              >
                                {order.owner.name}
                              </Link>
                            </Typography>
                          </div>
                          <div>
                            <div className={styles.contractBalance}>
                              {tokenIn?.token.alias?.logoUrl ? (
                                <img
                                  src={tokenIn.token.alias?.logoUrl}
                                  className={styles.contractBalanceIcon}
                                  alt=""
                                />
                              ) : (
                                <Paper className={styles.contractBalanceIcon}>
                                  <Icon
                                    icon="unknownNetwork"
                                    width="16"
                                    height="16"
                                  />
                                </Paper>
                              )}
                              <Typography className={styles.fs12} as="div">
                                {tokensAmountInOut
                                  ? bignumberUtils.toFixed(tokensAmountInOut, 4)
                                  : '-'}{' '}
                                {tokenIn?.token.symbol}
                              </Typography>
                            </div>
                            {Boolean(balances.length) &&
                              order.status ===
                                SmartTradeOrderStatusEnum.Succeeded && (
                                <div className={styles.contractBalance}>
                                  {tokenOut?.token.alias?.logoUrl ? (
                                    <img
                                      src={tokenOut?.token.alias?.logoUrl}
                                      className={styles.contractBalanceIcon}
                                      alt=""
                                    />
                                  ) : (
                                    <Paper
                                      className={styles.contractBalanceIcon}
                                    >
                                      <Icon
                                        icon="unknownNetwork"
                                        width="16"
                                        height="16"
                                      />
                                    </Paper>
                                  )}
                                  <Typography className={styles.fs12} as="div">
                                    {tokenOut?.balance
                                      ? bignumberUtils.toFixed(
                                          tokenOut?.balance,
                                          4
                                        )
                                      : '-'}{' '}
                                    {tokenOut?.token.symbol}
                                  </Typography>
                                </div>
                              )}
                          </div>
                          <div>
                            <div className={styles.contractBalance}>
                              <Typography className={styles.fs12} as="div">
                                {dateUtils.format(
                                  order.createdAt,
                                  'DD/MM/YY  h:mma'
                                )}
                              </Typography>
                            </div>
                            <div className={styles.contractBalance}>
                              <Typography className={styles.fs12} as="div">
                                ID {order.number}
                              </Typography>
                            </div>
                          </div>
                          <div>
                            {order.closed &&
                              order.status ===
                                SmartTradeOrderStatusEnum.Succeeded && (
                                <div className={styles.claim}>
                                  <Typography
                                    variant="body3"
                                    className={clsx(styles.status, {
                                      [styles.positive]: bignumberUtils.gt(
                                        percent,
                                        0
                                      ),
                                      [styles.negative]: bignumberUtils.lt(
                                        percent,
                                        0
                                      ),
                                    })}
                                  >
                                    Order closed by market price
                                    {boughtPrice && (
                                      <>
                                        {' '}
                                        : {bignumberUtils.toFixed(percent, 4)}%
                                      </>
                                    )}
                                  </Typography>
                                  {claimButton}
                                </div>
                              )}
                            {!order.closed && (
                              <div className={styles.claim}>
                                {callDataWithBoughtPrice &&
                                  (order.claim ||
                                    (order.status ===
                                      SmartTradeOrderStatusEnum.Succeeded &&
                                      !order.claim)) &&
                                  ![
                                    SmartTradeOrderStatusEnum.Pending,
                                    SmartTradeOrderStatusEnum.Processed,
                                  ].includes(order.status) && (
                                    <Typography
                                      variant="body3"
                                      className={clsx(styles.status, {
                                        [styles.positive]: bignumberUtils.gt(
                                          percent,
                                          0
                                        ),
                                        [styles.negative]: bignumberUtils.lt(
                                          percent,
                                          0
                                        ),
                                      })}
                                    >
                                      {!order.claim &&
                                      order.status ===
                                        SmartTradeOrderStatusEnum.Succeeded
                                        ? titles.completed
                                        : titles[order.status]}
                                      {order.status ===
                                      SmartTradeOrderStatusEnum.Canceled
                                        ? null
                                        : `: ${bignumberUtils.toFixed(
                                            percent,
                                            4
                                          )}%`}
                                    </Typography>
                                  )}
                                {claimButton}
                              </div>
                            )}
                          </div>
                          {order.status !==
                            SmartTradeOrderStatusEnum.Canceled && (
                            <div>
                              {boughtPrice ? (
                                <>
                                  <div className={styles.contractBalance}>
                                    {tokenOut?.token.alias?.logoUrl ? (
                                      <img
                                        src={tokenOut?.token.alias?.logoUrl}
                                        className={styles.contractBalanceIcon}
                                        alt=""
                                      />
                                    ) : (
                                      <Paper
                                        className={styles.contractBalanceIcon}
                                      >
                                        <Icon
                                          icon="unknownNetwork"
                                          width="16"
                                          height="16"
                                        />
                                      </Paper>
                                    )}
                                    <Typography
                                      className={clsx(styles.fs12, {
                                        [styles.positive]: bignumberUtils.gt(
                                          percent,
                                          0
                                        ),
                                        [styles.negative]: bignumberUtils.lt(
                                          percent,
                                          0
                                        ),
                                      })}
                                      as="div"
                                    >
                                      {bignumberUtils.gt(percent, 0) && '+'}
                                      {bignumberUtils.toFixed(profit, 4)}
                                    </Typography>
                                  </div>
                                  {currentPrice && (
                                    <div className={styles.contractBalance}>
                                      <Typography
                                        className={clsx(styles.fs12, {
                                          [styles.positive]: bignumberUtils.gt(
                                            percent,
                                            0
                                          ),
                                          [styles.negative]: bignumberUtils.lt(
                                            percent,
                                            0
                                          ),
                                        })}
                                        as="div"
                                      >
                                        {bignumberUtils.gt(percent, 0) && '+'}
                                        {bignumberUtils.toFixed(profit, 4)}
                                      </Typography>
                                    </div>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Typography
                                    variant="body3"
                                    className={styles.boughtPrice}
                                  >
                                    Bought price
                                    <Dropdown
                                      control={
                                        <ButtonBase>
                                          <Icon
                                            icon="question"
                                            width={16}
                                            height={16}
                                          />
                                        </ButtonBase>
                                      }
                                      offset={[0, 8]}
                                    >
                                      <Typography variant="body3">
                                        Enter the Bought price to see your
                                        profit
                                      </Typography>
                                    </Dropdown>
                                  </Typography>
                                  <Button
                                    color="green"
                                    loading={editingBoughtPrice === order.id}
                                    onClick={handleEnterBoughtPrice(
                                      order,
                                      currentPrice
                                    )}
                                    size="small"
                                  >
                                    Enter
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                          {statuses[Tabs.Active].includes(order.status) && (
                            <div className={styles.contractActions}>
                              <ButtonBase onClick={handleUpdatePrice(order.id)}>
                                <Icon width={16} height={16} icon="swap" />
                              </ButtonBase>
                              <Dropdown
                                control={
                                  <ButtonBase
                                    disabled={
                                      order.status ===
                                      SmartTradeOrderStatusEnum.Processed
                                    }
                                  >
                                    <Icon
                                      width={16}
                                      height={16}
                                      icon="dots"
                                      className={styles.dots}
                                    />
                                  </ButtonBase>
                                }
                              >
                                {(close) => (
                                  <>
                                    <WalletConnect
                                      fallback={
                                        <ButtonBase>Cancel order</ButtonBase>
                                      }
                                    >
                                      <ButtonBase
                                        onClick={async () => {
                                          close()

                                          cancel()
                                        }}
                                      >
                                        Cancel order
                                      </ButtonBase>
                                    </WalletConnect>
                                    {order.status ===
                                      SmartTradeOrderStatusEnum.Pending && (
                                      <WalletConnect
                                        fallback={
                                          <ButtonBase>Edit order</ButtonBase>
                                        }
                                      >
                                        <ButtonBase
                                          onClick={() => {
                                            edit()

                                            close()
                                          }}
                                        >
                                          Edit order
                                        </ButtonBase>
                                      </WalletConnect>
                                    )}
                                    <WalletConnect
                                      fallback={
                                        <ButtonBase>Close on market</ButtonBase>
                                      }
                                    >
                                      <ButtonBase
                                        onClick={() => {
                                          closeOnMarket()

                                          close()
                                        }}
                                      >
                                        Close on market
                                      </ButtonBase>
                                    </WalletConnect>
                                    <ButtonBase
                                      onClick={() => {
                                        handleEnterBoughtPrice(order)

                                        close()
                                      }}
                                    >
                                      Edit bought price
                                    </ButtonBase>
                                  </>
                                )}
                              </Dropdown>
                            </div>
                          )}
                        </div>
                        {updating && (
                          <div className={styles.tableRowInnerLoader}>
                            <Loader height="1em" />
                          </div>
                        )}
                      </div>
                    </TradeOrderDeposit>
                  )
                })}
              </>
            )}
            {loading && (
              <div className={styles.loader}>
                <Loader height="36" />
              </div>
            )}
          </div>
        </div>
      </div>
    </StickyContainer>
  )
}
