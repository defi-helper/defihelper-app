import clsx from 'clsx'
import isEmpty from 'lodash.isempty'
import { cloneElement } from 'react'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './stake-reward-tokens.css'

type Token = {
  address: string
  name: string
  network: string
  alias?: {
    logoUrl?: string | null
  } | null
}

export type StakeRewardTokensProps = {
  stakeTokens?: Token[] | null
  rewardTokens?: Token[] | null
  size?: 20 | 24
  tokenClassName?: string
}

type TokenInfoProps = {
  icon: JSX.Element
  token: Token
  tokenClassName?: string
  height: number
  type: 'stake' | 'reward'
}

const TokenInfo = (props: TokenInfoProps) => (
  <div
    className={styles.wrap}
    style={{
      height: props.height,
    }}
  >
    <ButtonBase className={styles.buttonIcon}>
      {cloneElement(props.icon, {
        ...props.icon.props,
        className: clsx(props.icon.props.className, props.tokenClassName),
      })}
    </ButtonBase>
    <Paper radius={8} className={styles.dropdown}>
      <Typography variant="body2">
        {props.type === 'stake' ? 'LP Token part' : 'Reward Token'}
      </Typography>
      <div className={styles.tokenTitle}>
        {props.icon}
        <Typography variant="body2" family="mono" className={styles.tokenName}>
          {props.token.name}
        </Typography>
      </div>
    </Paper>
  </div>
)

const TokenIcon = (props: {
  token: Token
  size: 20 | 24
  className?: string
}) => {
  const style = { width: props.size, height: props.size }

  return props.token.alias?.logoUrl ? (
    <img
      src={props.token.alias?.logoUrl}
      alt=""
      className={styles.icon}
      style={style}
    />
  ) : (
    <Paper className={clsx(styles.icon, props.className)} style={style}>
      <Icon icon="unknownNetwork" width="16" height="16" />
    </Paper>
  )
}

export const StakeRewardTokens: React.VFC<StakeRewardTokensProps> = (props) => {
  const { size = 20 } = props

  if (isEmpty([...(props.stakeTokens ?? []), ...(props.stakeTokens ?? [])]))
    return <></>

  return (
    <span className={styles.tokens}>
      <span className={styles.tokens}>
        {props.stakeTokens?.map((token, index) => {
          return (
            <TokenInfo
              height={size}
              key={String(index)}
              icon={<TokenIcon size={size} token={token} />}
              token={token}
              tokenClassName={props.tokenClassName}
              type="stake"
            />
          )
        })}
      </span>
      <Icon
        icon="arrowLongRight"
        width={21}
        height={16}
        className={styles.tokenIconArrow}
      />
      <span className={styles.tokens}>
        {props.rewardTokens?.map((token, index) => {
          return (
            <TokenInfo
              height={size}
              key={String(index)}
              icon={<TokenIcon size={size} token={token} />}
              token={token}
              tokenClassName={props.tokenClassName}
              type="reward"
            />
          )
        })}
      </span>
    </span>
  )
}
