import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { FormLabel, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { BlockchainEnum } from '~/graphql/_generated-types'
import { stakingContractFormSchema } from './staking-contract-form.validation'

export type FormValues = {
  blockchain: BlockchainEnum
  network: string
  address: string
  adapter: string
  name: string
  description?: string | null
  link?: string | null
  hidden?: boolean | null
  layout: string
}

export type StakingContractFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: Omit<FormValues, 'layout'> & { layout?: string }
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',

    '& > *': {
      margin: theme.spacing(2),
    },
  },
}))

export const StakingContractForm: React.VFC<StakingContractFormProps> = (
  props
) => {
  const classes = useStyles()

  const { register, setValue, handleSubmit, reset, formState } =
    useForm<FormValues>({
      resolver: yupResolver(stakingContractFormSchema),
    })

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
        error={Boolean(formState.errors.name)}
        helperText={formState.errors.name?.message}
      />
      <TextField
        type="text"
        label="Description"
        defaultValue={props.defaultValues?.description}
        {...register('description')}
        disabled={props.loading}
        multiline
        error={Boolean(formState.errors.description)}
        helperText={formState.errors.description?.message}
      />
      <TextField
        type="text"
        label="Adapter"
        defaultValue={props.defaultValues?.adapter}
        {...register('adapter')}
        disabled={props.loading}
        error={Boolean(formState.errors.adapter)}
        helperText={formState.errors.adapter?.message}
      />
      <TextField
        type="text"
        label="Address"
        defaultValue={props.defaultValues?.address}
        {...register('address')}
        disabled={props.loading}
        error={Boolean(formState.errors.address)}
        helperText={formState.errors.address?.message}
      />
      <TextField
        type="text"
        label="Network"
        defaultValue={props.defaultValues?.network}
        {...register('network')}
        disabled={props.loading}
        error={Boolean(formState.errors.network)}
        helperText={formState.errors.network?.message}
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
        error={Boolean(formState.errors.blockchain)}
        helperText={formState.errors.blockchain?.message}
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
        error={Boolean(formState.errors.link)}
        helperText={formState.errors.link?.message}
      />
      <TextField
        type="text"
        label="Layout"
        defaultValue={props.defaultValues?.layout}
        {...register('layout')}
        disabled={props.loading}
        error={Boolean(formState.errors.layout)}
        helperText={formState.errors.layout?.message}
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
