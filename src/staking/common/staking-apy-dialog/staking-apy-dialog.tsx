import { bignumberUtils } from '~/common/bignumber-utils'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './staking-apy-dialog.css'

export type StakingApyDialogProps = {
  apr: Record<string, string>
  staked: string
  onCancel: () => void
}

export const StakingApyDialog: React.FC<StakingApyDialogProps> = (props) => {
  const staked = bignumberUtils.eq(props.staked, 0) ? 1000 : props.staked

  const apr = Object.entries(props.apr).map(([title, apy]) => {
    const apyMul = bignumberUtils.mul(apy, 100)

    return {
      title,
      apy: apyMul,
      perStaked: bignumberUtils.mul(apy, staked),
    }
  })

  return (
    <Dialog className={styles.root}>
      <div className={styles.row}>
        <Typography variant="body2">Timeframe</Typography>
        <Typography variant="body2" align="right">
          Apy
        </Typography>
        <Typography variant="body2" align="right">
          Per ${bignumberUtils.format(staked)}
        </Typography>
      </div>
      {apr.map((aprItem) => (
        <div className={styles.row} key={aprItem.title}>
          <Typography variant="body2">{aprItem.title}</Typography>
          <Typography variant="body2" family="mono" align="right">
            {bignumberUtils.formatMax(aprItem.apy, 10000)}%
          </Typography>
          <Typography variant="body2" family="mono" align="right">
            ${bignumberUtils.format(aprItem.perStaked)}
          </Typography>
        </div>
      ))}
    </Dialog>
  )
}
