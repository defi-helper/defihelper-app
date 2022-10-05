import { useForm, Controller } from 'react-hook-form'
import { ethers } from 'ethers'

import { Button } from '~/common/button'
import { Typography } from '~/common/typography'
import { Input } from '~/common/input'
import { isEthAddress } from '~/common/is-eth-address'
import { GovernanceActionArguments } from '../governance.types'
import { GovernancePowOptions } from '../governance-pow-options'
import { ButtonBase } from '~/common/button-base'
import * as styles from './governance-actions-manually-params.css'

export type GovernanceActionsManuallyParamsProps = {
  contract?: number | string
  methodName: string
  inputs: GovernanceActionArguments
  onSubmit: (value: GovernanceActionArguments) => void
}

export const GovernanceActionsManuallyParams: React.FC<GovernanceActionsManuallyParamsProps> =
  (props) => {
    const { handleSubmit, formState, setValue, getValues, trigger, control } =
      useForm({
        defaultValues: props.inputs,
      })

    const handleChangeUintValue = (name: string) => async (pow: string) => {
      await trigger(name, { shouldFocus: true })

      const values = getValues(name)

      setValue(name, {
        ...values,
        value: (values.value || 1) + pow,
      })
    }
    const handleChangeKessakValue = (name: string) => async () => {
      await trigger(name, { shouldFocus: true })

      const values = getValues(name)

      setValue(name, {
        ...values,
        value: ethers.utils.keccak256(ethers.utils.toUtf8Bytes(values.value)),
      })
    }

    return (
      <>
        <Typography
          variant="h3"
          family="mono"
          transform="uppercase"
          className={styles.title}
        >
          {props.children}
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(props.onSubmit)}
          className={styles.form}
        >
          {Object.entries(props.inputs).map(([name, input]) => {
            const options: Record<string, JSX.Element> = {
              uint256: (
                <GovernancePowOptions
                  onClick={handleChangeUintValue(name)}
                  className={styles.pow}
                />
              ),
              string: (
                <ButtonBase
                  className={styles.kessak}
                  onClick={handleChangeKessakValue(name)}
                >
                  kessak256
                </ButtonBase>
              ),
            }

            return (
              <div key={name} className={styles.input}>
                {options[input.type]}
                <Controller
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={`Enter ${name}(${input.type})`}
                      disabled={formState.isSubmitting}
                      value={field.value || input.value}
                    />
                  )}
                  name={`${name}.value`}
                  control={control}
                  rules={{
                    required: true,
                    pattern:
                      input.type === 'address' ? isEthAddress.regex : undefined,
                  }}
                />
                {formState.errors[name]?.value && (
                  <Typography className={styles.error}>
                    {formState.errors[name]?.value?.type === 'required' &&
                      'required'}
                    {formState.errors[name]?.value?.type === 'pattern' &&
                      'is not ethereum address'}
                  </Typography>
                )}
              </div>
            )
          })}
          <Button
            type="submit"
            disabled={formState.isSubmitting}
            className={styles.button}
          >
            Submit
          </Button>
        </form>
      </>
    )
  }
