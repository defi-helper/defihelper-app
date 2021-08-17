import { cloneElement, isValidElement, useState } from 'react'

import { ButtonBase } from '~/common/button-base'
import { Icon } from '~/common/icon'
import * as styles from './governance-actions-stepper.css'

export type GovernanceActionsStepperProps = {
  onBack: () => void
  initialStep?: number
  children: React.ReactNodeArray
}

export const GovernanceActionsStepper: React.VFC<GovernanceActionsStepperProps> =
  (props) => {
    const { initialStep = 0, onBack, children } = props

    const [currentStep, setStep] = useState(initialStep)

    const currentChild = children[currentStep]

    if (!isValidElement(currentChild)) throw new Error('child is not valid')

    const handleOnBack = () => {
      if (currentStep === 0) onBack()
      else setStep(currentStep - 1)
    }

    const handleOnNext = (...args: unknown[]) => {
      if (currentStep < props.children.length - 1) {
        setStep(currentStep + 1)
      }

      currentChild.props.onSubmit?.(...args)
    }

    return (
      <>
        <ButtonBase className={styles.backButton} onClick={handleOnBack}>
          <Icon icon="backArrow" width="40" height="40" />
        </ButtonBase>
        {cloneElement(currentChild, {
          ...currentChild.props,
          onSubmit: handleOnNext,
        })}
      </>
    )
  }
