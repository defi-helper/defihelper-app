import { useState } from 'react'

import { Button } from '~/common/button'
import { Checkbox } from '~/common/checkbox'
import { Typography } from '~/common/typography'
import { AutomationDialog } from '~/automations/common/automation-dialog'
import * as styles from './staking-description-dialog.css'

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
      props.onConfirm(checked)
    }

    return (
      <AutomationDialog title="Enable autostake">
        <div className={styles.content}>
          <Typography variant="body2" as="div">
            Autostake is a special kind of automation which will auto-compound
            your tokens in most effective way.
          </Typography>
          <Typography variant="body2" as="div">
            1. First, you need to top up your DeFiHelper balance in order to
            launch the transactions.{' '}
          </Typography>
          <Typography variant="body2" as="div">
            2. DeFiHelper is a non-custodial DeFi investment tool, that&apos;s
            why you need to deploy your own contract and transfer LP tokens to
            that contract.
          </Typography>
          <Typography variant="inherit" as="div" className={styles.note}>
            Note: DeFiHelper do not have any access to your deposit. It will
            only have access regulated by smart-contract to claim your rewards
            and return them to the deposit.
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
