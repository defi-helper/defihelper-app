import isEmpty from 'lodash.isempty'
import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { ButtonBase } from '~/common/button-base'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { cutAccount } from '~/common/cut-account'
import { Button } from '~/common/button'
import { Link } from '~/common/link'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { CircularProgress } from '~/common/circular-progress'
import { bignumberUtils } from '~/common/bignumber-utils'
import { CanDemo } from '~/auth/can-demo'
import { dateUtils } from '~/common/date-utils'
import { paths } from '~/paths'
import { networksConfig } from '~/networks-config'
import { FreshMetrics } from '~/staking/common/staking.types'
import { StakingFreshMetrics } from '~/staking/common/staking-fresh-metrics'
import {
  AutomateContractStopLossStatusEnum,
  StakingAutomatesContractFragmentFragment,
} from '~/api'
import { WalletSwitchNetwork } from '~/wallets/wallet-switch-network'
import * as styles from './staking-automates-contract-card.css'

export type StakingAutomatesContractCardProps = {
  className?: string
  title: string
  address: string
  network: string
  blockchain: string
  balance: string
  protocol?: { id: string; name: string; adapter: string; icon?: string | null }
  onRefund: () => void
  onDelete: () => void
  onRun: () => void
  onStopLoss?: () => void
  onDepositWallet: () => void
  stopLossTx?: string
  error?: boolean
  apy?: string
  apyBoost?: string
  restakeAt: string | null
  deleting?: boolean
  refunding?: boolean
  running?: boolean
  stopLossing?: boolean
  tokensIcons: Array<{ logoUrl: string | null; address: string }>
  freshMetrics?: FreshMetrics
  contractId?: string
  stopLossAmountOut?: string
  stopLossToken?: string
  status?: AutomateContractStopLossStatusEnum
  balanceInvest: string
  automateId: string
  contractWalletId?: string
  staked: string
  blockedAt: string | null
  invest: string
  protocolAdapter?: string
  metricUni3?: StakingAutomatesContractFragmentFragment['metricUni3']
}

const TokenIcon = (props: { logoUrl: string | null }) => {
  return props.logoUrl ? (
    <img src={props.logoUrl} alt="" className={styles.icon} />
  ) : (
    <Paper radius={24} className={styles.paperIcon}>
      <Icon icon="unknownNetwork" width="16" height="16" />
    </Paper>
  )
}

export const StakingAutomatesContractCard: React.VFC<StakingAutomatesContractCardProps> =
  (props) => {
    const pending = props.deleting || props.refunding

    const isUniV3 = props.protocolAdapter === 'uniswap3'

    const apyboostDifference = bignumberUtils.minus(props.apyBoost, props.apy)

    const validDiff =
      !bignumberUtils.isNaN(apyboostDifference) &&
      bignumberUtils.gt(apyboostDifference, '0.001')

    const status =
      props.status === AutomateContractStopLossStatusEnum.Completed
        ? 'Completed'
        : undefined

    const completed =
      status && props.stopLossTx ? (
        <Link
          href={buildExplorerUrl({
            network: props.network,
            tx: props.stopLossTx,
          })}
          target="_blank"
        >
          {bignumberUtils.format(props.stopLossAmountOut)} {props.stopLossToken}{' '}
          ({status})
        </Link>
      ) : null

    const stakeTokens = props.tokensIcons.reduce<Record<string, string | null>>(
      (acc, token) => {
        acc[token.address.toLowerCase()] = token.logoUrl

        return acc
      },
      {}
    )

    const notCompleted =
      props.stopLossAmountOut && props.stopLossToken
        ? `${bignumberUtils.format(props.stopLossAmountOut)} ${
            props.stopLossToken
          }`
        : 'Inactive'

    return (
      <Paper className={clsx(styles.root, props.className)} radius={8}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.icons}>
              {props.tokensIcons.map(({ logoUrl }, index) => (
                <TokenIcon key={String(index)} logoUrl={logoUrl} />
              ))}
            </div>
            <Typography as="span">
              {props.title || cutAccount(props.address)}
            </Typography>
            {props.onStopLoss && (
              <CanDemo>
                <WalletSwitchNetwork network={props.network}>
                  <Button
                    onClick={props.onStopLoss}
                    loading={props.stopLossing}
                    size="small"
                    className={styles.settings}
                    variant="light"
                  >
                    Settings
                  </Button>
                </WalletSwitchNetwork>
              </CanDemo>
            )}
            {!props.onStopLoss && (
              <Dropdown
                control={(active) => (
                  <ButtonBase
                    className={clsx(
                      styles.manage,
                      active && styles.manageActive,
                      pending && styles.manageLoading
                    )}
                  >
                    {(props.deleting || props.running || props.stopLossing) && (
                      <CircularProgress className={styles.circularProgress} />
                    )}
                    <Icon
                      icon="dots"
                      className={clsx(
                        styles.manageIcon,
                        (props.deleting ||
                          props.running ||
                          props.stopLossing) &&
                          styles.manageIconloading
                      )}
                    />
                  </ButtonBase>
                )}
                className={styles.dropdown}
                placement="left-start"
                offset={[0, 4]}
              >
                {(close) => (
                  <>
                    <CanDemo>
                      <ButtonBase
                        className={styles.dropdownItem}
                        onClick={() => {
                          props.onRun?.()
                          close()
                        }}
                      >
                        Run manually
                      </ButtonBase>
                    </CanDemo>

                    <CanDemo>
                      <ButtonBase
                        className={clsx(
                          styles.deleteButton,
                          styles.dropdownItem
                        )}
                        onClick={() => {
                          props.onDelete?.()
                          close()
                        }}
                      >
                        Delete
                      </ButtonBase>
                    </CanDemo>
                  </>
                )}
              </Dropdown>
            )}
          </div>
          <Typography variant="h3" as="div">
            $
            {bignumberUtils.format(
              props.freshMetrics?.myStaked ?? props.balance
            )}
            {!isEmpty(props.freshMetrics) && <StakingFreshMetrics />}
          </Typography>
          <Typography
            variant="body2"
            as="div"
            className={clsx(styles.balanceInvest, {
              [styles.negative]: bignumberUtils.lt(props.balanceInvest, 0),
              [styles.positive]: bignumberUtils.gt(props.balanceInvest, 0),
            })}
          >
            {bignumberUtils.gt(props.balanceInvest, 0) ? '+' : '-'}$
            {bignumberUtils.format(bignumberUtils.abs(props.balanceInvest), 2)}{' '}
            {props.metricUni3?.inPriceRange === false && (
              <Typography variant="inherit">(out of range)</Typography>
            )}
          </Typography>
          <div className={styles.row}>
            <Typography
              variant="body2"
              as="span"
              className={clsx(styles.infoTitle, styles.opacity)}
            >
              Address
            </Typography>
            <Typography
              variant="body2"
              as={Link}
              href={buildExplorerUrl({
                network: props.network,
                address: props.address,
              })}
              target="_blank"
            >
              {cutAccount(props.address)}
            </Typography>
          </div>
          <div className={styles.row}>
            <Typography
              variant="body2"
              as="span"
              className={clsx(styles.infoTitle, styles.opacity)}
            >
              Network
            </Typography>
            <Typography variant="body2" as="span">
              {networksConfig[props.network]?.title}
            </Typography>
          </div>
          {props.metricUni3 && isUniV3 && (
            <div className={styles.row}>
              <Typography
                variant="body2"
                as="span"
                className={clsx(styles.infoTitle, styles.opacity)}
              >
                UNI V3
              </Typography>
              <Typography variant="body2" as="span" className={styles.flex}>
                <TokenIcon
                  logoUrl={
                    stakeTokens[props.metricUni3.token0Address.toLowerCase()]
                  }
                />
                {bignumberUtils.toFixed(props.metricUni3.token0PriceLower)}
                <Typography variant="inherit">-</Typography>
                {bignumberUtils.toFixed(props.metricUni3.token0PriceUpper)}
                <Typography variant="inherit">per</Typography>
                <TokenIcon
                  logoUrl={
                    stakeTokens[props.metricUni3.token1Address.toLowerCase()]
                  }
                />
              </Typography>
            </div>
          )}
          {props.protocol && (
            <div className={styles.row}>
              <Typography
                variant="body2"
                as="span"
                className={clsx(styles.infoTitle, styles.opacity)}
              >
                Protocol
              </Typography>
              <Link
                as={ReactRouterLink}
                to={
                  props.protocol.adapter === 'debankByApiReadonly'
                    ? paths.protocols.detailReadonly(props.protocol.id)
                    : paths.protocols.detail(props.protocol.id)
                }
                className={styles.protocol}
              >
                {props.protocol.icon && (
                  <img
                    alt=""
                    src={props.protocol.icon}
                    width={24}
                    height={24}
                  />
                )}
                {props.protocol.name}
              </Link>
            </div>
          )}
        </div>
        <div
          className={clsx(
            styles.footer,
            (props.error ||
              props.status === AutomateContractStopLossStatusEnum.Completed) &&
              styles.error
          )}
        >
          <div className={styles.row}>
            <Typography variant="body2" as="span" className={styles.infoTitle}>
              <Typography variant="inherit" className={styles.opacity}>
                Stop-loss
              </Typography>
              <Dropdown
                control={
                  <ButtonBase className={clsx(styles.opacity)}>
                    <Icon className={styles.question} icon="question" />
                  </ButtonBase>
                }
                placement="top"
                className={styles.questionDropdown}
                offset={[0, 8]}
              >
                <Typography variant="inherit">
                  We will track the value of your liquidity, and then remove and
                  sell your LP tokens to the single token when the price is
                  lower than the threshold that you set.
                </Typography>
              </Dropdown>
            </Typography>
            <Typography variant="body2" as="span">
              {completed ?? notCompleted}
            </Typography>
          </div>
          <div className={styles.row}>
            <Typography variant="body2" as="span" className={styles.infoTitle}>
              <Typography variant="inherit" className={styles.opacity}>
                APY
              </Typography>
            </Typography>
            <Typography variant="body2" as="span">
              {bignumberUtils.formatMax(
                bignumberUtils.mul(props.apy, 100),
                10000,
                true
              )}
              %
            </Typography>
          </div>
          <div className={styles.row}>
            <Typography variant="body2" as="span" className={styles.infoTitle}>
              <Typography variant="inherit" className={styles.opacity}>
                Boosted APY
              </Typography>
              <Dropdown
                control={
                  <ButtonBase className={clsx(styles.opacity)}>
                    <Icon className={styles.question} icon="question" />
                  </ButtonBase>
                }
                placement="top"
                className={styles.questionDropdown}
                offset={[0, 8]}
              >
                <Typography variant="inherit">
                  Auto-staking is a built-in automation. It helps you earn more
                  by automatically adding your profits to the deposit,
                  effectively auto- compounding your interest.{' '}
                  <Link
                    target="_blank"
                    href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
                    className={styles.howItWorks}
                  >
                    Learn more on How It Works
                  </Link>
                </Typography>
              </Dropdown>
            </Typography>
            <Typography variant="body2" as="span">
              {validDiff ? (
                <>
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(props.apyBoost, 100),
                    10000
                  )}
                </>
              ) : (
                0
              )}
              %
            </Typography>
          </div>
          <div className={styles.row}>
            <Typography variant="body2" as="span" className={styles.opacity}>
              Restake at
            </Typography>
            <Typography variant="body2" as="span">
              {props.restakeAt
                ? dateUtils.format(props.restakeAt, 'DD/MM HH:mm')
                : '-'}
            </Typography>
          </div>

          <div className={styles.buttons}>
            {!props.blockedAt && (
              <>
                {(!isUniV3 ||
                  (isUniV3 && !bignumberUtils.gt(props.staked, 0)) ||
                  bignumberUtils.eq(props.invest, 0)) &&
                  props.contractId && (
                    <CanDemo>
                      <Button
                        size="small"
                        className={styles.deposit}
                        disabled={
                          props.deleting ||
                          props.refunding ||
                          props.running ||
                          props.stopLossing
                        }
                        as={ReactRouterLink}
                        to={`${paths.invest.detail(props.contractId)}?deploy=${
                          props.address
                        }&automateId=${props.automateId}&walletId=${
                          props.contractWalletId
                        }`}
                      >
                        Invest
                      </Button>
                    </CanDemo>
                  )}

                {bignumberUtils.gt(props.invest, 0) && (
                  <CanDemo>
                    <WalletSwitchNetwork network={props.network}>
                      <Button
                        size="small"
                        variant="light"
                        className={styles.refund}
                        onClick={props.onRefund}
                        loading={props.refunding}
                        disabled={
                          props.deleting || props.running || props.stopLossing
                        }
                      >
                        Unstake
                      </Button>
                    </WalletSwitchNetwork>
                  </CanDemo>
                )}
              </>
            )}
            {props.error && (
              <Dropdown
                control={
                  <ButtonBase className={styles.attention}>
                    <Icon icon="attention" />
                  </ButtonBase>
                }
                className={styles.attentionDropdown}
                placement="top-end"
                offset={[0, 8]}
              >
                This wallet has 3 active automations which doesn&apos;t work now
                due to low Fee Funds balance.{' '}
                <CanDemo>
                  <WalletSwitchNetwork network={props.network}>
                    <ButtonBase
                      onClick={props.onDepositWallet}
                      className={styles.onDepositWallet}
                    >
                      Deposit Fee Funds
                    </ButtonBase>
                  </WalletSwitchNetwork>
                </CanDemo>{' '}
                to continue automations.
              </Dropdown>
            )}
          </div>
        </div>
      </Paper>
    )
  }
