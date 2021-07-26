import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'
import { useStore } from 'effector-react'

import { useEffect, useState } from 'react'
import { UserContactBrokerEnum } from '~/graphql/_generated-types'
import * as model from '~/user-contacts/user-contact.model'

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
  const [selectedBroker, setSelectedBroker] = useState(
    UserContactBrokerEnum.Email
  )

  const [selectedAddress, setSelectedAddress] = useState('')

  const handleSelectBroker = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedBroker(event.target.value as UserContactBrokerEnum)
  }

  const handleSelectAddress = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedAddress(event.target.value as string)
  }

  useEffect(() => {
    if (selectedBroker) {
      setSelectedAddress('')
    }
  }, [selectedBroker])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    model.createUserContactFx({
      broker: selectedBroker,
      address: selectedAddress || '',
    })
  }

  const loading = useStore(model.createUserContactFx.pending)

  const classes = useStyles()

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          type="text"
          label="Type"
          value={selectedBroker}
          disabled={loading}
          defaultValue={UserContactBrokerEnum.Email}
          onChange={handleSelectBroker}
        >
          {Object.entries(UserContactBrokerEnum).map(([k, v]) => (
            <MenuItem value={v} key={v}>
              {k}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedBroker !== UserContactBrokerEnum.Telegram && (
        <FormControl className={classes.formControl}>
          <TextField
            type="text"
            label="Address"
            value={selectedAddress}
            disabled={loading}
            defaultValue=""
            onChange={handleSelectAddress}
          />
        </FormControl>
      )}
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
