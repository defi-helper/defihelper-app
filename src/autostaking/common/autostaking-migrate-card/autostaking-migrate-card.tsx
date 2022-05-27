import clsx from 'clsx'
import { useState } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import { Link } from '~/common/link'
import { Paper } from '~/common/paper'
import { Typography } from '~/common/typography'
import * as styles from './autostaking-migrate-card.css'

export type AutostakingMigrateCardProps = {
  className?: string
  title: string
  protocol: string
  balance: string
  apy: string
  apyBoost: string
  onMigrate?: () => void
  onHide?: () => void
  icon?: 'close' | 'eye'
}

export const AutostakingMigrateCard: React.VFC<AutostakingMigrateCardProps> = (
  props
) => {
  const [hide, setHide] = useState(false)

  const { icon = 'close' } = props

  const handleHideToggle = () => {
    setHide(!hide)
  }

  return (
    <Paper radius={8} className={clsx(styles.root, props.className)}>
      <ButtonBase className={styles.hideButton} onClick={handleHideToggle}>
        <Icon icon={icon} width="34" height="34" />
      </ButtonBase>
      <div className={styles.header}>
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
          +{bignumberUtils.formatMax(bignumberUtils.mul(props.apy, 100), 10000)}{' '}
          %
        </Typography>
      </div>
      <div className={styles.item}>
        <Typography variant="body2" className={styles.grey}>
          Boosted APY{' '}
          <Link href="/" color="blue">
            how it works?
          </Link>
        </Typography>
        <Typography variant="body2" className={styles.green}>
          + {bignumberUtils.formatMax(props.apyBoost, 10000)} %
        </Typography>
      </div>
      <Button className={styles.button} size="small">
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
