import { useState } from 'react'

import { Button } from '~/common/button'
import { Checkbox } from '~/common/checkbox'
import { Typography } from '~/common/typography'
import { AutomationDialog } from '~/automations/common/automation-dialog'
import * as styles from './automation-trigger-description-dialog.css'

export type AutomationTriggerDescriptionDialogProps = {
  onCancel: () => void
  onConfirm: (value: boolean) => void
}

export const AutomationTriggerDescriptionDialog: React.VFC<AutomationTriggerDescriptionDialogProps> =
  (props) => {
    const [checked, setChecked] = useState(false)

    const handleToggle = () => {
      setChecked(!checked)
    }

    const handleConfirm = () => {
      props.onConfirm(checked)
    }

    return (
      <AutomationDialog title="Create an automation" className={styles.root}>
        <div className={styles.content}>
          <Typography variant="body2" as="div">
            An automation is a set of actions which will be executed every time
            a trigger event happens.
          </Typography>
          <Typography variant="body2" as="div">
            1. First, choose a wallet and protocol/network for automation.{' '}
          </Typography>
          <Typography variant="body2" as="div">
            2. Set up between 1 to 20 conditions. Automation will occur every
            time a trigger event occurs.
          </Typography>
          <Typography variant="body2" as="div">
            <Typography variant="inherit" as="div">
              3. Choose actions. Every action can be a single smart contract or
              email/telegram notification. You should deploy your own contract
              at the final step if you choose to launch the blockchain
              transaction.
            </Typography>
          </Typography>
          <Typography variant="body2" as="div">
            You can save an automation before you deploy it as a draft, without
            enacting it.
          </Typography>
          <Typography variant="inherit" as="div" className={styles.note}>
            Note: A gas fee will be charged for every completed action
          </Typography>
        </div>
        <Typography as="label" variant="body2" className={styles.checkbox}>
          <Checkbox checked={checked} onChange={handleToggle} />
          <Typography variant="inherit">Don&apos;t show this again</Typography>
        </Typography>
        <Button onClick={handleConfirm}>Set up automation</Button>
      </AutomationDialog>
    )
  }
