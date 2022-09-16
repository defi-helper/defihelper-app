import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useAsyncRetry } from 'react-use'
import { analytics } from '~/analytics'

import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dialog, useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { DeployStep } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'
import { Typography } from '~/common/typography'
import { toastsService } from '~/toasts'
import * as styles from './invest-deploy-dialog.css'

export type InvestDeployDialogProps = {
  onConfirm: (formValues: { address: string; inputs: string[] }) => void
  onCancel: () => void
  steps: DeployStep[]
  onSubmit?: () => void
}

const currentStepNumber = 0

export const InvestDeployDialog: React.VFC<InvestDeployDialogProps> = (
  props
) => {
  const [open, setOpen] = useState(false)

  const [openStopTransaction] = useDialog(StopTransactionDialog)

  const handleStopTransaction = () => {
    openStopTransaction()
      .then(props.onCancel)
      .catch((error) => console.error(error.message))
  }

  const { handleSubmit, formState, control, reset } = useForm()

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

  const handleOnSubmit = handleSubmit(async (formValues) => {
    if (!currentStep) return
    analytics.log(`autostaking_deploy_click`)

    const values = formValues[currentStep.name]

    try {
      const can = await currentStep.can(...values)

      if (can instanceof Error) throw can

      const { tx, getAddress } = await currentStep.send(...values)

      await tx.wait()

      props.onConfirm({
        address: await getAddress(),
        inputs: values,
      })

      analytics.log(`autostaking_deploy_success`)
    } catch (error) {
      if (error instanceof Error) {
        toastsService.error(error.message)
        analytics.log(`autostaking_deploy_failure`)
      }
    }
  })

  useEffect(() => {
    if (!currentStep?.info.inputs) return

    reset({
      [currentStep.name]: currentStep.info.inputs.map(({ value }) => value),
    })
  }, [reset, props.steps, currentStep])

  const handleToggle = () => setOpen(!open)

  return (
    <Dialog
      className={styles.root}
      onClose={formState.isSubmitting ? handleStopTransaction : undefined}
    >
      <div className={styles.mb}>
        <Typography
          variant="body2"
          transform="uppercase"
          className={styles.title}
          as="span"
        >
          DEPLOY
        </Typography>
      </div>
      <Typography variant="body2" className={styles.subtitle}>
        To run any automate you need to deploy your own contract for this
        automation. Your tokens will be transfered to this contarct in later
        step to allow DeFiHelper to manage your automation.
      </Typography>
      <div className={styles.advancedSettings}>
        <ButtonBase onClick={handleToggle}>
          Advanced settings{' '}
          <Icon icon={open ? 'arrowUp' : 'arrowDown'} width="16" height="16" />
        </ButtonBase>
      </div>
      <form
        noValidate
        autoComplete="off"
        className={styles.form}
        onSubmit={handleOnSubmit}
      >
        {open && currentStep?.info.inputs && (
          <>
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
                      className={styles.mb16}
                      {...field}
                      value={field.value || input.value}
                    />
                  )}
                />
              )
            })}
            <Typography variant="body2" className={styles.attention}>
              Attention! Only make changes if you know exactly what you are
              doing. You can lose all of your funds!
            </Typography>
          </>
        )}
        <Button
          className={styles.button}
          type="submit"
          size="small"
          loading={formState.isSubmitting}
        >
          deploy
        </Button>
      </form>
    </Dialog>
  )
}
