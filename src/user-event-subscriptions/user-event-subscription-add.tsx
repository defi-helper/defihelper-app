import { useEffect, useMemo, useState } from 'react'
import Button from '@material-ui/core/Button'
import {
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
} from '@material-ui/core'

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
  const loading = useStore(model.createUserEventSubscriptionFx.pending)

  const [selectedContact, setSelectedContact] = useState('')
  const [selectedProtocol, setSelectedProtocol] = useState('')
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    BlockchainEnum | undefined
  >()
  const [selectedNetwork, setSelectedNetwork] = useState('')
  const [selectedContract, setSelectedContract] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('')

  const handleSelectContact = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedContact(event.target.value as string)
  }

  const handleSelectProtocol = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedProtocol(event.target.value as string)
  }

  const handleSelectBlockchain = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedBlockchain(event.target.value as BlockchainEnum)
  }

  const handleSelectNetwork = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedNetwork(event.target.value as string)
  }

  const handleSelectContract = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedContract(event.target.value as string)
  }

  const handleSelectEvent = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedEvent(event.target.value as string)
  }

  const contacts = useStore(contactModel.$userContactList)
  const protocols = useStore(protocolsModel.$protocolList)
  const contracts = useStore(stackingModel.$contracts)
  const contractsEvents = useStore(stackingModel.$contractsEventsList)

  useEffect(() => {
    if (selectedProtocol) {
      setSelectedBlockchain(undefined)
    }
  }, [selectedProtocol])

  useEffect(() => {
    if (selectedBlockchain) {
      setSelectedNetwork('')
    }
  }, [selectedBlockchain])

  useEffect(() => {
    if (selectedNetwork) {
      setSelectedContract('')
    }
  }, [selectedNetwork])

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
      contracts.reduce<Record<string, boolean>>((obj, contract) => {
        return {
          ...obj,
          [contract.network]: true,
        }
      }, {})
    )
  }, [contracts])

  const selectedContractEvents = useMemo(() => {
    return (selectedContract && contractsEvents[selectedContract]?.events) || []
  }, [contractsEvents, selectedContract])

  const classes = useStyles()

  useGate(contactModel.UserContactListGate)
  useGate(protocolsModel.ProtocolListGate)

  const handleSubmit = () => {
    model.createUserEventSubscriptionFx({
      contact: selectedContact,
      contract: selectedContract,
      event: selectedEvent,
    })
  }

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <FormControl className={classes.formControl}>
        <InputLabel>Contact</InputLabel>
        <Select
          type="text"
          label="Type"
          disabled={loading}
          value={selectedContact}
          onChange={handleSelectContact}
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
          disabled={loading || !selectedNetwork}
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
          disabled={loading || !selectedContract}
          value={selectedEvent}
          onChange={handleSelectEvent}
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
