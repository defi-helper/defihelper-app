import { useState } from 'react'

import { Dialog } from '~/common/dialog'
import { GovernanceActionsInitial } from '../governance-actions-inital'
import { GovernanceActionsManually } from '../governance-actions-manually'
import { GovernanceActionsTemplate } from '../governance-actions-template'
import { GovernanceAction } from '../governance.types'
import * as styles from './governance-actions-dialog.css'

enum Steps {
  initial = 'initial',
  manually = 'manually',
  template = 'template',
}

export type GovernanceActionsDialogProps = {
  onConfirm: (action: GovernanceAction[]) => void
  onCancel: () => void
  initialAction?: GovernanceAction
}

export const GovernanceActionsDialog: React.VFC<GovernanceActionsDialogProps> =
  (props) => {
    const [currentStep, setCurrentStep] = useState(
      props.initialAction ? Steps.manually : Steps.initial
    )

    const handleManually = () => {
      setCurrentStep(Steps.manually)
    }

    const handleTemplate = () => {
      setCurrentStep(Steps.template)
    }

    const handleOnBack = () => {
      setCurrentStep(Steps.initial)
    }

    const steps = {
      [Steps.initial]: (
        <GovernanceActionsInitial
          onManually={handleManually}
          onTemplate={handleTemplate}
        />
      ),
      [Steps.manually]: (
        <GovernanceActionsManually
          onBack={handleOnBack}
          onSubmit={props.onConfirm}
          initialAction={props.initialAction}
        />
      ),
      [Steps.template]: (
        <GovernanceActionsTemplate
          onBack={handleOnBack}
          onSubmit={props.onConfirm}
        />
      ),
    } as const

    return <Dialog className={styles.root}>{steps[currentStep]}</Dialog>
  }
