import clsx from 'clsx'
import { ButtonBase } from '~/common/button-base'
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
    <Dialog className={clsx(styles.root, props.className)}>
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
        {props.onBack && (
          <ButtonBase className={styles.button} onClick={props.onBack}>
            Back
          </ButtonBase>
        )}
      </div>
      {props.children}
    </Dialog>
  )
}
