import { yupResolver } from '@hookform/resolvers/yup'

import { useForm } from 'react-hook-form'
import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { Dialog } from '~/common/dialog'
import { NumericalInput } from '~/common/numerical-input'
import { Typography } from '~/common/typography'
import { networksConfig } from '~/networks-config'
import * as styles from './staking-billing-form-dialog.css'
import { settingsBillingFormSchema } from './staking-billing-form-dialog.validation'

type FormValues = {
  amount: string
}

export type StakingBillingFormDialogProps = {
  onConfirm: () => void
  onSubmit: (formValues: FormValues) => Promise<void>
  onCancel: (error: unknown) => void
  balance: string
  network: string
}

export const StakingBillingFormDialog: React.VFC<StakingBillingFormDialogProps> =
  (props) => {
    const { register, formState, handleSubmit } = useForm<FormValues>({
      resolver: yupResolver(settingsBillingFormSchema),
    })

    const handleOnSubmit = handleSubmit(async (formValues) => {
      try {
        await props.onSubmit(formValues)
        props.onConfirm()
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })

    return (
      <Dialog className={styles.root}>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleOnSubmit}
        >
          <div className={styles.title}>
            <Typography as="div" variant="body3">
              In order to run automations you need to top up your balance.
            </Typography>
            <Typography as="div" variant="body3">
              Your current balance: {bignumberUtils.format(props.balance)}{' '}
              {networksConfig[props.network]?.coin}
            </Typography>
          </div>
          <NumericalInput
            {...register('amount')}
            className={styles.input}
            placeholder="Enter amount"
            helperText={formState.errors.amount?.message}
            error={Boolean(formState.errors.amount?.message)}
            disabled={formState.isSubmitting}
          />
          <div className={styles.buttons}>
            <Button type="submit" loading={formState.isSubmitting}>
              Submit
            </Button>
            <Button
              variant="outlined"
              disabled={formState.isSubmitting}
              onClick={props.onCancel}
            >
              Cancel
            </Button>
            <Button
              variant="outlined"
              disabled={formState.isSubmitting}
              onClick={props.onConfirm}
            >
              SKIP
            </Button>
          </div>
        </form>
      </Dialog>
    )
  }
