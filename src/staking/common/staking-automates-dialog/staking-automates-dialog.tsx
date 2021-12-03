import { useState } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm } from 'react-hook-form'

import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { AutomatesStep } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import * as styles from './staking-automates-dialog.css'

export type StakingAutomatesDialogProps = {
  onConfirm: () => void
  steps: AutomatesStep[]
}

export const StakingAutomatesDialog: React.FC<StakingAutomatesDialogProps> = (
  props
) => {
  const { register, handleSubmit, formState } = useForm()
  const [currentStepNumber, setCurrentStepNumber] = useState(0)

  const steps = useAsyncRetry(async () => {
    const res = await Promise.all(
      props.steps.map(async (step) => ({ ...step, info: await step.info() }))
    )

    return res
  }, [props.steps])

  const handleSetStep = (stepIndex: number) => () => {
    setCurrentStepNumber(stepIndex)
  }

  const currentStep = steps.value?.[currentStepNumber]

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (!currentStep) return

    const values = formValues[currentStep.name]

    try {
      const can = await currentStep.can(...values)

      if (!can) return

      const { tx } = await currentStep.send(...values)

      await tx.wait()
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  })

  const [sendState, handleSend] = useAsyncFn(async () => {
    if (!currentStep) return

    const can = await currentStep.can()

    if (!can) return

    const { tx } = await currentStep.send()

    await tx.wait()
  }, [currentStep])

  return (
    <Dialog className={styles.root}>
      {steps.loading ? (
        <div className={styles.loader}>
          <Loader height="36" />
        </div>
      ) : (
        <>
          <div className={styles.tabs}>
            {steps.value?.map((step, index) => (
              <Typography
                variant="body3"
                transform="uppercase"
                family="mono"
                as={ButtonBase}
                className={styles.title}
                onClick={handleSetStep(index)}
                key={step.name}
              >
                {step.name}
              </Typography>
            ))}
          </div>
          <Typography variant="body2" className={styles.description}>
            {currentStep?.info.description}
          </Typography>
          {currentStep && currentStep.info.inputs && (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleOnSubmit}
              className={styles.form}
            >
              {currentStep.info.inputs.map((input, index) => (
                <NumericalInput
                  key={input.placeholder}
                  label={input.placeholder}
                  value={input.value}
                  disabled={formState.isSubmitting}
                  {...register(`${currentStep?.name}.${index}`)}
                />
              ))}
              <Button
                type="submit"
                loading={formState.isSubmitting}
                className={styles.button}
              >
                {currentStep.name}
              </Button>
            </form>
          )}
          {currentStep && !currentStep.info.inputs && (
            <Button
              loading={sendState.loading}
              onClick={handleSend}
              className={styles.button}
            >
              {currentStep?.name}
            </Button>
          )}
        </>
      )}
    </Dialog>
  )
}
