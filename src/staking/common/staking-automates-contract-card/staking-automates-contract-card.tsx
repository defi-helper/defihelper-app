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
import { AutomateContractStopLossStatusEnum } from '~/api'
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
  error?: boolean
  apy?: string
  apyBoost?: string
  restakeAt: string | null
  deleting?: boolean
  refunding?: boolean
  running?: boolean
  stopLossing?: boolean
  tokensIcons: Array<string | null>
  freshMetrics?: FreshMetrics
  contractId?: string
  stopLossAmountOut?: string
  stopLossToken?: string
  status?: AutomateContractStopLossStatusEnum
  balanceInvest: string
  automateId: string
  contractWalletId?: string
}

export const StakingAutomatesContractCard: React.VFC<StakingAutomatesContractCardProps> =
  (props) => {
    const pending = props.deleting || props.refunding

    const apyboostDifference = bignumberUtils.minus(props.apyBoost, props.apy)

    const validDiff =
      !bignumberUtils.isNaN(apyboostDifference) &&
      bignumberUtils.gt(apyboostDifference, '0.001')

    const status =
      props.status === AutomateContractStopLossStatusEnum.Completed
        ? 'Completed'
        : undefined

    return (
      <Paper className={clsx(styles.root, props.className)} radius={8}>
        <div className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.icons}>
              {props.tokensIcons.map((logoUrl, index) =>
                logoUrl ? (
                  <img
                    src={logoUrl}
                    alt=""
                    key={String(index)}
                    className={styles.icon}
                  />
                ) : (
                  <Paper
                    radius={24}
                    key={String(index)}
                    className={styles.paperIcon}
                  >
                    <Icon icon="unknownNetwork" width="16" height="16" />
                  </Paper>
                )
              )}
            </div>
            <Typography as="span">
              {props.title || cutAccount(props.address)}
            </Typography>
            {props.onStopLoss && (
              <CanDemo>
                <Button
                  onClick={props.onStopLoss}
                  loading={props.stopLossing}
                  size="small"
                  className={styles.settings}
                  variant="light"
                >
                  Settings
                </Button>
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
          <div className={styles.row}>
            <Typography
              variant="body2"
              as="span"
              className={clsx(styles.infoTitle, styles.opacity)}
            >
              Balance
            </Typography>
            <Typography variant="body2" as="span">
              $
              {bignumberUtils.format(
                props.freshMetrics?.myStaked ?? props.balance
              )}{' '}
              {bignumberUtils.gt(props.balanceInvest, '0.01') && (
                <Typography
                  variant="inherit"
                  className={clsx({
                    [styles.negative]: bignumberUtils.lt(
                      props.balanceInvest,
                      0
                    ),
                    [styles.positive]: bignumberUtils.gt(
                      props.balanceInvest,
                      0
                    ),
                  })}
                >
                  ({bignumberUtils.lt(props.balanceInvest, 0) ? '-' : null}
                  {bignumberUtils.gt(props.balanceInvest, 0) ? '+' : null}$
                  {bignumberUtils.format(props.balanceInvest)})
                </Typography>
              )}
              {!isEmpty(props.freshMetrics) && <StakingFreshMetrics />}
            </Typography>
          </div>
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
            props.error ||
              (props.status === AutomateContractStopLossStatusEnum.Completed &&
                styles.error)
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
              {status ?? (props.stopLossAmountOut && props.stopLossToken)
                ? `${bignumberUtils.format(props.stopLossAmountOut)} ${
                    props.stopLossToken
                  }`
                : 'Inactive'}
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
            {props.contractId && (
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

            <CanDemo>
              <Button
                size="small"
                variant="light"
                className={styles.refund}
                onClick={props.onRefund}
                loading={props.refunding}
                disabled={props.deleting || props.running || props.stopLossing}
              >
                Unstake
              </Button>
            </CanDemo>
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
                due to low Fee Funds balance. Deposit Fee Funds to continue
                automations.
              </Dropdown>
            )}
          </div>
        </div>
      </Paper>
    )
  }
