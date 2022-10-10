import clsx from 'clsx'
import { useState } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { CircularProgress } from '~/common/circular-progress'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import { paths } from '~/paths'
import * as styles from './invest-migrate-card.css'

export type InvestMigrateCardProps = {
  className?: string
  title: string
  protocol: string
  balance: string
  tokenIcons: Array<string | null>
  apy: string
  apyBoost: string
  contractId: string
  onHide?: () => void
  onShow?: () => void
  showing?: boolean
  hidding?: boolean
  icon?: 'close' | 'eye'
}

export const InvestMigrateCard: React.VFC<InvestMigrateCardProps> = (props) => {
  const [hide, setHide] = useState(false)

  const { icon = 'close' } = props

  const handleHideToggle = () => {
    setHide(!hide)
  }

  const apyboostDifference = bignumberUtils.minus(props.apyBoost, props.apy)

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <ButtonBase
        className={styles.hideButton}
        onClick={props.onShow ?? handleHideToggle}
      >
        {props.showing ? (
          <CircularProgress />
        ) : (
          <Icon icon={icon} width="34" height="34" />
        )}
      </ButtonBase>
      <div className={styles.header}>
        <div className={styles.contractCardIcons}>
          {props.tokenIcons.map((tokenIcon, index) =>
            tokenIcon ? (
              <img
                src={tokenIcon}
                alt=""
                className={styles.contractCardIcon}
                key={String(index)}
              />
            ) : (
              <Paper className={styles.contractCardIcon} key={String(index)}>
                <Icon icon="unknownNetwork" width="16" height="16" />
              </Paper>
            )
          )}
        </div>
        <Typography>{props.title}</Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.grey}>
          Protocol
        </Typography>
        <Typography variant="body2">{props.protocol}</Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.grey}>
          Balance
        </Typography>
        <Typography variant="body2">
          ${bignumberUtils.format(props.balance)}
        </Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.grey}>
          Current APY
        </Typography>
        <Typography variant="body2">
          {bignumberUtils.formatMax(bignumberUtils.mul(props.apy, 100), 10000)}{' '}
          %
        </Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.grey}>
          APY Boost{' '}
          <ButtonBase
            className={styles.howItWorks}
            as={Link}
            href="https://defihelper.medium.com/auto-staking-explained-da5fbab082e0"
            target="_blank"
          >
            how it works?
          </ButtonBase>
        </Typography>
        <Typography
          variant="body2"
          className={clsx(
            bignumberUtils.gt(apyboostDifference, '0.001') && styles.green
          )}
        >
          {bignumberUtils.gt(apyboostDifference, '0.001') ? (
            <>
              +
              {bignumberUtils.formatMax(
                bignumberUtils.mul(apyboostDifference, 100),
                10000
              )}
              %
            </>
          ) : (
            '0'
          )}
        </Typography>
      </div>
      <Button
        className={styles.button}
        size="small"
        as={ReactRouterLink}
        to={paths.invest.detail(props.contractId)}
      >
        migrate tokens
      </Button>
      {hide && (
        <Paper radius={8} className={styles.hide}>
          <Typography align="center" className={styles.hideTitle}>
            Hide contract
          </Typography>
          <Typography variant="body2" className={styles.hideText}>
            This function allows you to hide those contracts that you don&apos;t
            want to transfer to DeFiHelper. You will always be able to see the
            hidden contracts again in the &quot;Hidden contracts&quot; section.
          </Typography>
          <Button
            size="small"
            className={styles.hideConfirm}
            onClick={props.onHide}
            loading={props.hidding}
          >
            hide contract
          </Button>
          <Button size="small" variant="outlined" onClick={handleHideToggle}>
            cancel
          </Button>
        </Paper>
      )}
    </Paper>
  )
}
