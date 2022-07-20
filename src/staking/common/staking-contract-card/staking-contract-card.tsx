/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { Link as ReactRouterLink } from 'react-router-dom'

import { Can } from '~/auth'
import { bignumberUtils } from '~/common/bignumber-utils'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { paths } from '~/paths'
import { StakingListRowSyncIndicator } from '~/staking/common/staking-list-row-sync-indicator'
import { FreshMetrics, Contract } from '~/staking/common/staking.types'
import { isExcludedAdapter } from '../constants'
import { StakingFreshMetrics } from '../staking-fresh-metrics'
import { WatcherEventListener } from '../staking.api'
import * as styles from './staking-contract-card.css'

export type StakingContractCardProps = {
  className?: string
  onOpenContract?: () => void
  onOpenApy: () => void
  opened: boolean
  onDelete: () => void
  onUpdate: () => void
  onScannerRegister: () => void
  onToggleHideShowContract: () => void
  onToggleDeprecatedContract: () => void
  protocolId: string
  protocolAdapter: string
  freshMetrics: Record<string, FreshMetrics>
  scannerData: {
    scannerId?: string | undefined
    pools: WatcherEventListener[]
    contractId: string
  }
  hideAutostakingBoost: boolean
  error?: React.ReactNode
} & Contract

export const StakingContractCard: React.VFC<StakingContractCardProps> = (
  props
) => {
  const metric = props.freshMetrics[props.id]
    ? props.freshMetrics[props.id]
    : props.metric

  const apy = bignumberUtils.mul(metric.aprYear, 100)
  const realApy = bignumberUtils.mul(props.metric.aprWeekReal, 100)

  const apyboostDifference = bignumberUtils.minus(
    props.metric.myAPYBoost,
    metric.aprYear
  )
  const validDiff =
    !bignumberUtils.isNaN(apyboostDifference) &&
    bignumberUtils.gt(apyboostDifference, '0.001')

  const currentNetwork = networksConfig[props.network]

  const isExcludedContract = isExcludedAdapter(props.adapter)

  const freshMetricsIcon = !isEmpty(props.freshMetrics[props.id]) && (
    <StakingFreshMetrics className={styles.freshMetricsIcon} />
  )

  return (
    <div
      className={clsx(
        styles.root,
        {
          [styles.clickable]: Boolean(props.onOpenContract),
        },
        props.className
      )}
      onClick={props.onOpenContract}
      role="button"
      tabIndex={0}
    >
      <div className={styles.contractName}>
        <Typography variant="body2" as="div">
          {props.name}
          {props.deprecated && (
            <>
              {' '}
              - <span className={styles.grey}>deprecated</span>
            </>
          )}

          <Can I="update" a="Protocol">
            <br />
            <StakingListRowSyncIndicator
              row={{ ...props, ...props.scannerData }}
              onContractRegister={props.onScannerRegister}
            />
          </Can>
          {props.error}
        </Typography>
        {currentNetwork &&
          !isEmpty([...props.tokens.stake, ...props.tokens.reward]) && (
            <div className={styles.coinIcons}>
              <StakeRewardTokens
                stakeTokens={props.tokens.stake}
                rewardTokens={props.tokens.reward}
                tokenClassName={styles.contractIconBg}
              />
            </div>
          )}
      </div>
      <div>
        <Typography
          variant="body2"
          as="div"
          family="mono"
          transform="uppercase"
          align="right"
        >
          ${bignumberUtils.format(metric.tvl)}
          {freshMetricsIcon}
        </Typography>
      </div>
      <div>
        <Typography
          variant="body2"
          as="div"
          family="mono"
          transform="uppercase"
          align="right"
          className={styles.apy}
        >
          {isExcludedContract ? (
            '-'
          ) : (
            <>
              {bignumberUtils.formatMax(apy, 10000)}%
              <ButtonBase
                onClick={props.onOpenApy}
                className={styles.apyButton}
              >
                <Icon icon="calculator" width="20" height="20" />
              </ButtonBase>
              {freshMetricsIcon}
            </>
          )}
        </Typography>
      </div>
      <div>
        <Typography
          variant="body2"
          as="div"
          family="mono"
          transform="uppercase"
          align="right"
          className={clsx({
            [styles.positive]: bignumberUtils.gt(realApy, '0'),
            [styles.negative]: bignumberUtils.lt(realApy, '0'),
          })}
        >
          {isExcludedContract || !props.metric.aprWeekReal ? (
            '-'
          ) : (
            <>{bignumberUtils.formatMax(realApy, 10000)}% </>
          )}
        </Typography>
      </div>
      <div>
        <Typography
          variant="body2"
          as="div"
          family="mono"
          transform="uppercase"
          align="right"
        >
          ${bignumberUtils.format(metric.myStaked)}
          {freshMetricsIcon}
        </Typography>
      </div>
      <div>
        <Typography
          variant="body2"
          as="div"
          family="mono"
          transform="uppercase"
          align="right"
        >
          {isExcludedContract ? (
            '-'
          ) : (
            <>
              ${bignumberUtils.format(metric.myEarned)}
              {freshMetricsIcon}
            </>
          )}
        </Typography>
      </div>
      <div className={clsx(styles.tableCol)}>
        <div className={styles.autostakingCol}>
          <Typography
            variant="body2"
            as="div"
            family="mono"
            transform="uppercase"
            align="right"
          >
            {props.hideAutostakingBoost || isExcludedContract ? (
              '-'
            ) : (
              <>
                {validDiff
                  ? bignumberUtils.formatMax(
                      bignumberUtils.mul(props.metric.myAPYBoost, 100),
                      10000
                    )
                  : 0}
                %
              </>
            )}
          </Typography>
          {!isExcludedContract && (
            <>
              {!props.hideAutostakingBoost && validDiff && (
                <Typography
                  variant="body2"
                  as="div"
                  family="mono"
                  transform="uppercase"
                  align="right"
                  className={clsx({
                    [styles.positive]: bignumberUtils.gt(
                      apyboostDifference,
                      '0.001'
                    ),
                  })}
                >
                  {bignumberUtils.gt(apyboostDifference, '0.001') && '+'}
                  {bignumberUtils.formatMax(
                    bignumberUtils.mul(apyboostDifference, 100),
                    10000
                  )}
                  %
                </Typography>
              )}
            </>
          )}
        </div>
        {props.onOpenContract && (
          <ButtonBase
            className={styles.accorionButton}
            onClick={props.onOpenContract}
          >
            <Icon
              icon={props.opened ? 'arrowUp' : 'arrowDown'}
              width="24"
              height="24"
            />
          </ButtonBase>
        )}
        <Can I="update" a="Contract">
          <Dropdown
            control={
              <ButtonBase className={styles.manageButton}>
                <Icon icon="dots" />
              </ButtonBase>
            }
          >
            <Can I="update" a="Contract">
              <ButtonBase
                as={ReactRouterLink}
                to={`${paths.staking.update(
                  props.protocolId,
                  props.id
                )}?protocol-adapter=${props.protocolAdapter}`}
              >
                Edit
              </ButtonBase>
            </Can>
            <Can I="update" a="Contract">
              <ButtonBase onClick={props.onToggleHideShowContract}>
                {props.hidden ? 'Show' : 'Hide'}
              </ButtonBase>
            </Can>
            <Can I="update" a="Contract">
              <ButtonBase onClick={props.onToggleDeprecatedContract}>
                Deprecated
              </ButtonBase>
            </Can>
            <Can I="update" a="Contract">
              <ButtonBase onClick={props.onUpdate}>Update Metrics</ButtonBase>
            </Can>
            <Can I="delete" a="Contract">
              <ButtonBase onClick={props.onDelete}>Delete</ButtonBase>
            </Can>
          </Dropdown>
        </Can>
      </div>
    </div>
  )
}
