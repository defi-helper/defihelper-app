import { Controller, useForm } from 'react-hook-form'

import { Button } from '~/common/button'
import { useDialog } from '~/common/dialog'
import { Icon } from '~/common/icon'
import { NumericalInput } from '~/common/numerical-input'
import { AutomationChooseButton } from '../automation-choose-button'
import { AutomationForm } from '../automation-form'
import { AutomationNetworksDialog } from '../automation-networks-dialog'
import { NETWORKS } from '../constants'
import * as styles from './automation-condition-ethereum-gas-price.css'

type FormValues = {
  network: string
  tolerance: string
}

export type AutomationConditionEthereumGasPriceProps = {
  onSubmit: (formValues: string) => void
  defaultValues?: FormValues
}

export const AutomationConditionEthereumGasPrice: React.VFC<AutomationConditionEthereumGasPriceProps> =
  (props) => {
    const [openNetworksDialog] = useDialog(AutomationNetworksDialog)

    const { handleSubmit, formState, register, control, setValue } =
      useForm<FormValues>({
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
          name="network"
          control={control}
        />
        <NumericalInput
          {...register('tolerance')}
          label="Tolerance"
          helperText={formState.errors.tolerance?.message}
          error={Boolean(formState.errors.tolerance?.message)}
          defaultValue={props.defaultValues?.tolerance}
          className={styles.input}
        />
        <Button type="submit">Submit</Button>
      </AutomationForm>
    )
  }
