import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { FormLabel, makeStyles } from '@material-ui/core'
import { useForm } from 'react-hook-form'
import MenuItem from '@material-ui/core/MenuItem'
import { useEffect, useState } from 'react'
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
  eventsToSubscribe?: string[]
}

export type StakingContractFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
  defaultValues?: Omit<FormValues, 'layout'> & { layout?: string }
  adapterKeys?: string[]
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
  const layout = register('layout')
  const adapter = register('adapter')

  const [subscribeToEventsFromList, setSubscribeToEventsFromList] =
    useState(false)

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
        inputRef={adapter.ref}
        {...adapter}
        disabled={props.loading}
        error={Boolean(formState.errors.adapter)}
        helperText={formState.errors.adapter?.message}
        select
      >
        {props.adapterKeys?.map((key) => (
          <MenuItem key={key} value={key}>
            {key}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        type="text"
        label="Address"
        defaultValue={props.defaultValues?.address}
        {...register('address')}
        disabled={props.loading}
        error={Boolean(formState.errors.address)}
        helperText={formState.errors.address?.message}
      />
      <FormLabel>
        Subscribe on events from list
        <Checkbox
          value={subscribeToEventsFromList}
          defaultChecked={props.defaultValues?.hidden ?? undefined}
          onChange={(_, checked) => {
            setSubscribeToEventsFromList(checked)
            if (!checked) {
              setValue('eventsToSubscribe', undefined)
            } else {
              setValue('eventsToSubscribe', [])
            }
          }}
          disabled={props.loading}
        />
      </FormLabel>
      {subscribeToEventsFromList ? (
        <TextField
          type="text"
          label="Events to subscribe"
          onChange={(changeEvent) =>
            setValue(
              'eventsToSubscribe',
              changeEvent.target.value
                ? changeEvent.target.value
                    .split(',')
                    .map((event) => event.trim())
                : []
            )
          }
          disabled={props.loading}
          error={Boolean(formState.errors.eventsToSubscribe)}
        />
      ) : null}
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
        inputRef={layout.ref}
        {...layout}
        disabled={props.loading}
        error={Boolean(formState.errors.layout)}
        helperText={formState.errors.layout?.message}
        select
      >
        <MenuItem value="staking">staking</MenuItem>
      </TextField>
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
