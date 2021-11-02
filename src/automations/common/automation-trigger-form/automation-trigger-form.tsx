import { useForm, Controller } from 'react-hook-form'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'

import { Automates, Wallet } from '~/automations/common/automation.types'
import { Button } from '~/common/button'
import { cutAccount } from '~/common/cut-account'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { Input } from '~/common/input'
import { Typography } from '~/common/typography'
import { AutomateTriggerCreateInputType } from '~/graphql/_generated-types'
import { AutomationChooseButton } from '../automation-choose-button/automation-choose-button'
import { AutomationContractDialog } from '../automation-contract-dialog'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { AutomationProtocolDialog } from '../automation-protocol-dialog'
import { AutomationWalletsDialog } from '../automation-wallets-dialog'
import { NETWORKS } from '../constants'
import * as styles from './automation-trigger-form.css'

export type AutomationTriggerFormProps = {
  automateContracts: Record<string, Automates>
  type: 'ByTime' | 'ByEvent'
  wallets: Wallet[]
}

type Params = {
  network: string
  event: string
  protocol: string
  contract: string
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

  const { handleSubmit, register, control, setValue } = useForm<FormValues>()

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
    try {
      const result = await openProtocolDialog({
        automateContracts: props.automateContracts,
      })

      setValue('protocol', result.protocol)
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message)
      }
    }
  }
  const handleChooseContract = async () => {
    try {
      const result = await openContractDialog({
        automateContracts: props.automateContracts,
      })

      setValue('contract', result.contract)
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

  const handleOnSubmit = handleSubmit((formValues) => {
    // eslint-disable-next-line no-console
    console.log(formValues)
  })

  return (
    <form onSubmit={handleOnSubmit} className={styles.root}>
      <Input label="Name" className={styles.input} {...register('name')} />
      <Controller
        control={control}
        name="wallet"
        render={({ field }) => (
          <AutomationChooseButton
            label="wallet"
            onClick={handleChooseWallet}
            className={clsx(styles.wallet, styles.input)}
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
              >
                {(field.value && (
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
              >
                {field.value || 'Choose protocol'}
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
              >
                {field.value || 'Choose contract'}
              </AutomationChooseButton>
            )}
          />
          <Controller
            control={control}
            name="event"
            render={({ field }) => (
              <AutomationChooseButton label="event" className={styles.input}>
                {field.value || 'Choose event'}
              </AutomationChooseButton>
            )}
          />
        </>
      )}
      <Button className={styles.submit} type="submit">
        Setup
      </Button>
    </form>
  )
}
