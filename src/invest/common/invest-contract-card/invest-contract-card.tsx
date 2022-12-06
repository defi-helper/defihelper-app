import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useMedia } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dropdown } from '~/common/dropdown'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import { paths } from '~/paths'
import { StakeRewardTokens } from '~/common/stake-reward-tokens'
import { riskStatuses, riskIcons } from '~/invest/common/constants'
import { AutostakingStakingContractsQuery } from '~/api'
import * as styles from './invest-contract-card.css'
import { CharIndicator } from '~/common/char-indicator'

export type InvestContractCardProps = {
  className?: string
  contract: Exclude<
    AutostakingStakingContractsQuery['contracts']['list'],
    null | undefined
  >[number]
  onOpenApy: () => void
}

export const InvestContractCard: React.FC<InvestContractCardProps> = (
  props
) => {
  const { contract } = props

  const isDesktop = useMedia('(min-width: 960px)')

  const apyboost = bignumberUtils.mul(contract.metric.myAPYBoost, 100)
  const realApy = bignumberUtils.mul(contract.metric.aprWeekReal, 100)

  return (
    <Paper className={styles.row} radius={8}>
      {networksConfig[contract.network]?.icon && !isDesktop && (
        <Icon
          icon={networksConfig[contract.network].icon}
          width="32"
          height="32"
          className={styles.mobileNetwork}
        />
      )}
      {!isDesktop && (
        <div className={styles.mobileTokenIcons}>
          {contract.tokens.stake.map((token, index) =>
            token.alias?.logoUrl ? (
              <img
                src={token.alias?.logoUrl}
                alt=""
                className={styles.mobileTokenIconsItem}
                key={String(index)}
              />
            ) : (
              <Paper
                className={styles.mobileTokenIconsItemUnknown}
                key={String(index)}
              >
                <Icon icon="unknownNetwork" width="20" height="20" />
              </Paper>
            )
          )}
        </div>
      )}
      <Typography as="div" variant="body2" className={styles.contractCardName}>
        <Typography variant="inherit">{contract.name}</Typography>
        <div>
          <Dropdown
            trigger="hover"
            control={<CharIndicator color="red">S</CharIndicator>}
          >
            You can protect your investment in this pool with our
            &apos;Stop-Loss&apos; feature. We will track the value of your
            liquidity, and then remove and sell your LP tokens to the single
            token when the price is lower than the threshold that you set.
          </Dropdown>
          <Dropdown
            trigger="hover"
            control={<CharIndicator color="green">A</CharIndicator>}
          >
            This pool has a built-in &apos;Auto-staking&apos; automation. It
            helps you earn more by automatically adding your profits to the
            deposit, effectively auto-compounding your interest.
          </Dropdown>
        </div>
        {isDesktop && (
          <span className={styles.contractCardIcons}>
            {networksConfig[contract.network]?.icon ? (
              <Dropdown
                control={
                  <Icon
                    icon={networksConfig[contract.network].icon}
                    width="20"
                    height="20"
                    className={styles.contractNetworkIcon}
                  />
                }
                offset={[0, 4]}
                placement="bottom-start"
                trigger="hover"
                className={styles.networkDropdown}
              >
                <Typography variant="body2" family="mono">
                  This pool is located on{' '}
                  {networksConfig[contract.network].title} network
                </Typography>
              </Dropdown>
            ) : (
              <Paper className={styles.contractUnknownNetworkIcon}>
                <Icon icon="unknownNetwork" width="16" height="16" />
              </Paper>
            )}
            <StakeRewardTokens
              stakeTokens={contract.tokens.stake}
              rewardTokens={contract.tokens.reward}
              tokenClassName={styles.contractIconBg}
            />
          </span>
        )}
      </Typography>
      <Typography
        variant="body2"
        className={styles.contractProtocol}
        as={ReactRouterLink}
        to={paths.protocols.detail(contract.protocol.id)}
      >
        {isDesktop && (
          <>
            {contract.protocol.icon ? (
              <img
                alt=""
                src={contract.protocol.icon}
                className={styles.contractProtocolIcon}
              />
            ) : (
              <Paper className={styles.contractProtocolIcon}>
                <Icon icon="unknownNetwork" width="16" height="16" />
              </Paper>
            )}{' '}
          </>
        )}
        <div className={styles.contractProtocolInner}>
          {contract.protocol.name}
          <Icon
            icon="link"
            width="16"
            height="16"
            className={styles.contractProtocolLinkIcon}
          />
        </div>
      </Typography>
      {!isDesktop && (
        <Typography
          variant="body2"
          align="center"
          className={styles.mobileRisk}
        >
          {riskStatuses[contract.metric.risk]}
        </Typography>
      )}
      <Typography
        variant="body2"
        align={isDesktop ? 'right' : undefined}
        as="div"
        className={styles.mobileRow}
      >
        {!isDesktop && <Typography variant="inherit">TVL</Typography>}
        <Typography variant="inherit">
          ${bignumberUtils.format(contract.metric.tvl)}
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        align={isDesktop ? 'right' : undefined}
        as="div"
        className={styles.mobileRow}
      >
        {!isDesktop && <Typography variant="inherit">APY</Typography>}
        <Typography variant="inherit">
          {bignumberUtils.formatMax(
            bignumberUtils.mul(contract.metric.aprYear, 100),
            10000
          )}
          %
          <ButtonBase onClick={props.onOpenApy} className={styles.apyButton}>
            <Icon icon="calculator" width="20" height="20" />
          </ButtonBase>
        </Typography>
      </Typography>
      <Typography
        variant="body2"
        align={isDesktop ? 'right' : undefined}
        as="div"
        className={styles.mobileRow}
      >
        {!isDesktop && <Typography variant="inherit">7D Perfomance</Typography>}
        <Typography
          variant="inherit"
          className={clsx({
            [styles.positive]: bignumberUtils.gt(realApy, '0'),
            [styles.negative]: bignumberUtils.lt(realApy, '0'),
          })}
        >
          {bignumberUtils.formatMax(realApy, 10000, false)}%
        </Typography>
      </Typography>
      <div className={styles.apyBoost}>
        {!isDesktop && <Typography variant="inherit">APY Boost</Typography>}
        <Typography
          variant="body2"
          align={isDesktop ? 'right' : undefined}
          as="span"
          className={clsx({
            [styles.positive]: bignumberUtils.gt(apyboost, '0'),
            [styles.negative]:
              !bignumberUtils.eq(bignumberUtils.format(apyboost), '0') &&
              bignumberUtils.lt(apyboost, '0'),
          })}
        >
          {!bignumberUtils.eq(bignumberUtils.format(apyboost), '0') &&
            bignumberUtils.lt(apyboost, '0') &&
            '- '}
          {bignumberUtils.formatMax(apyboost, 10000, true)}%
        </Typography>
      </div>
      <Typography variant="inherit">
        {riskIcons[contract.metric.risk] && isDesktop && (
          <Icon icon={riskIcons[contract.metric.risk]} width={22} height={24} />
        )}
        {false && (
          <Dropdown
            className={styles.riskLevel}
            control={
              <ButtonBase>
                {riskIcons[contract.metric.risk] && (
                  <Icon
                    icon={riskIcons[contract.metric.risk]}
                    width={22}
                    height={24}
                  />
                )}
              </ButtonBase>
            }
            offset={[0, 4]}
            placement="left-start"
          >
            <Typography family="mono" as="div" className={styles.riskLevelRow}>
              <Typography variant="inherit">Risk</Typography>
              <Typography
                as="div"
                variant="body2"
                className={styles.riskLevelStatus}
              >
                {riskStatuses[contract.metric.risk]}
              </Typography>
            </Typography>
            <span className={styles.riskLevelSpacing} />
            <Typography
              family="mono"
              as="div"
              variant="body2"
              className={styles.riskLevelRow}
            >
              <Typography variant="inherit">Reliability</Typography>
              <Icon icon="greenRisk" width={19} height={20} />
            </Typography>
            <Typography
              family="mono"
              as="div"
              variant="body2"
              className={styles.riskLevelRow}
            >
              <Typography variant="inherit">Profitability</Typography>
              <Icon icon="yellowRisk" width={19} height={20} />
            </Typography>
            <Typography
              family="mono"
              as="div"
              variant="body2"
              className={styles.riskLevelRow}
            >
              <Typography variant="inherit">Volatility</Typography>
              <Icon icon="greenRisk" width={19} height={20} />
            </Typography>
          </Dropdown>
        )}
      </Typography>
      <Button
        color="green"
        size="small"
        className={styles.autostakeButton}
        as={ReactRouterLink}
        to={paths.invest.detail(contract.id)}
      >
        invest
      </Button>
    </Paper>
  )
}
