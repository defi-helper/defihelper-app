import { ethers } from 'ethers'
import { useForm } from 'react-hook-form'

import { Input } from '~/common/input'
import { NumericalInput } from '~/common/numerical-input'
import { Button } from '~/common/button'
import { isEthAddress } from '~/common/is-eth-address'
import { Automates } from '../automation.types'
import { AutomationForm } from '../automation-form'
import * as styles from './automation-contract-form.css'

export type FormValues = {
  inputs: string[]
}

export type AutomationContractFormProps = {
  loading?: boolean
  onSubmit: (formValues: FormValues) => void
  contract: Automates
  defaultValues?: FormValues
}

export const AutomationContractForm: React.VFC<AutomationContractFormProps> = (
  props
) => {
  const { formState, register, handleSubmit } = useForm<FormValues>({
    defaultValues: props.defaultValues,
  })

  return (
    <AutomationForm onSubmit={handleSubmit(props.onSubmit)}>
      {props.contract &&
        new ethers.utils.Interface(props.contract.contractInterface)
          .getFunction('init')
          .inputs.map(({ name, type }, i) => {
            const Component = type === 'address' ? Input : NumericalInput

            return (
              <Component
                key={name}
                type="text"
                className={styles.input}
                label={`${type} ${name}`}
                {...register(`inputs.${i}`, {
                  required: true,
                  pattern: type === 'address' ? isEthAddress.regex : undefined,
                })}
                helperText={formState.errors.inputs?.[i]?.message}
                error={Boolean(formState.errors.inputs?.[i]?.message)}
                disabled={props.loading}
              />
            )
          })}
      <Button type="submit" loading={props.loading}>
        Submit
      </Button>
    </AutomationForm>
  )
}
