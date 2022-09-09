import clsx from 'clsx'
import { Link as ReactRouterLink } from 'react-router-dom'

import { AutostakingStakingContractsQuery } from '~/api'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Icon } from '~/common/icon'
import { pluralize } from '~/common/pluralize'
import { Typography } from '~/common/typography'
import { paths } from '~/paths'
import { riskStatuses, riskIcons } from '~/invest/common/constants'
import { Dropdown } from '~/common/dropdown'
import { ButtonBase } from '~/common/button-base'
import { InvestPoolTokens } from '~/invest/common/invest-pool-tokens'
import * as styles from './invest-contract-info.css'

export type InvestContractInfoProps = {
  className?: string
  contract: Exclude<
    AutostakingStakingContractsQuery['contracts']['list'],
    null | undefined
  >[number]
}

const text = (
  <>
    Based on last 7 days&apos; pool performance. Does not account for
    impermanent loss
  </>
)

const dropdown = (
  <Dropdown
    control={
      <ButtonBase className={styles.apyboostQuestion}>
        <Icon icon="question" width={16} height={16} />
      </ButtonBase>
    }
    className={styles.dropdown}
    offset={[0, 8]}
  >
    {text}
  </Dropdown>
)

export const InvestContractInfo: React.VFC<InvestContractInfoProps> = (
  props
) => {
  const apyboost = bignumberUtils.mul(props.contract.metric.myAPYBoost, 100)
  const realApy = bignumberUtils.mul(props.contract.metric.aprWeekReal, 100)

  return (
    <div className={clsx(styles.root, props.className)}>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Pool
        </Typography>
        <Typography variant="body2" className={styles.rewardTokens} as="div">
          <InvestPoolTokens tokens={props.contract.tokens.stake} />
          {props.contract.name}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Reward {pluralize(props.contract.tokens.reward.length, 'token')}
        </Typography>
        <Typography variant="body2" as="div" className={styles.rewardTokens}>
          <InvestPoolTokens tokens={props.contract.tokens.reward} />
          {props.contract.tokens.reward.map(({ symbol }) => symbol).join('/')}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          Protocol
        </Typography>
        <Typography
          variant="body2"
          as={ReactRouterLink}
          to={paths.protocols.detail(props.contract.protocol.id)}
          className={styles.protocol}
        >
          {props.contract.protocol.icon && (
            <img
              src={props.contract.protocol.icon}
              alt=""
              width={24}
              height={24}
            />
          )}
          {props.contract.protocol.name}
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          APY
        </Typography>
        <Typography variant="body2" as="div">
          {bignumberUtils.formatMax(
            bignumberUtils.mul(props.contract.metric.aprYear, 100),
            10000
          )}
          %
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono" as="div">
          7D Performance {dropdown}
        </Typography>
        <Typography variant="body2" as="div">
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
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono" as="div">
          Boosted APY {dropdown}
        </Typography>
        <Typography variant="body2">
          <Typography
            variant="inherit"
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
        </Typography>
      </div>
      <div className={styles.row}>
        <Typography variant="body2" family="mono">
          RISK
        </Typography>
        <Typography
          variant="body2"
          as="div"
          className={clsx(
            styles.risk,
            riskIcons[props.contract.metric.risk] && styles.positive
          )}
        >
          {riskIcons[props.contract.metric.risk] && (
            <Icon
              icon={riskIcons[props.contract.metric.risk]}
              width={22}
              height={24}
            />
          )}
          {riskStatuses[props.contract.metric.risk]}
        </Typography>
      </div>
    </div>
  )
}
