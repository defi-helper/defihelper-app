import { useForm } from 'react-hook-form'
import { useAsyncRetry } from 'react-use'

import { bignumberUtils } from '~/common/bignumber-utils'
import { buildExplorerUrl } from '~/common/build-explorer-url'
import { Button } from '~/common/button'
import { ButtonBase } from '~/common/button-base'
import { cutAccount } from '~/common/cut-account'
import { Dialog, useDialog } from '~/common/dialog'
import { Link } from '~/common/link'
import { BalanceAdapter } from '~/common/load-adapter'
import { NumericalInput } from '~/common/numerical-input'
import { StopTransactionDialog } from '~/common/stop-transaction-dialog'
import { Typography } from '~/common/typography'
import * as styles from './settings-wallet-balance-dialog.css'

type FormValues = {
  amount: string
}

export type SettingsWalletBalanceDialogProps = {
  onConfirm: () => void
  onSubmit: (formValues: FormValues & { transactionHash: string }) => void
  network: string
  wallet: string
  priceUSD: string | undefined
  recomendedIncome: string | undefined
  token: string | undefined
  onCancel: () => void
  adapter: BalanceAdapter
}

export const SettingsWalletBalanceDialog: React.VFC<SettingsWalletBalanceDialogProps> =
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
        const can = props.adapter.canDeposit(formValues.amount)

        if (can instanceof Error) throw can

        const result = await props.adapter.deposit(formValues.amount)

        props.onSubmit({ ...formValues, transactionHash: result.tx.hash })

        await result.tx.wait()

        props.onConfirm()
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    })

    const handleRecommendedIncome = () => {
      setValue('amount', props.recomendedIncome ?? '0')
    }

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
            TOP UP YOUR DEFIHELPER BALANCE
          </Typography>
        </div>
        <Typography variant="body2" className={styles.subtitle}>
          Your personal balance on DeFiHelper is used to pay network commissions
          for enacted automations. You can re-claim your personal balance at any
          time.
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
          />
          <div className={styles.balances}>
            <Typography variant="body2" className={styles.grey}>
              Recommended amount to deposit
            </Typography>
            <ButtonBase
              className={styles.recomendedBalance}
              onClick={handleRecommendedIncome}
            >
              {bignumberUtils.format(props.recomendedIncome)} {props.token} ($
              {bignumberUtils.format(
                bignumberUtils.mul(props.recomendedIncome, props.priceUSD)
              )}
              )
            </ButtonBase>
            <Typography variant="body2" className={styles.grey}>
              Your DeFiHelper balance for wallet{' '}
              <Link
                href={buildExplorerUrl({
                  network: props.network,
                  address: props.wallet,
                })}
                target="_blank"
              >
                {cutAccount(props.wallet)}
              </Link>
            </Typography>
            <Typography variant="body2">
              {bignumberUtils.format(balance.value)} {props.token} ($
              {bignumberUtils.format(
                bignumberUtils.mul(balance.value, props.priceUSD)
              )}
              )
            </Typography>
          </div>
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
