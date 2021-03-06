import { useState, useEffect } from 'react'
import { useAsyncFn, useAsyncRetry } from 'react-use'
import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'

import { ButtonBase } from '~/common/button-base'
import { Button } from '~/common/button'
import { Dialog, useDialog } from '~/common/dialog'
import { AdapterStep } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { Typography } from '~/common/typography'
import { Loader } from '~/common/loader'
import { Input } from '~/common/input'
import { MarkdownRender } from '~/common/markdown-render'
import { toastsService } from '~/toasts'
import { StakingAdapterRadio } from '~/staking/common/staking-adapter-radio'
import * as styles from './staking-adapter-dialog.css'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'

export type StakingAdapterDialogProps = {
  onConfirm: () => void
  steps: AdapterStep[]
  onSubmit?: () => void
  onLastStep?: () => void
  onCancel: () => void
}

export const StakingAdapterDialog: React.FC<StakingAdapterDialogProps> = (
  props
) => {
  const { control, handleSubmit, formState, reset } = useForm()
  const [currentStepNumber, setCurrentStepNumber] = useState(0)

  const [openStopTransaction] = useDialog(StopTransactionDialog)

  const handleStopTransaction = () => {
    openStopTransaction()
      .then(props.onCancel)
      .catch((error) => console.error(error.message))
  }

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

  const handleSetStep = (stepIndex: number) => () => {
    setCurrentStepNumber(stepIndex)
  }

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (!currentStep) return

    const values = formValues[currentStep.name]

    try {
      const can = await currentStep.can(...values)

      if (can instanceof Error) throw can

      const { tx } = await currentStep.send(...values)

      await tx.wait()

      props.onSubmit?.()

      if (steps.value && currentStepNumber < steps.value.length - 1) {
        steps.retry()

        setCurrentStepNumber(currentStepNumber + 1)
      } else {
        props.onConfirm()
        props.onLastStep?.()
      }
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
      }
    }
  })

  const [sendState, handleSend] = useAsyncFn(async () => {
    if (!currentStep) return

    const can = await currentStep.can()

    if (can instanceof Error) return toastsService.error(can.message)

    const { tx } = await currentStep.send()

    await tx.wait()

    props.onSubmit?.()

    if (steps.value && currentStepNumber < steps.value.length - 1) {
      steps.retry()

      setCurrentStepNumber(currentStepNumber + 1)
    } else {
      props.onConfirm()
      props.onLastStep?.()
    }
  }, [currentStep, currentStepNumber, steps.value])

  useEffect(() => {
    if (!currentStep?.info.inputs) return

    reset({
      [currentStep.name]: currentStep.info.inputs.map(({ value }) => value),
    })
  }, [reset, props.steps, currentStep])

  return (
    <Dialog
      className={styles.root}
      onClose={
        formState.isSubmitting || sendState.loading
          ? handleStopTransaction
          : undefined
      }
    >
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
                    render={({ field }) => {
                      const components: Record<string, JSX.Element> = {
                        select: (
                          <Select
                            {...field}
                            label={input.placeholder}
                            value={field.value || input.value}
                            className={styles.input}
                            disabled={formState.isSubmitting}
                          >
                            {input.options?.map((option) => (
                              <SelectOption
                                key={option.value}
                                value={option.value}
                              >
                                {option.label}
                              </SelectOption>
                            ))}
                          </Select>
                        ),
                        radio: (
                          <div>
                            <Typography
                              as="div"
                              variant="body2"
                              family="mono"
                              transform="uppercase"
                              className={styles.label}
                            >
                              {input.placeholder}
                            </Typography>
                            {input.options?.map((option) => (
                              <StakingAdapterRadio
                                key={option.value}
                                {...field}
                                value={option.value}
                                className={styles.radio}
                                disabled={formState.isSubmitting}
                              >
                                {option.label}
                              </StakingAdapterRadio>
                            ))}
                          </div>
                        ),
                      }

                      return (
                        components[input.type] ?? (
                          <Component
                            label={input.placeholder}
                            disabled={formState.isSubmitting}
                            className={styles.input}
                            {...field}
                            value={field.value || input.value}
                          />
                        )
                      )
                    }}
                  />
                )
              })}
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
