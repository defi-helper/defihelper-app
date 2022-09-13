import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import React, { useEffect, useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import {
  SmartTradeMockHandlerCallDataType,
  SmartTradeOrderStatusEnum,
  SmartTradeSwapHandlerCallDataType,
} from '~/api'

import { bignumberUtils } from '~/common/bignumber-utils'
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
import { Order } from '~/trade/common/trade.types'
import { TradeConfirmClaimDialog } from '~/trade/common/trade-confirm-claim-dialog'
import { SmartTradeRouter } from '~/common/load-adapter'
import * as styles from './trade-orders.css'
import * as model from './trade-orders.model'
import { Exchange } from '../common/trade.api'

export type TradeOrdersProps = {
  className?: string
  price: number
  onCancelOrder: (id: number | string) => Promise<void>
  onUpdatePrice?: () => void
  updating?: boolean
  router?: SmartTradeRouter['methods']
  exchangesMap: Map<string, Exchange>
}

enum Tabs {
  Active = 'active',
  History = 'history',
}

const hasBoughtPrice = (
  callData: Record<string, unknown>
): callData is SmartTradeSwapHandlerCallDataType => {
  return 'boughtPrice' in callData
}

const hasAmountIn = (
  callData: Record<string, unknown>
): callData is SmartTradeMockHandlerCallDataType => {
  return 'amountIn' in callData
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

export const TradeOrders: React.VFC<TradeOrdersProps> = (props) => {
  const orders = useStore(model.$orders)

  const loading = useStore(model.fetchOrdersFx.pending)
  const claimingOrder = useStore(model.$claimingOrder)

  const [currentTab, setCurrentTab] = useState(Tabs.Active)

  const [updatingOrderId, setUpdatingOrderId] = useState('')

  const [openTradeConfirmDialog] = useDialog(TradeConfirmClaimDialog)

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  const handleClaim = (order: Order) => async () => {
    if (!hasBoughtPrice(order.callData)) return

    const exchange = props.exchangesMap.get(order.callData.exchange)

    if (!exchange || !props.router) return

    const [tokenAddress] = order.callData.path.slice(-1)

    const balance = await props.router.balanceOf(tokenAddress)

    try {
      model.claimStarted(order.id)

      await openTradeConfirmDialog({
        order,
        exchange,
        totalRecieve: balance,
      })

      const res = await props.router?.refund(tokenAddress, '')

      await res?.tx?.wait()
    } catch {
      console.error('error')
    } finally {
      model.claimEnded()
    }
  }

  useEffect(() => {
    model.fetchOrdersFx({
      filter: {
        status: statuses[currentTab],
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
                  <Typography as="div" className={styles.tableHeadingsButton}>
                    Actions
                  </Typography>
                </div>
                {orders?.list.map((order) => {
                  const stopLossTakeProfit = hasBoughtPrice(order.callData)
                    ? bignumberUtils.minus(
                        props.price,
                        order.callData.boughtPrice
                      )
                    : '0'

                  const tokensAmountInOut = hasAmountIn(order.callData)
                    ? [order.callData.amountIn, order.callData.amountOut]
                    : [0, 0]

                  const updating =
                    props.updating && updatingOrderId === order.id

                  return (
                    <div
                      key={order.id}
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
                                icon={networksConfig[order.owner.network].icon}
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
                          {order.tokens.map(({ token }, index) => {
                            return (
                              <div
                                className={styles.contractBalance}
                                key={token.id}
                              >
                                {token.alias?.logoUrl ? (
                                  <img
                                    src={token.alias?.logoUrl}
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
                                  {bignumberUtils.format(
                                    tokensAmountInOut[index]
                                  )}{' '}
                                  {token.symbol}
                                </Typography>
                              </div>
                            )
                          })}
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
                        {false && (
                          <TradeStatusChart
                            stopLoss="100"
                            takeProfit="200"
                            buy="150"
                            className={styles.contractStatus}
                          />
                        )}
                        <div>
                          {order.status ===
                          SmartTradeOrderStatusEnum.Succeeded ? (
                            <>
                              {hasBoughtPrice(order.callData) && (
                                <Button
                                  color="green"
                                  onClick={handleClaim(order)}
                                  loading={claimingOrder === order.id}
                                  disabled={Boolean(
                                    claimingOrder.length &&
                                      claimingOrder !== order.id
                                  )}
                                >
                                  Claim
                                </Button>
                              )}
                            </>
                          ) : (
                            order.status
                          )}
                        </div>
                        <div>
                          <div className={styles.contractBalance}>
                            <Icon
                              className={styles.contractBalanceIcon}
                              icon="USDT"
                            />
                            <Typography className={styles.fs12} as="div">
                              {bignumberUtils.format(props.price)}
                            </Typography>
                          </div>
                          <div className={styles.contractBalance}>
                            <Typography className={styles.fs12} as="div">
                              {bignumberUtils.format(stopLossTakeProfit)}$ /{' '}
                              {bignumberUtils.format(
                                bignumberUtils.div(
                                  stopLossTakeProfit,
                                  props.price
                                )
                              )}
                              %
                            </Typography>
                          </div>
                        </div>
                        <div className={styles.contractActions}>
                          <ButtonBase onClick={handleUpdatePrice(order.id)}>
                            <Icon width={16} height={16} icon="swap" />
                          </ButtonBase>
                          <Dropdown
                            control={
                              <ButtonBase>
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
                              <ButtonBase
                                onClick={async () => {
                                  close()

                                  setUpdatingOrderId(order.id)

                                  props.onCancelOrder(order.number)
                                }}
                              >
                                Cancel order
                              </ButtonBase>
                            )}
                          </Dropdown>
                        </div>
                      </div>
                      {updating && (
                        <div className={styles.tableRowInnerLoader}>
                          <Loader height="1em" />
                        </div>
                      )}
                    </div>
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
