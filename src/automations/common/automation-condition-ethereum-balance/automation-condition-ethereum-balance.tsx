import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import clsx from 'clsx'
import { useEffect } from 'react'

import { cutAccount } from '~/common/cut-account'
import { Button } from '~/common/button'
import { automationConditionEthereumSchema } from './automation-condition-ethereum.validation'
import { NumericalInput } from '~/common/numerical-input'
import { Select, SelectOption } from '~/common/select'
import { AutomationForm } from '../automation-form'
import { AutomationChooseButton } from '../automation-choose-button'
import { Icon } from '~/common/icon'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { useDialog } from '~/common/dialog'
import { Wallet } from '../automation.types'
import { AutomationWalletsDialog } from '../automation-wallets-dialog'
import { Typography } from '~/common/typography'
import * as styles from './automation-condition-ethereum-balance.css'
import { networksConfig } from '~/networks-config'

type FormValues = {
  wallet: Wallet
  value: string
  op: string
  network: string
}

export type AutomationConditionEthereumBalanceProps = {
  onSubmit: (formValues: string) => void
  wallets: Wallet[]
  defaultValues?: Omit<FormValues, 'wallet'> & { wallet: string }
}

enum ConditionTypes {
  greater = '>',
  greaterOrEqual = '>=',
  less = '<',
  lessOrEqual = '<=',
  notEqual = '!=',
  equal = '==',
}

export const AutomationConditionEthereumBalance: React.VFC<AutomationConditionEthereumBalanceProps> =
  (props) => {
    const [openNetworksDialog] = useDialog(AutomationNetworksDialog)
    const [openWalletsDialog] = useDialog(AutomationWalletsDialog)

    const { register, handleSubmit, formState, control, setValue, reset } =
      useForm<FormValues>({
        resolver: yupResolver(automationConditionEthereumSchema),
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
        const result = await openWalletsDialog({ wallets: props.wallets })

        setValue('wallet', result)
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message)
        }
      }
    }

    useEffect(() => {
      if (props.defaultValues) {
        const wallet = props.wallets.find(
          ({ id }) => id === props.defaultValues?.wallet
        )

        reset({
          ...props.defaultValues,
          wallet,
        })
      }
    }, [props.defaultValues, props.wallets, reset])

    return (
      <AutomationForm
        onSubmit={handleSubmit(({ wallet, ...formValues }) =>
          props.onSubmit(JSON.stringify({ ...formValues, wallet: wallet.id }))
        )}
      >
        <Controller
          render={({ field }) => (
            <AutomationChooseButton
              label="network"
              onClick={handleChooseNetwork}
              className={styles.input}
              disabled={Boolean(props.defaultValues)}
            >
              {(field.value && (
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
          name="network"
          control={control}
        />
        <Controller
          control={control}
          name="wallet"
          render={({ field }) => (
            <AutomationChooseButton
              label="wallet"
              onClick={handleChooseWallet}
              className={clsx(styles.wallet, styles.input)}
              disabled={Boolean(props.defaultValues)}
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
        <Controller
          render={({ field }) => (
            <Select
              {...field}
              label="Condition"
              helperText={formState.errors.op?.message}
              error={Boolean(formState.errors.op?.message)}
              value={field.value || props.defaultValues?.op || ''}
              className={styles.input}
            >
              {Object.entries(ConditionTypes).map(([key, value]) => (
                <SelectOption key={key} value={value}>
                  {value}
                </SelectOption>
              ))}
            </Select>
          )}
          name="op"
          control={control}
        />
        <NumericalInput
          label="value"
          {...register('value')}
          helperText={formState.errors.value?.message}
          error={Boolean(formState.errors.value?.message)}
          value={props.defaultValues?.value || props.defaultValues?.value}
          className={styles.input}
        />
        <Button type="submit" size="small">
          Save
        </Button>
      </AutomationForm>
    )
  }
