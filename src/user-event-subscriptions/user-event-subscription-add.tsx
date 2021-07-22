import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { useGate, useStore } from 'effector-react'
import * as model from '~/user-event-subscriptions/user-event-subscription.model'
import * as contactModel from '~/user-contacts/user-contact.model'
import * as protocolsModel from '~/protocols/protocol-list/protocol-list.model'
import * as stackingModel from '~/staking/staking-list/staking-list.model'
import {
  BlockchainEnum,
  UserContactStatusEnum,
} from '~/graphql/_generated-types'

export const userEventSubscriptionFormSchema = yup.object().shape({
  contact: yup.string().required('Required'),
  contract: yup.string().required('Required'),
  event: yup.string().required('Required'),
})

type FormValues = {
  contact: string
  contract: string
  event: string
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

export const UserEventSubscriptionAdd: React.VFC = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: yupResolver(userEventSubscriptionFormSchema),
  })

  const loading = useStore(model.createUserEventSubscriptionFx.pending)

  const [selectedProtocol, setSelectedProtocol] = useState('')
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    BlockchainEnum | undefined
  >()
  const [selectedNetwork, setSelectedNetwork] = useState('')
  const [selectedContract, setSelectedContract] = useState('')

  const handleSelectProtocol = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedProtocol(event.target.value as string)
    setSelectedBlockchain(undefined)
    setSelectedNetwork('')
  }

  const handleSelectBlockchain = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedBlockchain(event.target.value as BlockchainEnum)
    setSelectedNetwork('')
  }

  const handleSelectNetwork = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedNetwork(event.target.value as string)
    setSelectedContract('')
  }

  const handleSelectContract = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedContract(event.target.value as string)
  }

  const contacts = useStore(contactModel.$userContactList)
  const protocols = useStore(protocolsModel.$protocolList)
  const contracts = useStore(stackingModel.$contracts)
  const contractsEvents = useStore(stackingModel.$contractsEventsList)

  useEffect(() => {
    if (selectedProtocol && selectedBlockchain) {
      stackingModel.fetchStakingListFx({
        protocolId: selectedProtocol,
        blockchain: selectedBlockchain,
        limit: 1000, // 1000 contracts in one protocol looks impossible
      })
    }
  }, [selectedProtocol, selectedBlockchain])

  useEffect(() => {
    if (selectedContract) {
      stackingModel.fetchContractEventsFx({
        protocolId: selectedProtocol,
        contractId: selectedContract,
      })
    }
  }, [selectedProtocol, selectedBlockchain, selectedContract])

  const availableNetworks = useMemo(() => {
    return Object.keys(
      contracts.reduce((obj, contract) => {
        return {
          ...obj,
          [contract.network]: true,
        }
      }, {} as Record<string, boolean>)
    )
  }, [contracts])

  const selectedContractEvents = useMemo(() => {
    if (!selectedContract) {
      return []
    }
    const events = contractsEvents[selectedContract]
    if (!events) {
      return []
    }

    return events.events
  }, [contractsEvents, selectedContract])

  const classes = useStyles()

  useGate(contactModel.UserContactListGate)
  useGate(protocolsModel.ProtocolListGate)

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(model.createUserEventSubscriptionFx)}
      noValidate
      autoComplete="off"
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Contact</InputLabel>
        <Select
          type="text"
          label="Type"
          inputProps={register('contact')}
          disabled={loading}
          error={Boolean(formState.errors.contact)}
        >
          {contacts
            .filter((c) => c.status === UserContactStatusEnum.Active)
            .map((c) => (
              <MenuItem value={c.id}>
                {c.address} ({c.broker})
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Protocol</InputLabel>
        <Select
          type="text"
          label="Protocol"
          disabled={loading}
          value={selectedProtocol}
          onChange={handleSelectProtocol}
        >
          {protocols.map((p) => (
            <MenuItem value={p.id}>{p.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Blockchain</InputLabel>
        <Select
          type="text"
          label="Blockchain"
          disabled={loading || !selectedProtocol}
          value={selectedBlockchain}
          onChange={handleSelectBlockchain}
        >
          {Object.entries(BlockchainEnum).map(([k, v]) => (
            <MenuItem value={v}>{k}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Network</InputLabel>
        <Select
          type="text"
          label="Contract"
          disabled={loading || !selectedBlockchain}
          value={selectedNetwork}
          onChange={handleSelectNetwork}
        >
          {availableNetworks.map((network) => (
            <MenuItem value={network}>{network}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Contract</InputLabel>
        <Select
          type="text"
          label="Contract"
          value={selectedContract}
          inputProps={register('contract')}
          disabled={loading || !selectedNetwork}
          error={Boolean(formState.errors.contract)}
          onChange={handleSelectContract}
        >
          {contracts
            .filter((contract) => contract.network === selectedNetwork)
            .map((contract) => (
              <MenuItem value={contract.id}>{contract.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Event</InputLabel>
        <Select
          type="text"
          label="Event"
          inputProps={register('event')}
          disabled={loading || !selectedContract}
          error={Boolean(formState.errors.event)}
        >
          {selectedContractEvents.map((event) => (
            <MenuItem value={event}>{event}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={loading}
      >
        Create subscription
      </Button>
    </form>
  )
}
