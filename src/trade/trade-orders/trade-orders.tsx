import clsx from 'clsx'
import { useStore } from 'effector-react'
import isEmpty from 'lodash.isempty'
import React, { useEffect, useState } from 'react'
import { Sticky, StickyContainer } from 'react-sticky'
import { SmartTradeSwapHandlerCallDataType } from '~/api'

import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { dateUtils } from '~/common/date-utils'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { TradeStatusChart } from '~/trade/common/trade-status-chart'
import * as styles from './trade-orders.css'
import * as model from './trade-orders.model'

export type TradeOrdersProps = {
  className?: string
  price: number
  onCancelOrder: (id: number | string) => void
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

export const TradeOrders: React.VFC<TradeOrdersProps> = (props) => {
  const orders = useStore(model.$orders)

  const [currentTab, setCurrentTab] = useState(Tabs.Active)

  const handleChangeTab = (tab: Tabs) => () => {
    setCurrentTab(tab)
  }

  useEffect(() => {
    model.fetchOrdersFx({})

    return () => {
      model.reset()
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
              <Input placeholder="Search" className={styles.search} />
              <div className={styles.actions}>
                <ButtonBase>
                  <Icon width={24} height={24} icon="swap" />
                </ButtonBase>
                <ButtonBase>
                  <Icon width={24} height={24} icon="arrowUp" />
                </ButtonBase>
              </div>
            </Paper>
          )}
        </Sticky>
        <div className={styles.body}>
          <div className={styles.bodyInner}>
            {isEmpty(orders?.list) && (
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

                  return (
                    <div key={order.id} className={styles.tableRow}>
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
                                    className={styles.contractUnknownTokenIcon}
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
                        <Typography className={styles.contractAddress} as="div">
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
                            {cutAccount(order.owner.address)}
                          </Link>
                        </Typography>
                      </div>
                      <div>
                        {order.tokens.map(({ token }) => (
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
                              {bignumberUtils.format('0')} {token.symbol}
                            </Typography>
                          </div>
                        ))}
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
                      <div />
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
                        <ButtonBase>
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
                          <ButtonBase
                            onClick={() => props.onCancelOrder(order.number)}
                          >
                            Cancel order
                          </ButtonBase>
                        </Dropdown>
                      </div>
                    </div>
                  )
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </StickyContainer>
  )
}
