import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
import * as styles from './automation-condition-ethereum-balance.css'
import { networksConfig } from '~/networks-config'
import { Input } from '~/common/input'

type FormValues = {
  wallet: string
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

    const { register, handleSubmit, formState, control, setValue } =
      useForm<FormValues>({
        resolver: yupResolver(automationConditionEthereumSchema),
        defaultValues: props.defaultValues,
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

    return (
      <AutomationForm
        onSubmit={handleSubmit((formValues) =>
          props.onSubmit(JSON.stringify(formValues))
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
        <Input
          label="Wallet"
          {...register('wallet', {
            required: true,
          })}
          helperText={formState.errors.wallet?.message}
          error={Boolean(formState.errors.wallet?.message)}
          value={props.defaultValues?.wallet}
          className={styles.input}
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
          value={props.defaultValues?.value}
          className={styles.input}
        />
        <Button type="submit" size="small">
          Save
        </Button>
      </AutomationForm>
    )
  }
