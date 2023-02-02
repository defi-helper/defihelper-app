import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import { useHistory } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import contracts from '@defihelper/networks/contracts.json'

import {
  SmartTradeOrderListSortInputTypeColumnEnum,
  SortOrderEnum,
} from '~/api'
import { ButtonBase } from '~/common/button-base'
import { dateUtils } from '~/common/date-utils'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { hasBoughtPrice, Order } from '~/trade/common/trade.types'
import { Exchange, tradeApi } from '~/trade/common/trade.api'
import { TradeOrderDeposit } from '~/trade/common/trade-order-deposit'
import { useWalletConnect } from '~/wallets/wallet-connect'
import { walletNetworkModel } from '~/wallets/wallet-networks'
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
import { useTradeUpdated } from '~/trade/common/subscriptions'
import { StakingErrorDialog } from '~/staking/common'
import * as settingsWalletModel from '~/settings/settings-wallets/settings-wallets.model'
import { authModel } from '~/auth'
import { TradeEditDialog } from '~/trade/common/trade-edit-dialog'
import { statuses, Tabs } from '~/trade/common/constants'
import { TradeOrderCard } from '~/trade/common/trade-order-card'
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

        await openBalanceDialog({
          adapter: balanceAdapter,
          recomendedIncome: billingBalance.recomendedIncome,
          priceUSD: billingBalance.priceUSD,
          wallet: order.owner.address,
          network: order.owner.network,
          token: billingBalance.token,
          onSubmit: (result) => {
            if (!currentWallet.account) return

            settingsWalletModel.depositFx({
              blockchain: order.owner.blockchain,
              amount: result.amount,
              walletAddress: order.owner.address,
              chainId: String(currentWallet.chainId),
              provider: currentWallet.provider,
              transactionHash: result.transactionHash,
            })
          },
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
    (order: Exclude<typeof orders, null>['list'][number]) =>
    async (currentPrice?: string) => {
      if (!hasBoughtPrice(order.callData)) return

      try {
        model.editBoughtPriceStarted(order.id)

        const [tokenAddress] = order.callData.path.slice(-1)

        const exchange = props.exchangesMap.get(order.callData.exchange)

        const pairs = await tradeApi.pairs({
          network: [],
          pool: [order.callData.exchange],
        })

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
                  const updating =
                    props.updating && updatingOrderId === order.id

                  const deposit = currentWallet
                    ? handleDeposit(order)
                    : handleConnect

                  const wrongAccount =
                    currentWallet?.account !== order.owner.address &&
                    currentWallet?.chainId !== order.owner.network

                  const claim = wrongAccount
                    ? handleWrongAddress(order)
                    : handleClaim(order)

                  const cancel = wrongAccount
                    ? handleWrongAddress(order)
                    : async () => {
                        setUpdatingOrderId(order.id)

                        props.onCancelOrder({
                          orderNumber: order.number,
                          id: order.id,
                        })
                      }

                  const edit = wrongAccount
                    ? handleWrongAddress(order)
                    : handleEditOrder(order)

                  const closeOnMarket = wrongAccount
                    ? handleWrongAddress(order)
                    : handleCloseOnMarket(order)

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
                      <TradeOrderCard
                        updating={updating}
                        claimingOrder={claimingOrder === order.id}
                        claimingDisabled={Boolean(
                          claimingOrder.length && claimingOrder !== order.id
                        )}
                        editingBoughtPrice={editingBoughtPrice === order.id}
                        onCloseMarket={closeOnMarket}
                        onEdit={edit}
                        onCancel={cancel}
                        onClaim={claim}
                        order={order}
                        goerliPrice={goerliPrice}
                        onEditBoughtPrice={handleEnterBoughtPrice(order)}
                        onUpdatePrice={handleUpdatePrice(order.id)}
                        network={order.owner.network}
                      />
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
