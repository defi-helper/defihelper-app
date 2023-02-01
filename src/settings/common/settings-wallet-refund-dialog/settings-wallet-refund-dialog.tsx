import { useForm } from 'react-hook-form'
import { useAsyncRetry } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { Dialog, useDialog } from '~/common/dialog'
import { BalanceAdapter } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'
import { Typography } from '~/common/typography'
import * as styles from './settings-wallet-refund-dialog.css'

type FormValues = {
  amount: string
}

export type SettingsWalletRefundDialogProps = {
  onConfirm: () => void
  onSubmit: (formValues: FormValues & { transactionHash: string }) => void
  onCancel: () => void
  adapter: BalanceAdapter
  token?: string | null
}

export const SettingsWalletRefundDialog: React.VFC<SettingsWalletRefundDialogProps> =
  (props) => {
    const { register, handleSubmit, formState, setValue } =
      useForm<FormValues>()

    const [openStopTransaction] = useDialog(StopTransactionDialog)

    const handleStopTransaction = () => {
      openStopTransaction()
        .then(props.onCancel)
        .catch((error) => console.error(error.message))
    }

    const handleOnSubmit = handleSubmit(async (formValues) => {
      try {
        const can = props.adapter.canRefund(formValues.amount)

        if (can instanceof Error) throw can

        const result = await props.adapter.refund(formValues.amount)

        props.onSubmit({ ...formValues, transactionHash: result.tx.hash })

        await result.tx.wait()

        props.onConfirm()
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })

    const balance = useAsyncRetry(
      () => props.adapter.netBalance(),
      [props.adapter.netBalance]
    )

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
            REFUND YOUR DEFIHELPER BALANCE
          </Typography>
        </div>
        <Typography variant="body2" className={styles.subtitle}>
          Your personal balance on DeFiHelper is used to pay network commissions
          for enacted automations, as well as notifications. You can re-claim
          your personal balance at any time.
        </Typography>
        <form
          noValidate
          autoComplete="off"
          className={styles.form}
          onSubmit={handleOnSubmit}
        >
          <NumericalInput
            {...register('amount', { required: true })}
            placeholder="Enter amount"
            className={styles.input}
            helperText={formState.errors.amount?.message}
            error={Boolean(formState.errors.amount?.message)}
            rightSide={props.token}
            label={
              <div className={styles.balance}>
                <ButtonBase
                  onClick={() => setValue('amount', balance.value ?? '0')}
                >
                  {bignumberUtils.format(balance.value)} MAX
                </ButtonBase>
              </div>
            }
          />
          <Button
            type="submit"
            size="small"
            className={styles.button}
            loading={formState.isSubmitting}
          >
            submit
          </Button>
        </form>
      </Dialog>
    )
  }
