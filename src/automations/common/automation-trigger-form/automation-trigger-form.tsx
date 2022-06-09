import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useMemo, useState } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'

import { Protocol, Wallet } from '~/automations/common/automation.types'
import { Button } from '~/common/button'
import { cutAccount } from '~/common/cut-account'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import {
  AutomateTriggerCreateInputType,
  AutomateTriggerTypeEnum,
  AutomateTriggerUpdateInputType,
} from '~/api/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button/automation-choose-button'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { AutomationWalletsDialog } from '../automation-wallets-dialog'
import { safeJsonParse } from '../safe-json-parse'
import { AutomationForm } from '../automation-form'
import { networksConfig } from '~/networks-config'
import {
  automationTriggerFormByEventSchema,
  automationTriggerFormByTimeSchema,
} from './automation-trigger-form.validation'
import * as styles from './automation-trigger-form.css'
import { Select, SelectOption } from '~/common/select'

export type AutomationTriggerFormProps = {
  type: 'ByTime' | 'ByEvent'
  wallets: Wallet[]
  getProtocols: () => Promise<Protocol[]>
  retrieveEvents: (
    network: string,
    address: string
  ) => Promise<{ type: string; name: string }[]>
  onCreate: (formValues: AutomateTriggerCreateInputType) => void
  onUpdate: (formValues: AutomateTriggerUpdateInputType) => void
  defaultValues?: AutomateTriggerCreateInputType & { id: string }
  loading: boolean
}

type Params = {
  network: string
  event: string
  address: string
  wallet: Wallet
}

type FormValues = Omit<AutomateTriggerCreateInputType, 'params' | 'wallet'> &
  Params

const isError = (object: unknown): object is { message: string } => {
  return typeof object === 'object' && object !== null && 'message' in object
}

export const AutomationTriggerForm: React.VFC<AutomationTriggerFormProps> = (
  props
) => {
  const [openNetworksDialog] = useDialog(AutomationNetworksDialog)
  const [openWalletsDialog] = useDialog(AutomationWalletsDialog)

  const [fetchedEvents, setFetchedEvents] = useState<null | string[]>(null)
  const [hintMessage, setHintMessage] = useState(
    'Please, fill the address and network'
  )
  const { retrieveEvents } = props

  const defaultValues = useMemo((): FormValues => {
    const { params, wallet, ...restOfDefaultValues } = props.defaultValues ?? {}

    const { address, ...parsedParams } = safeJsonParse(params)

    const findedWallet = props.wallets.find(
      (walletItem) => walletItem.id === wallet
    )

    return {
      ...restOfDefaultValues,
      ...parsedParams,
      address,
      wallet: findedWallet,
    }
  }, [props.defaultValues, props.wallets])

  const {
    handleSubmit,
    register,
    control,
    setValue,
    reset,
    formState,
    getValues,
    trigger,
    watch,
  } = useForm<FormValues, { test: string }>({
    resolver: yupResolver(
      props.type === 'ByEvent'
        ? automationTriggerFormByEventSchema
        : automationTriggerFormByTimeSchema
    ),
  })

  const handleChooseNetwork = async () => {
    try {
      const result = await openNetworksDialog()

      setValue('network', result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleChooseWallet = async () => {
    try {
      const result = await openWalletsDialog({
        wallets: props.wallets,
      })

      setValue('wallet', result)
      setValue('network', result.network)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOnSubmit = handleSubmit((formValues) => {
    const { event, network, address, wallet, ...restofValues } = formValues

    if (props.defaultValues) {
      props.onUpdate({
        name: formValues.name,
        id: props.defaultValues.id,
      })
      return
    }

    props.onCreate({
      ...restofValues,
      wallet: wallet.id,
      type:
        props.type === 'ByTime'
          ? AutomateTriggerTypeEnum.EveryHour
          : AutomateTriggerTypeEnum.ContractEvent,
      params:
        props.type === 'ByEvent'
          ? JSON.stringify({
              event,
              network,
              address,
            })
          : '{}',
    })
  })

  useEffect(() => {
    if (props.defaultValues) {
      reset(defaultValues)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues, props.defaultValues])

  const walletId = watch('wallet.id')
  const network = watch('network')
  const address = watch('address')
  const event = watch('event')

  useEffect(() => {
    if (!walletId) return

    trigger('wallet')
  }, [walletId, trigger])

  useEffect(() => {
    if (!network) return

    trigger(['network', 'address'])
  }, [network, trigger])

  useEffect(() => {
    if (!event) return

    trigger('event')
  }, [event, trigger])

  useEffect(() => {
    if (!address || !network) return

    setHintMessage(`Fetching abi...`)

    if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(address)) {
      setHintMessage('Wrong address')
      return
    }

    retrieveEvents(network, address).then((abi) => {
      const events = abi.filter((i) => i.type === 'event')
      if (!events.length) {
        setHintMessage(`No events found :(`)
        return
      }

      setHintMessage(`Choose the event, please`)
      setFetchedEvents(events.map(({ name }) => name))
    })

    trigger('address')
  }, [address, network, retrieveEvents, trigger])

  console.warn(getValues())

  return (
    <AutomationForm onSubmit={handleOnSubmit}>
      <Input
        label="Name"
        className={styles.input}
        {...register('name')}
        helperText={formState.errors.name?.message}
        error={Boolean(formState.errors.name?.message)}
      />
      <Controller
        control={control}
        name="wallet"
        render={({ field }) => (
          <AutomationChooseButton
            label="wallet"
            onClick={handleChooseWallet}
            className={clsx(styles.wallet, styles.input)}
            disabled={Boolean(props.defaultValues) || props.loading}
            error={
              isError(formState.errors.wallet)
                ? formState.errors.wallet.message
                : undefined
            }
          >
            {(field.value && (
              <>
                <div className={styles.walletTitle}>
                  <Jazzicon
                    diameter={20}
                    seed={jsNumberForAddress(field.value.address)}
                    paperStyles={{
                      verticalAlign: 'middle',
                      marginRight: 8,
                    }}
                  />
                  {field.value.name || 'untitled'}
                </div>
                <Typography variant="body3" className={styles.walletSubtitle}>
                  {networksConfig[field.value.network]?.title && (
                    <>{networksConfig[field.value.network]?.title}, </>
                  )}
                  {cutAccount(field.value.address)}
                </Typography>
              </>
            )) ||
              'Choose wallet'}
          </AutomationChooseButton>
        )}
      />
      {props.type === 'ByEvent' && (
        <>
          <Controller
            control={control}
            name="network"
            render={({ field }) => (
              <AutomationChooseButton
                label="network"
                onClick={handleChooseNetwork}
                className={styles.input}
                disabled={Boolean(props.defaultValues) || props.loading}
                error={
                  isError(formState.errors.network)
                    ? formState.errors.network?.message
                    : undefined
                }
              >
                {(networksConfig[field.value] && (
                  <>
                    <Icon
                      icon={networksConfig[field.value].icon}
                      width="28"
                      height="28"
                    />{' '}
                    {networksConfig[field.value].title}
                  </>
                )) ||
                  'Choose network'}
              </AutomationChooseButton>
            )}
          />

          <Controller
            control={control}
            name="address"
            render={() => (
              <Input
                label="Address"
                className={styles.input}
                {...register('address')}
                onChange={(e) => setValue('address', e.target.value)}
              />
            )}
          />

          <Typography variant="inherit" className={styles.hintMessage}>
            {hintMessage}
          </Typography>

          <Controller
            control={control}
            name="event"
            render={({ field }) => (
              <Select
                label="event"
                disabled={fetchedEvents === null || fetchedEvents?.length === 0}
                className={styles.input}
                value={field.value}
                onChange={(e) => setValue('event', e.target.value)}
                helperText={formState.errors.event?.message}
                error={Boolean(formState.errors.event?.message)}
              >
                {(fetchedEvents ?? []).map((eventName) => (
                  <SelectOption value={eventName}>{eventName}</SelectOption>
                ))}
              </Select>
            )}
          />
        </>
      )}

      <Button type="submit" className={styles.submit} loading={props.loading}>
        Setup
      </Button>
    </AutomationForm>
  )
}
