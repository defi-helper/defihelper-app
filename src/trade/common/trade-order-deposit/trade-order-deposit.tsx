import clsx from 'clsx'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import * as styles from './trade-order-deposit.css'

export type TradeOrderDepositProps = {
  className?: string
  onDeposit?: () => void
  depositing?: boolean
  lowBalance?: boolean
}

export const TradeOrderDeposit: React.FC<TradeOrderDepositProps> = (props) => {
  if (!props.lowBalance) return <>{props.children}</>

  return (
    <div className={clsx(props.className, styles.root)}>
      <div className={styles.header}>
        <Typography variant="body3">
          Top up your DeFiHelper balance to pay blockchain fee
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={props.onDeposit}
          loading={props.depositing}
        >
          deposit
        </Button>
      </div>
      {props.children}
    </div>
  )
}
