import { useForm, Controller } from 'react-hook-form'
import { useEffect, useMemo } from 'react'
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
} from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button/automation-choose-button'
import { AutomationContractDialog } from '../automation-contract-dialog'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { AutomationProtocolDialog } from '../automation-protocol-dialog'
import { AutomationWalletsDialog } from '../automation-wallets-dialog'
import { NETWORKS } from '../constants'
import { AutomationEventsDialog } from '../automation-events-dialog'
import { safeJsonParse } from '../safe-json-parse'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-trigger-form.css'

export type AutomationTriggerFormProps = {
  type: 'ByTime' | 'ByEvent'
  wallets: Wallet[]
  protocols: Protocol[]
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

export const AutomationTriggerForm: React.VFC<AutomationTriggerFormProps> = (
  props
) => {
  const [openNetworksDialog] = useDialog(AutomationNetworksDialog)
  const [openProtocolDialog] = useDialog(AutomationProtocolDialog)
  const [openContractDialog] = useDialog(AutomationContractDialog)
  const [openWalletsDialog] = useDialog(AutomationWalletsDialog)
  const [openEventsDialog] = useDialog(AutomationEventsDialog)

  const defaultValues = useMemo((): FormValues => {
    const { params, wallet, ...restOfDefaultValues } = props.defaultValues ?? {}

    const { address, ...parsedParams } = safeJsonParse(params)

    const findedProtocol = props.protocols.find((protocol) =>
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
  }, [props.defaultValues, props.protocols, props.wallets])

  const { handleSubmit, register, control, setValue, getValues, reset } =
    useForm<FormValues>()

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
    if (isEmpty(props.protocols)) return

    try {
      const result = await openProtocolDialog({
        protocols: props.protocols,
      })

      setValue('protocol', result)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleChooseContract = async () => {
    const contracts = getValues('protocol')?.contracts?.list ?? []

    if (isEmpty(contracts)) return

    try {
      const result = await openContractDialog({
        contracts,
      })

      setValue('contract', result)
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
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }

  const handleChooseEvent = async () => {
    const { events = [] } = getValues('contract') ?? {}

    if (isEmpty(events)) return

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
            ? AutomateTriggerTypeEnum.EveryDay
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

  return (
    <AutomationForm onSubmit={handleOnSubmit}>
      <Input label="Name" className={styles.input} {...register('name')} />
      <Controller
        control={control}
        name="wallet"
        render={({ field }) => (
          <AutomationChooseButton
            label="wallet"
            onClick={handleChooseWallet}
            className={clsx(styles.wallet, styles.input)}
            disabled={Boolean(props.defaultValues) || props.loading}
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
                  {NETWORKS[field.value.network]?.title && (
                    <>{NETWORKS[field.value.network]?.title}, </>
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
              >
                {(NETWORKS[field.value] && (
                  <>
                    <Icon
                      icon={NETWORKS[field.value].icon}
                      width="28"
                      height="28"
                    />{' '}
                    {NETWORKS[field.value].title}
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
              >
                {field.value || 'Choose event'}
              </AutomationChooseButton>
            )}
          />
        </>
      )}
      <Button className={styles.submit} loading={props.loading} type="submit">
        Setup
      </Button>
    </AutomationForm>
  )
}
