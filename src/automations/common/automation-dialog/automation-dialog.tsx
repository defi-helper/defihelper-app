import clsx from 'clsx'

import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './automation-dialog.css'

export type AutomationDialogProps = {
  title: React.ReactNode
  onBack?: () => void
  className?: string
}

export const AutomationDialog: React.FC<AutomationDialogProps> = (props) => {
  return (
    <Dialog
      className={clsx(styles.root, props.className)}
      onBack={props.onBack}
    >
      <div className={styles.header}>
        <Typography
          variant="body3"
          transform="uppercase"
          family="mono"
          as="div"
          className={styles.title}
        >
          {props.title}
        </Typography>
      </div>
      {props.children}
    </Dialog>
  )
}
