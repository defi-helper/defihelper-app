import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useStore } from 'effector-react'

import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import * as model from '~/user-contacts/user-contact.model'

export const userContactFormSchema = yup.object().shape({
  broker: yup.string().required('Required'),
  address: yup.string().required('Required'),
})

type FormValues = {
  broker: UserContactBrokerEnum
  address: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export const UserContactAdd: React.VFC = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(userContactFormSchema),
  })

  const loading = useStore(model.createUserContactFx.pending)

  const classes = useStyles()

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(model.createUserContactFx)}
      noValidate
      autoComplete="off"
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          type="text"
          label="Type"
          inputProps={register('broker')}
          disabled={loading}
          error={Boolean(formState.errors.broker)}
          defaultValue="email"
        >
          {Object.entries(UserContactBrokerEnum).map(([k, v]) => (
            <MenuItem value={v} key={v}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          type="text"
          label="Address"
          inputProps={register('address')}
          disabled={loading}
          error={Boolean(formState.errors.address)}
          helperText={formState.errors.address?.message}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        Create new contact
      </Button>
    </form>
  )
}
