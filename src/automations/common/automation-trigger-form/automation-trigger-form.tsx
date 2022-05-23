import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
import { useAsync } from 'react-use'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'
import isEmpty from 'lodash.isempty'

import {
  Protocol,
  Wallet,
  Contract,
} from '~/automations/common/automation.types'
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
import { AutomationContractDialog } from '../automation-contract-dialog'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { AutomationProtocolDialog } from '../automation-protocol-dialog'
import { AutomationWalletsDialog } from '../automation-wallets-dialog'
import { AutomationEventsDialog } from '../automation-events-dialog'
import { safeJsonParse } from '../safe-json-parse'
import { AutomationForm } from '../automation-form'
import { networksConfig } from '~/networks-config'
import {
  automationTriggerFormByEventSchema,
  automationTriggerFormByTimeSchema,
} from './automation-trigger-form.validation'
import { toastsService } from '~/toasts'
import * as styles from './automation-trigger-form.css'

export type AutomationTriggerFormProps = {
  type: 'ByTime' | 'ByEvent'
  wallets: Wallet[]
  getProtocols: () => Promise<Protocol[]>
  onCreate: (formValues: AutomateTriggerCreateInputType) => void
  onUpdate: (formValues: AutomateTriggerUpdateInputType) => void
  defaultValues?: AutomateTriggerCreateInputType & { id: string }
  loading: boolean
}

type Params = {
  network: string
  event: string
  protocol: Protocol
  contract: Contract
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
  const [openProtocolDialog] = useDialog(AutomationProtocolDialog)
  const [openContractDialog] = useDialog(AutomationContractDialog)
  const [openWalletsDialog] = useDialog(AutomationWalletsDialog)
  const [openEventsDialog] = useDialog(AutomationEventsDialog)

  const protocols = useAsync(props.getProtocols, [])

  const defaultValues = useMemo((): FormValues => {
    const { params, wallet, ...restOfDefaultValues } = props.defaultValues ?? {}

    const { address, ...parsedParams } = safeJsonParse(params)

    const findedProtocol = protocols.value?.find((protocol) =>
      protocol.contracts.list?.some((contract) => contract.address === address)
    )

    const findedWallet = props.wallets.find(
      (walletItem) => walletItem.id === wallet
    )

    return {
      ...restOfDefaultValues,
      ...parsedParams,
      protocol: findedProtocol,
      contract: findedProtocol?.contracts.list?.find(
        (contract) => contract.address === address
      ),
      wallet: findedWallet,
    }
  }, [props.defaultValues, protocols.value, props.wallets])

  const {
    handleSubmit,
    register,
    control,
    setValue,
    getValues,
    reset,
    formState,
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

  const handleChooseProtocol = async () => {
    if (isEmpty(protocols.value) || !protocols.value) return

    try {
      const result = await openProtocolDialog({
        protocols: protocols.value,
      })

      setValue('protocol', result)
      setValue('contract', undefined as unknown as Contract)
      setValue('event', '')
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleChooseContract = async () => {
    if (!getValues('protocol')) return toastsService.error('choose protocol')

    const contracts = getValues('protocol')?.contracts?.list ?? []

    if (isEmpty(contracts))
      return toastsService.error('protocol does not have contracts')

    try {
      const result = await openContractDialog({
        contracts,
      })

      setValue('contract', result)
      setValue('event', '')
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

  const handleChooseEvent = async () => {
    if (!getValues('contract')) return toastsService.error('choose contract')

    const { events = [] } = getValues('contract') ?? {}

    if (isEmpty(events))
      return toastsService.error('contract does not have events')

    try {
      const result = await openEventsDialog({ events })

      setValue('event', result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleOnSubmit = handleSubmit((formValues) => {
    const { event, network, contract, protocol, wallet, ...restofValues } =
      formValues

    if (props.defaultValues)
      props.onUpdate({
        name: formValues.name,
        id: props.defaultValues.id,
      })

    if (!props.defaultValues)
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
                address: contract.address,
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
  const protocolId = watch('protocol.id')
  const contractId = watch('contract.id')
  const event = watch('event')

  useEffect(() => {
    if (!walletId) return

    trigger('wallet')
  }, [walletId, trigger])

  useEffect(() => {
    if (!network) return

    trigger('network')
  }, [network, trigger])

  useEffect(() => {
    if (!protocolId) return

    trigger('protocol')
  }, [protocolId, trigger])

  useEffect(() => {
    if (!contractId) return

    trigger('contract')
  }, [contractId, trigger])

  useEffect(() => {
    if (!event) return

    trigger('event')
  }, [event, trigger])

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
            name="protocol"
            render={({ field }) => (
              <AutomationChooseButton
                label="protocol"
                onClick={handleChooseProtocol}
                className={styles.input}
                disabled={Boolean(props.defaultValues) || props.loading}
                error={
                  isError(formState.errors.protocol)
                    ? formState.errors.protocol?.message
                    : undefined
                }
              >
                {(field.value && (
                  <>
                    {field.value.icon && (
                      <img
                        src={field.value.icon}
                        width="28"
                        height="28"
                        alt=""
                      />
                    )}
                    {field.value.name}
                  </>
                )) ||
                  'Choose protocol'}
              </AutomationChooseButton>
            )}
          />
          <Controller
            control={control}
            name="contract"
            render={({ field }) => (
              <AutomationChooseButton
                label="contract"
                onClick={handleChooseContract}
                className={styles.input}
                disabled={Boolean(props.defaultValues) || props.loading}
                error={
                  isError(formState.errors.contract)
                    ? formState.errors.contract?.message
                    : undefined
                }
              >
                {field.value?.name || 'Choose contract'}
              </AutomationChooseButton>
            )}
          />
          <Controller
            control={control}
            name="event"
            render={({ field }) => (
              <AutomationChooseButton
                label="event"
                className={styles.input}
                onClick={handleChooseEvent}
                disabled={Boolean(props.defaultValues) || props.loading}
                error={
                  isError(formState.errors.event)
                    ? formState.errors.event?.message
                    : undefined
                }
              >
                {field.value || 'Choose event'}
              </AutomationChooseButton>
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
