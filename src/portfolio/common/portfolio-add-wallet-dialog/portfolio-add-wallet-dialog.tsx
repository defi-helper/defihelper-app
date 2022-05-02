import { useForm, Controller } from 'react-hook-form'

import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Button } from '~/common/button'
import { AddWalletInputType, BlockchainEnum } from '~/api/_generated-types'
import { Select, SelectOption } from '~/common/select'
import * as styles from './portfolio-add-wallet-dialog.css'

export type PortfolioAddWalletDialogProps = {
  onConfirm: (formValues: AddWalletInputType) => void
}

export const PortfolioAddWalletDialog: React.VFC<PortfolioAddWalletDialogProps> =
  (props) => {
    const { register, formState, handleSubmit, control } =
      useForm<AddWalletInputType>()

    return (
      <Dialog className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit(props.onConfirm)}>
          <div className={styles.input}>
            <Controller
              render={({ field }) => (
                <Select
                  label="Blockchain"
                  {...field}
                  error={Boolean(formState.errors.blockchain)}
                  helperText={formState.errors.blockchain?.message}
                >
                  {Object.entries(BlockchainEnum).map(([label, value]) => (
                    <SelectOption key={value} value={value}>
                      {label}
                    </SelectOption>
                  ))}
                </Select>
              )}
              name="blockchain"
              control={control}
            />
          </div>
          <Input
            type="text"
            label="Address"
            {...register('address')}
            disabled={formState.isSubmitting}
            error={Boolean(formState.errors.address)}
            helperText={formState.errors.address?.message}
            className={styles.input}
          />
          <Input
            type="text"
            label="Title"
            {...register('network')}
            disabled={formState.isSubmitting}
            error={Boolean(formState.errors.network)}
            helperText={formState.errors.network?.message}
            className={styles.input}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
    )
  }
