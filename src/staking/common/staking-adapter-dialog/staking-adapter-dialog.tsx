import { useState, useEffect } from 'react'
import { useAsync, useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { AdapterStep } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { Input } from '~/common/input'
import { MarkdownRender } from '~/common/markdown-render'
import * as styles from './staking-adapter-dialog.css'

export type StakingAdapterDialogProps = {
  onConfirm: () => void
  steps: AdapterStep[]
  onSubmit?: () => void
}

export const StakingAdapterDialog: React.FC<StakingAdapterDialogProps> = (
  props
) => {
  const { control, handleSubmit, formState, reset } = useForm()
  const [currentStepNumber, setCurrentStepNumber] = useState(0)

  const steps = useAsyncRetry(async () => {
    const res = await Promise.all(
      props.steps.map(async (step) => ({
        ...step,
        info: await step.info(),
      }))
    )

    return res
  }, [props.steps])

  const currentStep = steps.value?.[currentStepNumber]

  const errorValue = useAsync(async () => {
    if (!currentStep || !currentStep.info.inputs) return

    const can = await currentStep.can(
      ...currentStep.info.inputs.map(({ value }) => value)
    )

    if (can instanceof Error) throw can
  }, [currentStep])

  const handleSetStep = (stepIndex: number) => () => {
    setCurrentStepNumber(stepIndex)
  }

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (!currentStep) return

    const values = formValues[currentStep.name]

    try {
      const can = await currentStep.can(...values)

      if (can instanceof Error) return

      const { tx } = await currentStep.send(...values)

      await tx.wait()

      props.onSubmit?.()

      if (steps.value && currentStepNumber < steps.value.length - 1) {
        steps.retry()

        setCurrentStepNumber(currentStepNumber + 1)
      } else {
        props.onConfirm()
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  })

  const [sendState, handleSend] = useAsyncFn(async () => {
    if (!currentStep) return

    const can = await currentStep.can()

    if (can instanceof Error) return

    const { tx } = await currentStep.send()

    await tx.wait()

    props.onSubmit?.()

    if (steps.value && currentStepNumber < steps.value.length - 1) {
      steps.retry()

      setCurrentStepNumber(currentStepNumber + 1)
    } else {
      props.onConfirm()
    }
  }, [currentStep, currentStepNumber, steps.value])

  useEffect(() => {
    if (!currentStep?.info.inputs) return

    reset({
      [currentStep.name]: currentStep.info.inputs.map(({ value }) => value),
    })
  }, [reset, props.steps, currentStep])

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
                className={clsx(styles.title, {
                  [styles.activeTab]: index === currentStepNumber,
                })}
                onClick={handleSetStep(index)}
                key={step.name}
              >
                {step.name}
              </Typography>
            ))}
          </div>
          <div className={styles.description}>
            <MarkdownRender>{currentStep?.info.description}</MarkdownRender>
          </div>
          {currentStep && currentStep.info.inputs && (
            <form
              noValidate
              autoComplete="off"
              onSubmit={handleOnSubmit}
              className={styles.form}
            >
              {currentStep.info.inputs.map((input, index) => {
                const Component = !input.value ? Input : NumericalInput

                return (
                  <Controller
                    control={control}
                    key={input.placeholder}
                    name={`${currentStep?.name}.${index}`}
                    render={({ field }) => (
                      <Component
                        label={input.placeholder}
                        disabled={formState.isSubmitting}
                        className={styles.input}
                        {...field}
                        value={field.value || input.value}
                      />
                    )}
                  />
                )
              })}
              <Button
                type="submit"
                loading={formState.isSubmitting}
                disabled={Boolean(errorValue.error?.message)}
                className={styles.button}
              >
                {errorValue.error?.message ?? currentStep.name}
              </Button>
            </form>
          )}
          {currentStep && !currentStep.info.inputs && (
            <Button
              loading={sendState.loading}
              onClick={handleSend}
              disabled={Boolean(errorValue.error?.message)}
              className={styles.button}
            >
              {errorValue.error?.message ?? currentStep?.name}
            </Button>
          )}
        </>
      )}
    </Dialog>
  )
}
