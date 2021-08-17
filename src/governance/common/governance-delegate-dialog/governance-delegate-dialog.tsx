import { useState } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import * as styles from './governance-delegate-dialog.css'

export type GovernanceDelegateDialogProps = {
  onConfirm: () => void
}

enum Steps {
  initial = 'initial',
  self = 'self',
  delegant = 'delegant',
}

export const GovernanceDelegateDialog: React.VFC<GovernanceDelegateDialogProps> =
  (props) => {
    const [currentStep, setCurrentStep] = useState(Steps.initial)

    const handleSelfDelegate = () => setCurrentStep(Steps.self)

    const handleAddDelegant = () => setCurrentStep(Steps.delegant)

    const steps = {
      [Steps.initial]: (
        <>
          <Typography align="center" family="mono" transform="uppercase">
            Redelegate {bignumberUtils.format('91367647')} votes
          </Typography>
          <Typography
            align="center"
            family="mono"
            transform="uppercase"
            className={styles.subtitle}
          >
            BAG tokens represent voting shares in BondAppetit governance.
          </Typography>
          <Button onClick={handleSelfDelegate} className={styles.self}>
            Self Delegate
          </Button>
          <Button onClick={handleAddDelegant}>Add Delegant</Button>
        </>
      ),
      [Steps.delegant]: (
        <>
          <Button onClick={props.onConfirm}>Add delegant</Button>
        </>
      ),
      [Steps.self]: <></>,
    }

    return <Dialog className={styles.root}>{steps[currentStep]}</Dialog>
  }
