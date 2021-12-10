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
      <AutomationDialog title="Create an automation">
        <div className={styles.content}>
          <Typography variant="body2" as="div">
            Some text
          </Typography>
        </div>
        <Typography as="label" variant="body2" className={styles.checkbox}>
          <Checkbox checked={checked} onChange={handleToggle} />
          <Typography variant="inherit">Don&apos;t show this again</Typography>
        </Typography>
        <Button onClick={handleConfirm}>Setup Automation</Button>
      </AutomationDialog>
    )
  }
