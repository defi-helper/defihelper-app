import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import { FormLabel, makeStyles } from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'

import { protocolFormSchema } from './protocol-form.validation'

type FormValues = {
  name: string
  description?: string
  icon?: string
  link?: string
  hidden?: boolean
  adapter: string
}

export type ProtocolFormProps = {
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

export const ProtocolForm: React.VFC<ProtocolFormProps> = (props) => {
  const { register, handleSubmit, setValue, reset, formState } =
    useForm<FormValues>({
      resolver: yupResolver(protocolFormSchema)
    })

  const classes = useStyles()

  useEffect(() => {
    reset(props.defaultValues)
  }, [reset, props.defaultValues])

  const hidden = register('hidden')

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(props.onSubmit)}
      noValidate
      autoComplete="off"
    >
      <TextField
        type="text"
        label="Name"
        inputProps={register('name')}
        disabled={props.loading}
        error={Boolean(formState.errors.name)}
        helperText={formState.errors.name?.message}
      />
      <TextField
        type="text"
        label="Description"
        inputProps={register('description')}
        disabled={props.loading}
        error={Boolean(formState.errors.description)}
        helperText={formState.errors.description?.message}
      />
      <TextField
        type="text"
        label="Icon"
        inputProps={register('icon')}
        disabled={props.loading}
        error={Boolean(formState.errors.icon)}
        helperText={formState.errors.icon?.message}
      />
      <TextField
        type="text"
        label="Adapter"
        inputProps={register('adapter')}
        disabled={props.loading}
        error={Boolean(formState.errors.adapter)}
        helperText={formState.errors.adapter?.message}
      />
      <TextField
        type="text"
        label="Link"
        inputProps={register('link')}
        disabled={props.loading}
        error={Boolean(formState.errors.link)}
        helperText={formState.errors.link?.message}
      />
      <FormLabel>
        Hidden
        <Checkbox
          inputRef={hidden.ref}
          defaultChecked={props.defaultValues?.hidden}
          onChange={(_, checked) => setValue('hidden', checked)}
          disabled={props.loading}
        />
      </FormLabel>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={props.loading}
      >
        Submit
      </Button>
    </form>
  )
}
