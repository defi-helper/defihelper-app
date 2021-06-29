import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { FormLabel, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect } from 'react'

import { BlockchainEnum } from '~/graphql/_generated-types'

type FormValues = {
  blockchain: BlockchainEnum
  network: string
  address: string
  adapter: string
  name: string
  description?: string | null
  link?: string | null
  hidden?: boolean | null
}

export type StakingFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: FormValues
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: theme.spacing(2)
    }
  }
}))

export const StakingForm: React.FC<StakingFormProps> = (props) => {
  const classes = useStyles()

  const { register, setValue, handleSubmit, reset } = useForm<FormValues>()

  const hidden = register('hidden')

  const blockChain = register('blockchain')

  useEffect(() => {
    if (!props.defaultValues) return

    reset(props.defaultValues)
  }, [props.defaultValues, reset])

  return (
    <form
      noValidate
      autoComplete="off"
      className={classes.root}
      onSubmit={handleSubmit(props.onSubmit)}
    >
      <TextField
        type="text"
        label="Name"
        defaultValue={props.defaultValues?.name}
        {...register('name')}
        disabled={props.loading}
      />
      <TextField
        type="text"
        label="Description"
        defaultValue={props.defaultValues?.description}
        {...register('description')}
        disabled={props.loading}
      />
      <TextField
        type="text"
        label="Adapter"
        defaultValue={props.defaultValues?.adapter}
        {...register('adapter')}
        disabled={props.loading}
      />
      <TextField
        type="text"
        label="Address"
        defaultValue={props.defaultValues?.address}
        {...register('address')}
        disabled={props.loading}
      />
      <TextField
        type="text"
        label="Network"
        defaultValue={props.defaultValues?.network}
        {...register('network')}
        disabled={props.loading}
      />
      <TextField
        type="text"
        label="Blockchain"
        defaultValue={
          props.defaultValues?.blockchain ?? BlockchainEnum.Ethereum
        }
        select
        disabled={props.loading}
        inputRef={blockChain.ref}
        {...blockChain}
      >
        {Object.entries(BlockchainEnum).map(([label, value]) => (
          <MenuItem key={label} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="text"
        label="Link"
        defaultValue={props.defaultValues?.link}
        {...register('link')}
        disabled={props.loading}
      />
      <FormLabel>
        Hidden
        <Checkbox
          inputRef={hidden.ref}
          defaultChecked={props.defaultValues?.hidden ?? undefined}
          onChange={(_, checked) => setValue('hidden', checked)}
          disabled={props.loading}
        />
      </FormLabel>
      <Button
        color="primary"
        variant="contained"
        disabled={props.loading}
        type="submit"
      >
        Submit
      </Button>
    </form>
  )
}
