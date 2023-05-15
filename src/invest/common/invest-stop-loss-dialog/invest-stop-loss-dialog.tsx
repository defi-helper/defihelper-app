import React from 'react'

import { Dialog } from '~/common/dialog'
import { InvestStopLoss, InvestStopLossProps } from '../invest-stop-loss'
import * as styles from './invest-stop-loss-dialog.css'

export type InvestStopLossDialogProps = InvestStopLossProps

export const InvestStopLossDialog: React.VFC<InvestStopLossDialogProps> = (
  props
) => {
  return (
    <Dialog className={styles.root}>
      <InvestStopLoss {...props} />
    </Dialog>
  )
}
