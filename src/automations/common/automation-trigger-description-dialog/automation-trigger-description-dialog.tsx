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
      <AutomationDialog title="Create an automation">
        <div className={styles.content}>
          <Typography variant="body2" as="div">
            Automation is a set of actions which will be executed every time
            trigger events happend.
          </Typography>
          <Typography variant="body2" as="div">
            1. First choose wallet and protocol/network for automation.{' '}
          </Typography>
          <Typography variant="body2" as="div">
            2. Set up 1 to 20 triggers. In order every trigger event happend
            automation will be executed.
          </Typography>
          <Typography variant="body2" as="div">
            <Typography variant="inherit" as="div">
              3. Choose actions. Every action is a single smart contract with
              several steps and its own quick setup.
            </Typography>
            <Typography variant="inherit" as="div" className={styles.note}>
              Note: Every action (except notifications) will be charged GAS Fee
              in blockchain.
            </Typography>
          </Typography>
          <Typography variant="body2" as="div">
            To launch an automation you should deploy a contract at the final
            step. Before contract is deploed you can save an automation for
            later but it won&apos;t work.
          </Typography>
        </div>
        <Typography as="label" variant="body2" className={styles.checkbox}>
          <Checkbox checked={checked} onChange={handleToggle} />
          <Typography variant="inherit">
            Don&apos;t show this intro again
          </Typography>
        </Typography>
        <Button onClick={handleConfirm}>Setup Automation</Button>
      </AutomationDialog>
    )
  }
