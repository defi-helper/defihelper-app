import clsx from 'clsx'
import React from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import {
  SmartTradeOrderStatusEnum,
  SmartTradeOrderTokenLinkTypeEnum,
  TradeOrderFragmentFragment,
} from '~/api'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { dateUtils } from '~/common/date-utils'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Loader } from '~/common/loader'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { WalletConnect } from '~/wallets/wallet-connect'
import { statuses, Tabs } from '~/trade/common/constants'
import { hasBoughtPrice } from '~/trade/common/trade.types'
import { config } from '~/config'
import { TradeStatusChart } from '~/trade/common/trade-status-chart'
import * as styles from './trade-order-card.css'

export type TradeOrderCardProps = {
  updating?: boolean
  order: TradeOrderFragmentFragment & {
    price: {
      id: string
      path: string[]
      actualPrice: {
        [k: string]: {
          type: string
          name: string
          usd_price: number
        }
      }
    }
  }
  editingBoughtPrice: boolean
  goerliPrice: Record<string, string>
  claimingOrder: boolean
  claimingDisabled: boolean
  onEditBoughtPrice: (currentPrice?: string) => void
  onCloseMarket: () => void
  onCancel: () => void
  onClaim: () => void
  onEdit: () => void
  onUpdatePrice: () => void
}

const titles: Record<string, string> = {
  [SmartTradeOrderStatusEnum.Canceled]: 'Order cancelled by user',
  [SmartTradeOrderStatusEnum.Succeeded]: 'Stop loss finished',
  completed: 'Stop loss completed',
}

export const TradeOrderCard: React.VFC<TradeOrderCardProps> = (props) => {
  const { order, goerliPrice } = props

  const { balances } = order

  const callDataWithBoughtPrice = hasBoughtPrice(order.callData)
    ? order.callData
    : null

  const boughtPrice = callDataWithBoughtPrice?.boughtPrice

  const tokensAmountInOut = callDataWithBoughtPrice?.amountIn

  const tokenIn = order.tokens.find(
    ({ type }) => type === SmartTradeOrderTokenLinkTypeEnum.In
  )
  const orderTokenOut = order.tokens.find(
    ({ type }) => type === SmartTradeOrderTokenLinkTypeEnum.Out
  )

  const usdPrice =
    order.price?.actualPrice[tokenIn?.token.address.toLowerCase() ?? '']
      ?.usd_price

  const actualPrice = bignumberUtils.div(
    order.price?.actualPrice[tokenIn?.token.address.toLowerCase() ?? '']
      ?.usd_price,
    order.price?.actualPrice[orderTokenOut?.token.address.toLowerCase() ?? '']
      ?.usd_price
  )

  const stringPrice = usdPrice !== undefined ? String(actualPrice) : undefined

  const price =
    order.owner.network === '5' && config.IS_DEV
      ? goerliPrice[order.number]
      : stringPrice

  const currentPrice = callDataWithBoughtPrice?.swapPrice ?? price

  const percent = bignumberUtils.eq(boughtPrice, 0)
    ? '0'
    : bignumberUtils.mul(
        bignumberUtils.div(
          bignumberUtils.minus(currentPrice, boughtPrice),
          boughtPrice
        ),
        100
      )

  const tokenOut = balances.find(
    ({ token }) =>
      token.address.toLowerCase() !== tokenIn?.token.address.toLowerCase()
  )

  const profit = bignumberUtils.minus(
    bignumberUtils.mul(tokensAmountInOut, currentPrice),
    bignumberUtils.mul(tokensAmountInOut, boughtPrice)
  )

  const statusWidget = (
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
            stopLossMoving={Boolean(callDataWithBoughtPrice.stopLoss?.moving)}
            tralingTakeProfitMoving={Boolean(
              callDataWithBoughtPrice.stopLoss2?.moving
            )}
            tralingTakeProfit={callDataWithBoughtPrice.stopLoss2?.amountOut}
            percent={bignumberUtils.toFixed(percent, 4)}
          />
        )}
    </>
  )

  const claimButton =
    (order.status === SmartTradeOrderStatusEnum.Succeeded && !order.claim) ||
    (order.closed && !order.claim) ? (
      <WalletConnect fallback={<Button color="green">Claim</Button>}>
        <Button
          color="green"
          onClick={props.onClaim}
          loading={props.claimingOrder}
          disabled={props.claimingDisabled}
        >
          Claim
        </Button>
      </WalletConnect>
    ) : (
      statusWidget
    )

  const profitUSD = bignumberUtils.mul(
    profit,
    order.price?.actualPrice[orderTokenOut?.token.address.toLowerCase() ?? '']
      ?.usd_price
  )

  return (
    <div
      className={clsx(styles.tableRow, props.updating && styles.tableRowLoader)}
    >
      <div className={styles.tableRowInner}>
        <div>
          <Typography variant="body2" as="div" className={styles.contractName}>
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
                    <Paper className={styles.contractUnknownTokenIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}
                </React.Fragment>
              ))}
            </div>
            {order.tokens.map(({ token }) => token.symbol).join('/')}
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
                <Icon icon="unknownNetwork" width="16" height="16" />
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
            order.status === SmartTradeOrderStatusEnum.Succeeded && (
              <div className={styles.contractBalance}>
                {tokenOut?.token.alias?.logoUrl ? (
                  <img
                    src={tokenOut?.token.alias?.logoUrl}
                    className={styles.contractBalanceIcon}
                    alt=""
                  />
                ) : (
                  <Paper className={styles.contractBalanceIcon}>
                    <Icon icon="unknownNetwork" width="16" height="16" />
                  </Paper>
                )}
                <Typography className={styles.fs12} as="div">
                  {tokenOut?.balance
                    ? bignumberUtils.toFixed(tokenOut?.balance, 4)
                    : '-'}{' '}
                  {tokenOut?.token.symbol}
                </Typography>
              </div>
            )}
        </div>
        <div>
          <div className={styles.contractBalance}>
            <Typography className={styles.fs12} as="div">
              {dateUtils.format(order.createdAt, 'DD/MM/YY  h:mma')}
            </Typography>
          </div>
          <div className={styles.contractBalance}>
            <Typography className={styles.fs12} as="div">
              ID {order.number}
            </Typography>
          </div>
        </div>
        <div>
          {order.status === SmartTradeOrderStatusEnum.Processed && (
            <>
              {statusWidget}
              <Typography variant="body3" className={styles.processing}>
                Order is processing
              </Typography>
            </>
          )}
          {order.closed &&
            order.status === SmartTradeOrderStatusEnum.Succeeded && (
              <div className={styles.claim}>
                <Typography
                  variant="body3"
                  className={clsx(styles.status, {
                    [styles.positive]: bignumberUtils.gt(percent, 0),
                    [styles.negative]: bignumberUtils.lt(percent, 0),
                  })}
                >
                  Order closed by market price
                  {boughtPrice && <> : {bignumberUtils.toFixed(percent, 4)}%</>}
                </Typography>
                {claimButton}
              </div>
            )}
          {!order.closed && (
            <div className={styles.claim}>
              {callDataWithBoughtPrice &&
                (order.claim ||
                  (order.status === SmartTradeOrderStatusEnum.Succeeded &&
                    !order.claim)) &&
                ![SmartTradeOrderStatusEnum.Pending].includes(order.status) && (
                  <>
                    <Typography
                      variant="body3"
                      className={clsx(styles.status, {
                        [styles.positive]: bignumberUtils.gt(percent, 0),
                        [styles.negative]: bignumberUtils.lt(percent, 0),
                      })}
                    >
                      {!order.claim &&
                      order.status === SmartTradeOrderStatusEnum.Succeeded
                        ? titles.completed
                        : titles[order.status]}
                      {order.status === SmartTradeOrderStatusEnum.Canceled
                        ? null
                        : `: ${bignumberUtils.toFixed(percent, 4)}%`}
                    </Typography>{' '}
                    {claimButton}
                  </>
                )}
            </div>
          )}
        </div>
        {order.status !== SmartTradeOrderStatusEnum.Canceled && (
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
                    <Paper className={styles.contractBalanceIcon}>
                      <Icon icon="unknownNetwork" width="16" height="16" />
                    </Paper>
                  )}
                  <Typography
                    className={clsx(styles.fs12, {
                      [styles.positive]: bignumberUtils.gt(percent, 0),
                      [styles.negative]: bignumberUtils.lt(percent, 0),
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
                        [styles.positive]: bignumberUtils.gt(percent, 0),
                        [styles.negative]: bignumberUtils.lt(percent, 0),
                      })}
                      as="div"
                    >
                      {currentPrice && (
                        <>
                          {bignumberUtils.gt(percent, 0) && '+'}
                          {bignumberUtils.toFixed(profitUSD, 4)}$ /
                        </>
                      )}{' '}
                      {bignumberUtils.gt(percent, 0) && '+'}
                      {bignumberUtils.toFixed(profit, 4)}
                    </Typography>
                  </div>
                )}
              </>
            ) : (
              <>
                <Typography variant="body3" className={styles.boughtPrice}>
                  Bought price
                  <Dropdown
                    control={
                      <ButtonBase>
                        <Icon icon="question" width={16} height={16} />
                      </ButtonBase>
                    }
                    offset={[0, 8]}
                  >
                    <Typography variant="body3">
                      Enter the Bought price to see your profit
                    </Typography>
                  </Dropdown>
                </Typography>
                <Button
                  color="green"
                  loading={props.editingBoughtPrice}
                  onClick={() => props.onEditBoughtPrice(currentPrice)}
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
            <ButtonBase onClick={props.onUpdatePrice}>
              <Icon width={16} height={16} icon="swap" />
            </ButtonBase>
            <Dropdown
              control={
                <ButtonBase
                  disabled={
                    order.status === SmartTradeOrderStatusEnum.Processed
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
                    fallback={<ButtonBase>Cancel order</ButtonBase>}
                  >
                    <ButtonBase
                      onClick={() => {
                        props.onCancel()

                        close()
                      }}
                    >
                      Cancel order
                    </ButtonBase>
                  </WalletConnect>
                  {order.status === SmartTradeOrderStatusEnum.Pending && (
                    <WalletConnect
                      fallback={<ButtonBase>Edit order</ButtonBase>}
                    >
                      <ButtonBase
                        onClick={() => {
                          props.onEdit()

                          close()
                        }}
                      >
                        Edit order
                      </ButtonBase>
                    </WalletConnect>
                  )}
                  <WalletConnect
                    fallback={<ButtonBase>Close on market</ButtonBase>}
                  >
                    <ButtonBase
                      onClick={() => {
                        props.onCloseMarket()

                        close()
                      }}
                    >
                      Close on market
                    </ButtonBase>
                  </WalletConnect>
                  <ButtonBase
                    onClick={() => {
                      props.onEditBoughtPrice(currentPrice)

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
      {props.updating && (
        <div className={styles.tableRowInnerLoader}>
          <Loader height="1em" />
        </div>
      )}
    </div>
  )
}
