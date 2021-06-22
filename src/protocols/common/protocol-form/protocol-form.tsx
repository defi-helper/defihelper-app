import React from 'react'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core'

type FormValues = {
  name: string
  description: string
  file: File[]
}

export type ProtocolFormProps = {
  loading: boolean
  onSubmit: (formValues: FormValues) => void
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
  const { register, handleSubmit } = useForm<FormValues>()

  const classes = useStyles()

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(props.onSubmit)}
      noValidate
      autoComplete="off"
    >
      <TextField type="text" label="Name" {...register('name')} />
      <TextField type="text" label="Description" {...register('description')} />
      <input type="file" {...register('file')} />
      <Button variant="contained" color="primary" type="submit">
        Submit
      </Button>
    </form>
  )
}
