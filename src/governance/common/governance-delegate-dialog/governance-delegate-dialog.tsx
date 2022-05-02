import { useState } from 'react'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { Typography } from '~/common/typography'
import { GovernanceActionsStepper } from '../governance-actions-stepper'
import { GovernanceAddDelegant } from '../governance-add-delegant'
import { GovernanceSelfDelegate } from '../governance-self-delegate'
import * as styles from './governance-delegate-dialog.css'

export type GovernanceDelegateDialogProps = {
  onConfirm: (address: string) => void
  votes?: string | null
  account: string
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

    const handleBack = () => setCurrentStep(Steps.initial)

    const steps = {
      [Steps.initial]: (
        <>
          <Typography align="center" family="mono" transform="uppercase">
            Redelegate {bignumberUtils.format(props.votes)} votes
          </Typography>
          <Typography
            align="center"
            family="mono"
            transform="uppercase"
            className={styles.subtitle}
          >
            tokens represent voting shares in DeFiHelper governance.
          </Typography>
          <Button onClick={handleSelfDelegate} className={styles.self}>
            Self Delegate
          </Button>
          <Button onClick={handleAddDelegant}>Add Delegant</Button>
        </>
      ),
      [Steps.delegant]: (
        <GovernanceActionsStepper onBack={handleBack}>
          {[<GovernanceAddDelegant key={0} onSubmit={props.onConfirm} />]}
        </GovernanceActionsStepper>
      ),
      [Steps.self]: (
        <GovernanceSelfDelegate
          account={props.account}
          onSubmit={props.onConfirm}
        />
      ),
    }

    return <Dialog className={styles.root}>{steps[currentStep]}</Dialog>
  }
