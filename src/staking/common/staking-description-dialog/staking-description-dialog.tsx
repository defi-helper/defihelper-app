import { useState } from 'react'

import { Button } from '~/common/button'
import { Checkbox } from '~/common/checkbox'
import { Typography } from '~/common/typography'
import { AutomationDialog } from '~/automations/common/automation-dialog'
import * as styles from './staking-description-dialog.css'
import { analytics } from '~/analytics'

export type StakingDescriptionDialogProps = {
  onCancel: () => void
  onConfirm: (value: boolean) => void
}

export const StakingDescriptionDialog: React.VFC<StakingDescriptionDialogProps> =
  (props) => {
    const [checked, setChecked] = useState(false)

    const handleToggle = () => {
      setChecked(!checked)
    }

    const handleConfirm = () => {
      analytics.log('auto_staking_pop_up_start_click')
      props.onConfirm(checked)
    }

    return (
      <AutomationDialog title="Enable auto-staking" className={styles.root}>
        <div className={styles.content}>
          <Typography variant="body2" as="div">
            Autostaking is a special kind of automation, which auto-compounds
            your tokens at the optimal rate - maximizing your profit and
            minimizing your effort.
          </Typography>
          <Typography variant="body2" as="div">
            1. Firstly, you need to have topped up your DeFiHelper balance in
            order to perform the transactions.{' '}
          </Typography>
          <Typography variant="body2" as="div">
            2. As DFH is non-custodial, it does not have access to your funds,
            so you need to deploy your own special staking contract and transfer
            LP tokens to it.
          </Typography>
          <Typography variant="inherit" as="div" className={styles.note}>
            Note: DeFiHelper does not have access to your deposit. It only has
            access (regulated by smart contract) to claim your rewards and add
            them to the deposit.
          </Typography>
        </div>
        <Typography as="label" variant="body2" className={styles.checkbox}>
          <Checkbox checked={checked} onChange={handleToggle} />
          <Typography variant="inherit">Don&apos;t show this again</Typography>
        </Typography>
        <Button onClick={handleConfirm}>START</Button>
      </AutomationDialog>
    )
  }
