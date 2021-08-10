import { Button, MenuItem } from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'

import { Dialog } from '~/common/dialog'
import { AddWalletInputType, BlockchainEnum } from '~/graphql/_generated-types'
import * as styles from './portfolio-add-wallet-dialog.css'

export type PortfolioAddWalletDialogProps = {
  onConfirm: (formValues: AddWalletInputType) => void
}

export const PortfolioAddWalletDialog: React.VFC<PortfolioAddWalletDialogProps> =
  (props) => {
    const { register, formState, handleSubmit } = useForm<AddWalletInputType>()

    return (
      <Dialog>
        <form className={styles.root} onSubmit={handleSubmit(props.onConfirm)}>
          <TextField
            type="text"
            label="Blockchain"
            inputProps={register('blockchain')}
            disabled={formState.isSubmitted}
            error={Boolean(formState.errors.blockchain)}
            helperText={formState.errors.blockchain?.message}
            className={styles.input}
            select
            InputLabelProps={{
              className: styles.label,
            }}
          >
            {Object.entries(BlockchainEnum).map(([label, value]) => (
              <MenuItem key={label} value={value}>
                {label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="text"
            label="Address"
            inputProps={register('address')}
            disabled={formState.isSubmitted}
            error={Boolean(formState.errors.address)}
            helperText={formState.errors.address?.message}
            className={styles.input}
            InputLabelProps={{
              className: styles.label,
            }}
          />
          <TextField
            type="text"
            label="Title"
            inputProps={register('network')}
            disabled={formState.isSubmitted}
            error={Boolean(formState.errors.network)}
            helperText={formState.errors.network?.message}
            className={styles.input}
            InputLabelProps={{
              className: styles.label,
            }}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Dialog>
    )
  }
