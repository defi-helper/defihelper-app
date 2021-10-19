import { MenuItem } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'

import { Dialog } from '~/common/dialog'
import { Input } from '~/common/input'
import { Button } from '~/common/button'
import { AddWalletInputType, BlockchainEnum } from '~/graphql/_generated-types'
import * as styles from './portfolio-add-wallet-dialog.css'

export type PortfolioAddWalletDialogProps = {
  onConfirm: (formValues: AddWalletInputType) => void
}

export const PortfolioAddWalletDialog: React.VFC<PortfolioAddWalletDialogProps> =
  (props) => {
    const { register, formState, handleSubmit } = useForm<AddWalletInputType>()

    return (
      <Dialog className={styles.root}>
        <form className={styles.form} onSubmit={handleSubmit(props.onConfirm)}>
          <div className={styles.input}>
            <TextField
              type="text"
              label="Blockchain"
              inputProps={register('blockchain')}
              disabled={formState.isSubmitted}
              error={Boolean(formState.errors.blockchain)}
              helperText={formState.errors.blockchain?.message}
              select
            >
              {Object.entries(BlockchainEnum).map(([label, value]) => (
                <MenuItem key={label} value={value}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <Input
            type="text"
            label="Address"
            {...register('address')}
            disabled={formState.isSubmitted}
            error={Boolean(formState.errors.address)}
            helperText={formState.errors.address?.message}
            className={styles.input}
          />
          <Input
            type="text"
            label="Title"
            {...register('network')}
            disabled={formState.isSubmitted}
            error={Boolean(formState.errors.network)}
            helperText={formState.errors.network?.message}
            className={styles.input}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
    )
  }
